// 鸣潮文本检索站（瑝览类书 mc.yakitahome.com）的离线查阅小工具
//
// 素材：站点是 SPA，抓 HTML 没用，正文全在 api 里。我们本地存了四份 JSON：
//   source/yakitahome-terms.json    /api/terms   官方术语（多语言）
//   source/yakitahome-feixun.json  /api/feixun  飞讯私信（联系人 / 会话）
//   cache/yakitahome-info.json     /api/info    游戏内文本档案（本地那份只有 preview）
//   cache/yakitahome-items.json    /api/items   物品表
//
// 这个脚本默认**只读本地文件、不联网**，除了显式的 pull / pull-conv 两条命令。
//
// 用法（在 kb/ 目录下跑）：
//   node tools/yakitahome.mjs search 达妮娅            四个数据集一起搜关键词
//   node tools/yakitahome.mjs term 调律者              看术语原文
//   node tools/yakitahome.mjs msg 洛瑟菈               看某人的飞讯（列会话）
//   node tools/yakitahome.mjs msg 洛瑟菈 --conv 32000   看某条会话的本地全文
//   node tools/yakitahome.mjs info 生日行程            看档案条目（本地只有前 90 字）
//   node tools/yakitahome.mjs list msg                 列联系人 / 其他数据集索引
//   node tools/yakitahome.mjs pull 28050004            联网：取 /api/info/detail 全文
//   node tools/yakitahome.mjs pull-conv 32000          联网：取逐条飞讯消息
//
// 常用开关：--full（不限条数、不截断）、--raw（飞讯不滤语言）、--lang zh-Hant|en|all、
//           --limit N、--conv <会话 id>、--timeout <毫秒>

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const KB = join(HERE, '..')
const HOST = 'https://mc.yakitahome.com'
const DEF_LANG = 'zh-Hans'
const SNIP = 70          // 命中片段的长度
const DEF_LIMIT = 8      // 每个数据集默认给几条
const DEF_LINES = 60     // 飞讯本地全文默认给多少行
const NET_TIMEOUT = 15000
const NL = String.fromCharCode(10)   // 换行（脚本里少写转义，省得踩坑）

// ---------- 四份数据集 ----------
const DATASETS = [
  { key: 'term', label: '术语', file: 'source/yakitahome-terms.json' },
  { key: 'msg', label: '飞讯', file: 'source/yakitahome-feixun.json' },
  { key: 'info', label: '档案', file: 'cache/yakitahome-info.json' },
  { key: 'item', label: '物品', file: 'cache/yakitahome-items.json' },
]

const cache = new Map()
const warned = new Set()

// 读一份 JSON；读不到只警告一次，不炸（谁装谁用，缺文件就少一个数据集）
const load = (key) => {
  if (cache.has(key)) return cache.get(key)
  const ds = DATASETS.find((d) => d.key === key)
  let data = null
  try {
    data = JSON.parse(readFileSync(join(KB, ds.file), 'utf8'))
  } catch (e) {
    if (!warned.has(key)) {
      warned.add(key)
      console.log('  ! 读不到 ' + ds.file + '（' + (e && e.code) + '），' + ds.label + '这一份跳过')
    }
  }
  cache.set(key, data)
  return data
}

// ---------- 零碎工具 ----------
// 取某个语种的文本；没有就退回简体，再没有就空串
const pick = (obj, lang) => (obj && (obj[lang] ?? obj[DEF_LANG])) || ''

// 把一个对象里的多语言值摊平成一行，方便搜
const flatten = (obj) => (obj && typeof obj === 'object' ? Object.values(obj).filter((v) => typeof v === 'string').join(' ') : '')

// 一行内的空白压平
const flatLine = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

// 命中片段：以关键词为中心切一段出来；没有关键词就从头切
const snip = (text, kws, len = SNIP) => {
  const s = flatLine(text)
  if (!s) return ''
  let at = -1
  for (const k of kws) {
    const i = s.toLowerCase().indexOf(String(k).toLowerCase())
    if (i >= 0) { at = i; break }
  }
  if (at < 0) at = 0
  const from = Math.max(0, at - Math.floor(len / 3))
  return (from > 0 ? '…' : '') + s.slice(from, from + len) + (from + len < s.length ? '…' : '')
}

const hasAll = (hay, kws) => kws.every((k) => hay.toLowerCase().includes(String(k).toLowerCase()))

const langList = (opts) => (opts.lang === 'all' ? ['zh-Hans', 'zh-Hant', 'ja', 'en', 'ko', 'de', 'es', 'fr'] : [opts.lang || DEF_LANG])

// 飞讯本地只有一份多语种摊平的 searchText，滤不出结构；这里用启发式挑出像简体的行：
// 有汉字、没有假名、没有繁体专属字。挑不干净不要紧，--raw 看原样
const KANA = /[぀-ヿｦ-ﾟ]/
const TRAD = /[們這來說時學會從對開關樣麼義實圖書電話東車買賣錢長間聞問沒為與產發歲觀點讓還經過進遠應該營區醫藥裡誰體]/
const CJK = /[一-鿿]/
const PLAIN = /^[\s\d.:：\-—>*·…]+$/
const looksZhHans = (s) => {
  if (KANA.test(s) || TRAD.test(s)) return false
  const cjk = (s.match(CJK_G) || []).length
  const all = s.replace(/\s/g, '').length || 1
  return cjk >= all * 0.4
}

// 把一个数据集摊平成可搜的行：{id, title, body, extra, hay}
const rowsOf = (key, data) => {
  if (key === 'term') {
    return data.terms.map((t) => {
      const title = t.title || pick(t.i18n && t.i18n.title, DEF_LANG)
      const desc = t.description || pick(t.i18n && t.i18n.description, DEF_LANG)
      return {
        id: t.debugId || t.uid,
        title: title,
        body: desc,
        extra: t.version ? '版本 ' + t.version : '',
        hay: [title, desc, flatten(t.i18n && t.i18n.title), flatten(t.i18n && t.i18n.description)].join(' '),
      }
    })
  }
  if (key === 'msg') {
    const rows = []
    for (const c of data.contacts) {
      const name = c.name || pick(c.i18n && c.i18n.name, DEF_LANG)
      for (const v of c.conversations || []) {
        rows.push({
          id: v.id,
          title: name + '：' + (v.title || v.preview || ''),
          body: String(v.searchText || v.preview || '').split(NL).filter((l) => looksZhHans(l)).join(' '),
          extra: '联系人 ' + c.id + ' ' + name + ' · ' + (v.messageCount || 0) + ' 条消息' + (v.versionLabel ? ' · ' + v.versionLabel : ''),
          hay: [name, v.title, v.preview, v.searchText, c.desc].join(' '),
        })
      }
    }
    return rows
  }
  if (key === 'info') {
    return data.entries.map((e) => ({
      id: e.id,
      title: pick(e.title, DEF_LANG),
      body: pick(e.preview, DEF_LANG),
      extra: (e.version ? '版本 ' + e.version + ' · ' : '') + 'preview 只有前 90 字，全文用 pull ' + e.id,
      hay: [flatten(e.title), flatten(e.preview)].join(' '),
    }))
  }
  if (key === 'item') {
    return data.items.map((it) => {
      const name = it.name || pick(it.i18n && it.i18n.name, DEF_LANG)
      return {
        id: it.uid || it.id,
        title: name,
        body: it.searchText || '',
        extra: [it.qualityName, it.version, it.iconUrl].filter(Boolean).join(' · '),
        hay: [name, flatten(it.i18n && it.i18n.name), it.searchText || '', it.qualityName || ''].join(' '),
      }
    })
  }
  return []
}

// ---------- search ----------
// 四个数据集一起搜；每条命中都带上 id 和所在数据集，好往 src 的 note 里抄
const cmdSearch = (query, opts) => {
  const kws = query.split(/\s+/).filter(Boolean)
  if (!kws.length) return usage(1)
  const limit = opts.full ? Infinity : Number(opts.limit || DEF_LIMIT)
  let total = 0

  for (const ds of DATASETS) {
    const data = load(ds.key)
    if (!data) continue
    const rows = rowsOf(ds.key, data)
    const hits = rows.filter((r) => hasAll(r.hay, kws))
    total += hits.length
    if (!hits.length) continue
    const shown = hits.slice(0, limit)
    console.log('· ' + ds.label + '  命中 ' + hits.length + ' 条（共 ' + rows.length + ' 条）')
    for (const h of shown) {
      console.log('  [' + ds.label + ' ' + h.id + '] ' + flatLine(h.title))
      const s = snip(h.body, kws)
      if (s) console.log('      ' + s)
      if (h.extra) console.log('      ' + h.extra)
    }
    if (hits.length > shown.length) console.log('      …… 还有 ' + (hits.length - shown.length) + ' 条，加 --full 全看')
  }
  console.log(total ? '· 一共命中 ' + total + ' 条' : '· 四个数据集里都没搜到「' + query + '」')
}

// ---------- term ----------
const cmdTerm = (query, opts) => {
  const data = load('term')
  if (!data) return
  const langs = langList(opts)
  const hits = data.terms.filter((t) => {
    if (String(t.debugId) === String(query) || t.uid === query) return true
    return hasAll([t.title, t.description, flatten(t.i18n && t.i18n.title), flatten(t.i18n && t.i18n.description)].join(' '), [query])
  })
  if (!hits.length) {
    console.log('· 术语表里没搜到「' + query + '」')
    return
  }
  console.log('· 术语  命中 ' + hits.length + ' 条（共 ' + data.terms.length + ' 条）')
  for (const t of hits.slice(0, opts.full ? hits.length : Number(opts.limit || DEF_LIMIT))) {
    console.log('  [术语 ' + (t.debugId || t.uid) + '] ' + (t.title || '') + (t.version ? '  ' + t.version : ''))
    for (const l of langs) {
      const title = l === DEF_LANG ? t.title || pick(t.i18n && t.i18n.title, l) : pick(t.i18n && t.i18n.title, l)
      const desc = l === DEF_LANG ? t.description || pick(t.i18n && t.i18n.description, l) : pick(t.i18n && t.i18n.description, l)
      if (!title && !desc) continue
      if (langs.length > 1) console.log('      ' + l + '  ' + title)
      const body = flatLine(desc)
      if (body) console.log('      ' + (opts.full ? body : snip(body, [query], 200)))
    }
    console.log('      出处：' + HOST + '/terms （id ' + (t.debugId || t.uid) + '；本地副本 source/yakitahome-terms.json）')
  }
}

// ---------- msg ----------
const cmdMsg = (who, opts) => {
  const data = load('msg')
  if (!data) return
  const q = String(who || '').trim()
  if (!q) return usage(1)
  const hit = data.contacts.find((c) => String(c.id) === q || (c.name || '').includes(q) || pick(c.i18n && c.i18n.name, DEF_LANG).includes(q))
  if (!hit) {
    console.log('· 飞讯里没找到「' + q + '」这个联系人')
    const head = q.slice(0, 1)
    const near = data.contacts.filter((c) => (c.name || '').includes(head)).slice(0, 12)
    if (near.length) console.log('  名字带「' + head + '」的：' + near.map((c) => c.name + '(' + c.id + ')').join('、'))
    console.log('  全部人名：node tools/yakitahome.mjs list msg')
    return
  }
  const name = hit.name || pick(hit.i18n && hit.i18n.name, DEF_LANG)
  console.log('· 联系人 [' + hit.id + '] ' + name + (hit.isGroupChat ? '（群聊 ' + hit.peopleNum + ' 人）' : ''))
  if (hit.desc) console.log('  ' + flatLine(hit.desc))
  const convs = hit.conversations || []
  console.log('  ' + convs.length + ' 条会话，共 ' + (hit.messageCount || 0) + ' 条消息')

  if (opts.conv) {
    const cv = convs.find((v) => String(v.id) === String(opts.conv))
    if (!cv) {
      console.log('  这个人没有会话 ' + opts.conv)
      return
    }
    printLocalConv(cv, opts)
    return
  }
  const shown = opts.full ? convs : convs.slice(0, Number(opts.limit || 20))
  for (const v of shown) {
    console.log('  [会话 ' + v.id + '] ' + flatLine(v.title || v.preview) +
      ' · ' + (v.messageCount || 0) + ' 条' + (v.versionLabel ? ' · ' + v.versionLabel : '') +
      ' · 本地有全文' + (v.detailLoaded ? '' : '（带发送人的结构化正文在站点 ' + v.detailUrl + '）'))
  }
  if (convs.length > shown.length) console.log('  …… 还有 ' + (convs.length - shown.length) + ' 条会话，加 --full 全看')
  console.log('  看某条会话的正文：node tools/yakitahome.mjs msg ' + q + ' --conv <会话 id>')
}

// 本地没有结构化消息，只有摊平的 searchText；默认按启发式挑简体行，--raw 看原样
const printLocalConv = (v, opts = {}) => {
  console.log('· 会话 [' + v.id + '] ' + flatLine(v.title || v.preview) + (v.versionLabel ? '  ' + v.versionLabel : ''))
  console.log('  ' + (v.messageCount || 0) + ' 条消息；带发送人的结构化正文要联网取：' + HOST + v.detailUrl)
  const raw = String(v.searchText || v.preview || '')
  const lines = raw.split(NL).map((l) => l.trimEnd()).filter((l) => l.trim())
  const picked = opts.raw ? lines : lines.filter((l) => looksZhHans(l) || PLAIN.test(l))
  const shown = opts.full ? picked : picked.slice(0, DEF_LINES)
  for (const l of shown) console.log('  ' + l)
  if (picked.length > shown.length) console.log('  …… 还有 ' + (picked.length - shown.length) + ' 行，加 --full 全看')
  if (!opts.raw) console.log('  （本地 searchText 是多语种摊平的，上面按启发式滤了简体；要原样看加 --raw）')
}

// ---------- info（离线档案） ----------
const cmdInfo = (query, opts) => {
  const data = load('info')
  if (!data) return
  const q = String(query || '').trim()
  if (!q) return usage(1)
  const langs = langList(opts)
  const hits = data.entries.filter((e) => String(e.id) === q || hasAll([flatten(e.title), flatten(e.preview)].join(' '), [q]))
  if (!hits.length) {
    console.log('· 档案里没搜到「' + q + '」')
    return
  }
  console.log('· 档案  命中 ' + hits.length + ' 条（共 ' + data.entries.length + ' 条）')
  for (const e of hits.slice(0, opts.full ? hits.length : Number(opts.limit || DEF_LIMIT))) {
    console.log('  [档案 ' + e.id + ']' + (e.version ? ' ' + e.version : ''))
    for (const l of langs) console.log('      ' + l + '  ' + pick(e.title, l))
    const pv = pick(e.preview, DEF_LANG)
    console.log('      简中 preview（本地副本到此为止，每个语种上限 90 字）：')
    if (pv) for (const l of pv.split(NL)) console.log('        ' + l)
    console.log('      全文：node tools/yakitahome.mjs pull ' + e.id + '   （' + HOST + '/api/info/detail?id=' + e.id + '）')
  }
}

// ---------- list ----------
const cmdList = (what, opts) => {
  const key = what || ''
  if (!key || key === 'all') {
    for (const ds of DATASETS) {
      const data = load(ds.key)
      if (!data) continue
      const n = rowsOf(ds.key, data).length
      console.log('  ' + ds.label + '：' + n + ' 条    ' + ds.file)
    }
    console.log('  列具体清单：list msg | list term | list info | list item（后面可跟关键词过滤）')
    if (!key) return
  }
  if (key === 'msg') {
    const data = load('msg')
    if (!data) return
    const q = opts.q || ''
    const list = data.contacts.filter((c) => !q || (c.name || '').includes(q) || (c.desc || '').includes(q))
    console.log('· 联系人 ' + list.length + ' / ' + data.contacts.length + ' 人' + (q ? '（筛「' + q + '」）' : ''))
    for (const c of list.slice(0, opts.full ? list.length : Number(opts.limit || 30))) {
      console.log('  [' + c.id + '] ' + c.name + '  ' + (c.conversations || []).length + ' 条会话' +
        (c.isGroupChat ? '（群聊 ' + c.peopleNum + ' 人）' : '') + (c.desc ? '  ' + flatLine(c.desc) : ''))
    }
    return
  }
  const ds = DATASETS.find((d) => d.key === key)
  if (!ds) {
    console.log('  list 只认 term / msg / info / item')
    return
  }
  const data = load(key)
  if (!data) return
  const rows = rowsOf(key, data)
  const q = opts.q || ''
  const list = q ? rows.filter((r) => hasAll(r.hay, [q])) : rows
  console.log('· ' + ds.label + '  ' + list.length + ' / ' + rows.length + ' 条' + (q ? '（筛「' + q + '」）' : ''))
  for (const r of list.slice(0, opts.full ? list.length : Number(opts.limit || 30))) {
    console.log('  [' + r.id + '] ' + flatLine(r.title) + (r.extra ? '  ' + r.extra : ''))
  }
}

// ---------- 联网两条（显式才走网络） ----------
// 取一次 JSON：404 报「站点没这条」，网络错报「没取到」，都不抛栈
const fetchJson = async (url, opts) => {
  if (typeof fetch !== 'function') {
    console.log('  ! 这个 node 没有 fetch，取不了')
    return { code: 0 }
  }
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), Number(opts.timeout || NET_TIMEOUT))
  try {
    const r = await fetch(url, {
      signal: ac.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36' },
    })
    if (r.status === 404) {
      console.log('  ! 站点没这条（404）：' + url)
      return { code: 404 }
    }
    if (!r.ok) {
      console.log('  ! 站点回 ' + r.status + '，先不硬取：' + url)
      return { code: r.status }
    }
    return { code: 200, json: await r.json() }
  } catch (e) {
    const why = e && e.cause ? (e.cause.code || e.cause.message) : (e && e.name === 'AbortError' ? '超时' : (e && e.message))
    console.log('  ! 没取到（' + why + '）：' + url)
    return { code: 0 }
  } finally {
    clearTimeout(timer)
  }
}

// 档案全文：/api/info/detail?id=<id>。本地那份 preview 每个语种硬砍到 90 字，全文在这儿
const cmdPull = async (id, opts) => {
  if (!id) return usage(1)
  const url = HOST + '/api/info/detail?id=' + encodeURIComponent(id)
  const got = await fetchJson(url, opts)
  if (got.code !== 200) return
  const json = got.json
  const langs = langList(opts)
  console.log('· 档案 [' + json.id + '] ' + pick(json.title, DEF_LANG) + (json.version ? '  ' + json.version : ''))
  console.log('  端点 ' + url + '；可写进 src 的 id：' + json.id + '（标题 key ' + (json.titleKey || '-') + '）')
  for (const l of langs) {
    const t = pick(json.text, l)
    if (!t) continue
    if (langs.length > 1) console.log('  ---- ' + l + ' ----')
    for (const line of t.split(NL)) console.log('  ' + line)
  }
  console.log('  （原文里有 {PlayerName} 这种占位符，是游戏里替换玩家名的，不是漏字）')
}

// 逐条飞讯：/api/feixun/conversation/<id>。本地只有摊平的 searchText
const cmdPullConv = async (id, opts) => {
  if (!id) return usage(1)
  const url = HOST + '/api/feixun/conversation/' + encodeURIComponent(id)
  const got = await fetchJson(url, opts)
  if (got.code !== 200) return
  const json = got.json
  const cv = json.conversation || {}
  const F = load('msg')
  const who = F ? F.contacts.find((c) => String(c.id) === String(json.contactId)) : null
  console.log('· 会话 [' + cv.id + '] ' + flatLine(cv.title || cv.preview) + (cv.versionLabel ? '  ' + cv.versionLabel : ''))
  console.log('  联系人 ' + json.contactId + ' ' + (who ? who.name : '（本地没有这个人）') + ' · ' + (cv.messages || []).length + ' 条消息')
  console.log('  端点 ' + url + '；可写进 src 的 id：' + cv.id)
  const msgs = cv.messages || []
  const shown = opts.full ? msgs : msgs.slice(0, Number(opts.limit || 40))
  for (const m of shown) {
    const t = pick(m.text && m.text.i18n, DEF_LANG) || pick(m.displayText && m.displayText.i18n, DEF_LANG) || flatLine(m.text)
    const sender = m.senderName || (m.side === 'player' ? '漂泊者' : '')
    console.log('  ' + (sender ? sender + '：' : '') + String(t).split(NL).join(' ⏎ '))
  }
  if (msgs.length > shown.length) console.log('  …… 还有 ' + (msgs.length - shown.length) + ' 条，加 --full 全看')
}

// ---------- 用法 ----------
const usage = (code = 0) => {
  console.log([
    '鸣潮文本检索站离线查阅工具（默认不联网）',
    '',
    '  node tools/yakitahome.mjs search <关键词…>                四个数据集一起搜，带数据集和条目 id',
    '  node tools/yakitahome.mjs term <关键词|id>               术语原文（多语种）',
    '  node tools/yakitahome.mjs msg <联系人|id>                 列某人的飞讯会话',
    '  node tools/yakitahome.mjs msg <联系人> --conv <会话 id>   看本地会话全文',
    '  node tools/yakitahome.mjs info <id|标题片段>             档案条目（本地只有前 90 字）',
    '  node tools/yakitahome.mjs list [term|msg|info|item] [关键词]',
    '  node tools/yakitahome.mjs pull <档案 id>                 联网：取 /api/info/detail 全文',
    '  node tools/yakitahome.mjs pull-conv <会话 id>            联网：取逐条飞讯消息',
    '',
    '开关：--full（不限条数）  --limit N  --raw（飞讯不滤语言）  --lang zh-Hant|ja|en|all  --timeout 毫秒',
    '数据：source/yakitahome-terms.json、source/yakitahome-feixun.json、cache/yakitahome-info.json、cache/yakitahome-items.json',
  ].join(NL))
  process.exit(code)
}

// ---------- 入口 ----------
const argv = process.argv.slice(2)
const cmd = argv[0]
const opts = {}
const rest = []
for (let i = 1; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--full') opts.full = true
  else if (a === '--raw') opts.raw = true
  else if (a === '--lang') opts.lang = argv[++i]
  else if (a === '--limit') opts.limit = argv[++i]
  else if (a === '--conv') opts.conv = argv[++i]
  else if (a === '--timeout') opts.timeout = argv[++i]
  else if (a.startsWith('--')) opts[a.slice(2)] = '1'
  else rest.push(a)
}
opts.q = rest[1] || ''

if (cmd === 'search') cmdSearch(rest.join(' '), opts)
else if (cmd === 'term') cmdTerm(rest.join(' '), opts)
else if (cmd === 'msg') cmdMsg(rest[0], opts)
else if (cmd === 'info') cmdInfo(rest.join(' '), opts)
else if (cmd === 'list') cmdList(rest[0], opts)
else if (cmd === 'pull') await cmdPull(rest[0], opts)
else if (cmd === 'pull-conv') await cmdPullConv(rest[0], opts)
else usage(cmd ? 1 : 0)
