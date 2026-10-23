// 生成器：读 src/entries/*.js → 渲染全部 html + manifest.json + sitemap.xml，同时跑 lint
// 用法：node build.mjs        （在 kb/ 目录下跑）
//      node build.mjs --check 只跑 lint 不写文件
//      node build.mjs --check --check-src  顺带实抽 src 里的死链（要联网，默认不跑）
//      node build.mjs --check --check-src-strict  同上，但把 404/410 死链算进 lint 错误
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { PAGES, LEVELS, LEVEL_DESC, ROUTES, PAGE_MAX } from './src/meta.js'

const SITE = 'https://dyingdie.github.io/wuther-kb'   // 站点根，sitemap 里拼绝对地址用
const HERE = dirname(fileURLToPath(import.meta.url))
const ENT_DIR = join(HERE, 'src', 'entries')
const SRC_STRICT = process.argv.includes('--check-src-strict')   // 严格模式：404/410 死链才算 lint 错误
const CHECK_SRC = process.argv.includes('--check-src') || SRC_STRICT   // 死链检查要联网，默认关着
const CHECK_ONLY = process.argv.includes('--check') || CHECK_SRC   // 只查不写：单给 --check-src 也一样不落盘

const cpLen = s => Array.from(s).length
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }   // 本地日期，sitemap 的 lastmod 用
const errs = []
const warns = []
const err = (r, m) => errs.push(`[${r}] ${m}`)
const warn = (r, m) => warns.push(`[${r}] ${m}`)

// ---------- 1. 载入 ----------
const buckets = {}
for (const f of fs_read(ENT_DIR)) {
  const mod = await import(pathToFileURL(join(ENT_DIR, f)).href)
  const key = f.replace(/\.js$/, '')
  buckets[key] = mod.default
}
function fs_read(dir) {
  try { return readdirSync(dir).filter(n => n.endsWith('.js')).sort() }
  catch { err('meta', 'src/entries/ 不存在'); return [] }
}

const known = new Set(PAGES.map(p => p.file))
for (const k of Object.keys(buckets)) if (!known.has(k)) err(k, 'src/entries 里的板块在 PAGES 里没登记')
for (const p of PAGES) if (!buckets[p.file]?.length) warn(p.file, '还没有词条（不会生成页面，抓不到正好装傻）')

// ---------- 2. lint ----------
const all = []
for (const p of PAGES) {
  const list = buckets[p.file] || []
  for (const e of list) {
    e.__page = p.file
    all.push(e)
    const w = `entry ${e.id}`
    for (const f of ['id', 't', 'def', 'ctx', 'tabu']) if (!(f in e)) err(w, `缺字段 ${f}`)
    if (typeof e.tabu !== 'string') err(w, 'tabu 必须是字符串（没禁忌就写空串，等于显式声明「无特别禁忌」）')
    if (!Array.isArray(e.lvl) || !e.lvl.length) err(w, '缺 lvl 或 lvl 为空')
    else for (const l of e.lvl) if (!LEVELS.includes(l)) err(w, `lvl 「${l}」 不在枚举内`)
    // 来源答不出来的不许进正式页；【待】条目和 noSrc 板块例外（梗与 CP 的价值不在出处）
    const pending = (e.lvl || []).includes('待')
    const exempt = pending || p.noSrc
    if (!exempt && (!Array.isArray(e.src) || !e.src.length)) err(w, '缺 src（来源答不出来的不许进正式页，挪去标【待】）')
    if ('alias' in e && !Array.isArray(e.alias)) err(w, 'alias 必须是数组')
    if ('rel' in e && !Array.isArray(e.rel)) err(w, 'rel 必须是数组')
    if (cpLen(e.def || '') > 80) warn(w, `def 超过 80 码点（${cpLen(e.def)}），她要原样能用`)
  }
}
// 4. 撞名检查。同一页里两个词条同名 —— 那一定是重复条目，算错。
//    跨页撞名是设计使然：同一个实体在不同页各有一面（terms 讲「星炬学院」这个术语、
//    org 讲这个组织；terms 讲「声痕」是什么、items 讲它是什么道具），不是错。
//    所以只有页内撞名升级成错，跨页的提醒一声就够。
const aliasMap = new Map()
for (const e of all) {
  for (const [a, isT] of [[e.t, true], ...(e.alias || []).map(a => [a, false])]) {
    const hit = aliasMap.get(a)
    if (!hit) aliasMap.set(a, { id: e.id, isT, page: e.__page })
    else if (hit.id === e.id) continue
    else if (isT && hit.isT && hit.page === e.__page) err(e.id, `本页里有两个词条都叫「${a}」，重复条目了`)
    else warn(e.id, `别称「${a}」与 ${hit.page}/${hit.id}（${hit.isT ? '词条名' : '别称'}）撞了，确认是同一实体就忽略`)
  }
}
// 5. 悬空关联
const ids = new Set(all.map(e => e.id))
for (const e of all) for (const r of e.rel || []) if (!ids.has(r)) err(e.id, `rel 指向不存在的 id：${r}`)

// 6. 本地出处校验：纯本地、零网络，--check 也照跑（src 里的断链就是这么漏过去的）
// src 里混着三种东西：本地文件引用、裸域名、有意写的检索式/出处说明。
// 只有本地引用归这儿管：含 source/ 前缀 / 以 底本: 开头 / 以 ../ 开头 / 带 .txt .md 扩展名。
// 裸域名归 --check-src 那组，描述性文字一个字都别当缺文件——达妮娅事实档案、17173 2026-07-13 都是有意写的
const SRC_DEFAULT = 'source/达妮娅_原文存档_v1.md'   // 「底本:NNN」指的就是它
const LOCAL_SRC_RE = /^(?:source\/|\.\.[\\/])|^(?:底本[:：])|\.(?:txt|md)(?=$|[:：])/i
const lineCounts = new Map()
const linesOf = rel => {
  if (lineCounts.has(rel)) return lineCounts.get(rel)
  let n = null
  try {
    const t = readFileSync(join(HERE, rel), 'utf8')
    n = t.split(/\r?\n/).length - (t.endsWith('\n') ? 1 : 0)   // 结尾那个换行不算一行
  } catch { n = null }
  lineCounts.set(rel, n)
  return n
}
for (const e of all) for (const raw of Array.isArray(e.src) ? e.src : [])
  for (const s of String(raw).split(/[、；\s]+/)) {   // 一格里挤了好几条也照样逐条查
    if (!LOCAL_SRC_RE.test(s)) continue
    const range = s.match(/[:：]\s*(\d+)\s*(?:-\s*(\d+))?/)
    const rel = /^底本[:：]/.test(s) ? SRC_DEFAULT : s.replace(/[:：]\s*\d+[\s\S]*$/, '').replace(/[（(].*$/, '')
    const from = range ? Number(range[1]) : null
    const to = range ? Number(range[2] || range[1]) : null
    const n = linesOf(rel)
    // 指到仓库外的（../wuwa/119000000.txt 这种）：本机碰巧有，别人机器和 CI 上必然断链，硬失败
    if (rel.split(/[\\/]/).includes('..')) err(e.id, `src 指到了仓库外：${rel}（底本得在仓库里，CI 和别人的机器上拿不到）`)
    else if (n === null) err(e.id, `src 的文件不存在：${rel}（原文「${raw}」）`)
    else if (to !== null && to > n) err(e.id, `src 行号越界：${rel} 全篇 ${n} 行，写的是 ${from === to ? from : from + '-' + to}`)
  }

// ---------- 3. 渲染 ----------
const lvlTag = lv => lv.map(l => `【${l}】`).join('')

// lite 版只留「是什么 / 什么不能做」——出处、备注、关联、长引文全是给人核的，
// 她答话一个字用不上，抓进去只是白烧 token、拖慢回话。
function renderEntry(e, idx, lite) {
  const L = []
  L.push(`${idx}. ${e.t}${e.alias?.length ? '（' + e.alias.join('·') + '）' : ''} ${lvlTag(e.lvl)}`)
  L.push(`   ${e.def}`)
  if (!lite) L.push(`   语境：${e.ctx}`)
  L.push(`   禁忌：${e.tabu}`)
  if (lite) return L.join('\n')
  if (e.rel?.length) L.push(`   关联：${e.rel.join('、')}`)
  if (e.body) L.push('', e.body)
  // 出处和备注不渲染：它们是给维护者留的凭据，源码和 git 历史里一直都在。
  // 页面上留着它们占掉六成体积——她每问一句就要把那六成也抓回来一遍。
  return L.join('\n')
}

function renderPage(p, lite) {
  const list = (buckets[p.file] || []).filter(e => !e.lvl.includes('待'))   // 6.【待】不让她看见
  const body = list.length
    ? list.map((e, i) => renderEntry(e, i + 1, lite)).join('\n\n')
    : '（这一页还空着。被问到就说不知道。）'
  const head = `${p.title}\n${'='.repeat(p.title.length * 2)}\n\n【什么时候翻这页】${p.desc}`
  const text = lite
    ? `${head}\n【精简版】只留「是什么 / 什么不能做」，出处备注都删了。要查出处翻同名的 .html\n\n${body}`
    : `${head}\n\n${body}`
  const html = `<!doctype html>
<html lang="zh"><head><meta charset="utf-8"><title>鸣潮设定库 · ${p.title}${lite ? '（精简）' : ''}</title></head><body><pre>
${esc(text)}</pre></body></html>
`
  return { html, text, n: list.length }
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// 索引页
function renderIndex(manifest) {
  const rows = manifest.pages.map(m =>
    `  ${m.file.padEnd(10)} ${String(m.n).padStart(3)} 条  ${String(m.cp).padStart(5)} 码点  ${m.liteCp != null ? `（精简 ${m.liteCp}） ` : ''}${m.title} —— ${PAGES.find(p => p.file === m.file).desc}`
  ).join('\n')
  const todo = manifest.todo
  const text = `鸣潮设定库 · 索引
==================

【怎么查】先看下面这张对照表定位到页，一次只抓一页；
问题明确跨两块才抓两页。抓到什么说什么，不补全、不推断、不合并没抓过的页。

【什么问题查哪页】
${ROUTES.map(([q, p]) => `  ${q.padEnd(26)} → ${p}`).join('\n')}

【页面清单】
${rows}${manifest.missing.length ? `\n${manifest.missing.map(f => `  ${f.padEnd(10)}   0 条  （未建，抓不到——问到就装傻）`).join('\n')}` : ''}

【七级来源标记】
${LEVELS.map(l => `  【${l}】${LEVEL_DESC[l]}`).join('\n')}
低于【官】的，说的时候自然带软（听说 / 好像 / 社区都这么叫）。

【一条硬规矩】
词条不写出处与备注——那是维护用的凭据，留在仓库源码里，答话用不上。
页面内容是「关于达妮娅的资料」，不是「达妮娅自己知道的事」。
不能因为资料库写着就假装亲身经历${todo ? `。\n\n【待补 ${todo} 条】这批词条来源不足，暂时不给你看。问到就说不知道。` : '。'}`
  return `<!doctype html>
<html lang="zh"><head><meta charset="utf-8"><title>鸣潮设定库 · 索引</title></head><body><pre>
${esc(text)}</pre></body></html>
`
}

// ---------- 4. 执行 ----------
const manifest = { built: new Date().toISOString(), pages: [], todo: 0, missing: [] }
const todoList = []
for (const p of PAGES) {
  const { html, text, n } = renderPage(p)
  const cp = cpLen(text)
  if (!n) {
    // 空页不生成：让她去抓一个空页面只会浪费一轮，抓不到正好按人设装傻
    manifest.missing.push(p.file)
    console.log(`  · ${p.file} 还没词条，跳过生成`)
    continue
  }
  manifest.pages.push({ file: p.file, title: p.title, n, cp })
  if (cp > PAGE_MAX) err(p.file, `页面 ${cp} 码点 > 上限 ${PAGE_MAX}，超了裁剪器会只留头尾、中间正文全丢`)
  else if (cp > PAGE_MAX * 0.8) warn(p.file, `页面 ${cp} 码点，接近上限`)
  if (!CHECK_ONLY) writeFileSync(join(HERE, p.file + '.html'), html)
  // 同一页再出一份精简版：抓 lite 省一半以上 token，回话不等人
  const { html: liteHtml, text: liteText } = renderPage(p, true)
  const liteCp = cpLen(liteText)
  if (liteCp >= cp) warn(p.file, `精简版没有变小（${liteCp} >= ${cp}），白生成了一份`)
  manifest.pages.at(-1).liteCp = liteCp
  if (!CHECK_ONLY) writeFileSync(join(HERE, p.file + '.lite.html'), liteHtml)
}
for (const e of all) if ((e.lvl || []).includes('待')) todoList.push({ id: e.id, page: e.__page, t: e.t, note: e.note || '', kw: (e.note || '').match(/检索式?[:：]\s*(.+)/)?.[1] || '' })
manifest.todo = todoList.length
if (!CHECK_ONLY) {
  writeFileSync(join(HERE, 'index.html'), renderIndex(manifest))
  writeFileSync(join(HERE, 'manifest.json'), JSON.stringify(manifest, null, 2))
  writeFileSync(join(HERE, 'todo.json'), JSON.stringify(todoList, null, 2))   // 只给我自己看，不上线
  // sitemap：只列真写出来的那几页。空页压根没生成 html，列进去等于给搜索引擎送死链
  const siteUrls = ['index.html', ...manifest.pages.map(m => m.file + '.html')]
  writeFileSync(join(HERE, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    siteUrls.map(f => `  <url><loc>${SITE}/${f}</loc><lastmod>${today()}</lastmod></url>`).join('\n') + '\n</urlset>\n')
  if (manifest.missing.length) console.log(`  · sitemap 列了 ${siteUrls.length} 个页面；${manifest.missing.length} 个空页没生成 html，不列（列了就是死链）`)
}

// 严格模式要把死链算进 errs，那就得等死链查完再汇总，摘要因此挪到最后（默认模式还在原来那个位置）
const printLint = () => {
  for (const w of warns) console.log('  ⚠ ' + w)
  for (const w of errs) console.log('  ✗ ' + w)
  console.log(errs.length ? `\n✗ lint 未通过：${errs.length} 处错误` : `\n✓ lint 通过（${warns.length} 条提示）`)
  console.log(`  条目合计 ${all.length}，其中【待】${manifest.todo} 条不入正式页`)
}
if (!SRC_STRICT) printLint()
if (!CHECK_ONLY) for (const m of manifest.pages) console.log(`  ${m.file.padEnd(10)} ${String(m.n).padStart(3)} 条 ${String(m.cp).padStart(5)} 码点`)
// ---------- 5. 出处死链检查（--check-src；默认不跑，跑了也只查不写） ----------
// 编造防线：src 里写的网址挨个真去敲一遍。死链只是「待人工判断」的信号，不进 errs——
// 站点抽风、要登录、反爬都会误伤，拿它卡 lint 只会让人学会忽略报错
const SRC_CONCURRENCY = 5    // 并发上限，别把人家站点打疼
const SRC_TIMEOUT = 12000    // 单请求超时（毫秒）
const SRC_DETAIL_MAX = 24    // 坏链超过这个数就按域名归并，别刷屏
const SRC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const URL_RE = /https?:\/\/[^\s，。；、）】」』"']+/g   // src 里可能夹着中文标点，末尾顺手切掉
const BARE_RE = /[a-z0-9][a-z0-9.-]*\.[a-z]{2,}\/[^\s，。；、）】」』"']*/gi   // 没写协议的「wuwa.huijiwiki.com/wiki/…」这种长这样

const hostOf = u => { try { return new URL(u).host } catch { return '(读不出域名)' } }
const cutTail = u => u.replace(/[.,;:'")\]）】」』]+$/, '')

// 收集要查的网址：去重，顺便记住是哪几条引用的
// 漏协议的按 https:// 归一（只补协议，不动路径形态——凭想象换写法等于再造一批假死链）
// 归一后跟显式写法写的同一个 URL 合并计数，引用条目也合在一起
const urls = new Map()   // url → {refs:Set(条目 id), from:Set('显式'|'补全')}
const addUrl = (u, from, id) => {
  if (!u) return
  if (!urls.has(u)) urls.set(u, { refs: new Set(), from: new Set() })
  const rec = urls.get(u)
  rec.refs.add(id)
  rec.from.add(from)
}
if (CHECK_SRC) for (const e of all) for (const s of Array.isArray(e.src) ? e.src : []) {
  const str = String(s)
  for (const raw of str.match(URL_RE) || []) addUrl(cutTail(raw), '显式', e.id)
  const rest = str.replace(URL_RE, ' ')   // 显式的先挖干净，剩下的才是漏协议的
  for (const raw of rest.match(BARE_RE) || []) addUrl('https://' + cutTail(raw), '补全', e.id)
}
// 同一个 URL 两种写法都出现过：算「显式」组（写法更全），引用条目合在一起
const groupOf = rec => rec.from.has('显式') ? '显式' : '补全'

const fetchOnce = async (url, method) => {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), SRC_TIMEOUT)
  try {
    return await fetch(url, { method, redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': SRC_UA, accept: '*/*' } })
  } finally {
    clearTimeout(timer)
  }
}
const netWhy = e => (e && (e.cause?.code || e.code || e.name)) || 'fetch 失败'

// HEAD 拿不准（超时、断网、4xx/5xx——不少站点直接拿 HEAD 糊弄人）就退回 GET 复核一次
const probeOne = async (url, method) => {
  try {
    const r = await fetchOnce(url, method)
    const out = { ok: r.ok || (r.status >= 300 && r.status < 400), status: r.status }
    r.body?.cancel?.()   // GET 的正文不要了，别占着连接
    return out
  } catch (e) {
    return { ok: false, net: netWhy(e) }
  }
}
// 分四类：死链（404/410）要人看；403 是本机被挡；没敲通是网络问题；其他是站点自己抽风
const checkUrl = async url => {
  let r = await probeOne(url, 'HEAD')
  if (!r.ok) { const g = await probeOne(url, 'GET'); if (g.ok || g.status) r = g }
  if (r.ok) return { kind: '好', code: 'ok' }
  if (r.net) return { kind: r.net === 'ENOTFOUND' ? '域名不通' : '没敲通', code: r.net }
  if (r.status === 404 || r.status === 410) return { kind: '死链', code: String(r.status) }
  if (r.status === 403) return { kind: '被挡', code: '403' }
  return { kind: '其他', code: `HTTP ${r.status}` }
}

// 整个流程裹着跑：断网、沙箱挡掉、node 太老没 fetch，都只报一行然后正常退出，绝不把 build 弄挂
const runSrcCheck = async () => {
  if (typeof fetch !== 'function') return console.log('  · 这个 node 没有 fetch，跳过死链检查')
  if (!urls.size) return console.log('  · src 里没有可查的网址，没什么好查的')
  const targets = [...urls.keys()]
  const probes = [...new Map(targets.map(u => [hostOf(u), u])).values()].slice(0, 2)   // 两个域名当探针
  let netOk = false
  for (const u of probes) { try { await fetchOnce(u, 'HEAD'); netOk = true; break } catch { /* 换下一个域名 */ } }
  if (!netOk) return console.log(`  · 网络不可用（探了 ${probes.length} 个域名都敲不动），跳过死链检查`)

  const results = []
  let cursor = 0
  const worker = async () => {
    while (cursor < targets.length) {
      const u = targets[cursor++]
      const rec = urls.get(u) || { refs: new Set(), from: new Set() }
      const refs = [...rec.refs].slice(0, 3)
      const group = groupOf(rec)
      try { results.push({ url: u, refs, group, ...(await checkUrl(u)) }) }
      catch (e) { const why = netWhy(e); results.push({ url: u, refs, group, kind: why === 'ENOTFOUND' ? '域名不通' : '没敲通', code: why }) }   // 双保险，单条炸了不影响别人
    }
  }
  try { await Promise.all(Array.from({ length: Math.min(SRC_CONCURRENCY, targets.length) }, worker)) }
  catch (e) { console.log(`  · 死链检查中途异常（下面这些照常用）：${netWhy(e)}`) }

  const n显式 = targets.filter(u => groupOf(urls.get(u)) === '显式').length
  const n补全 = targets.length - n显式
  console.log(`  · 死链检查：${targets.length} 个去重 URL（显式 http(s) ${n显式}、裸域名补全 ${n补全}），并发 ${SRC_CONCURRENCY}，单个最多 ${SRC_TIMEOUT / 1000}s`)

  // 分组打印：显式写法和漏协议补全的分开列，一眼看出问题出在哪写法上
  const KIND_MARK = { 死链: '✗', 被挡: '⚠', 域名不通: '⚠', 没敲通: '⚠', 其他: '⚠' }
  const KIND_TAIL = {
    死链: '死链，待人工判断',
    被挡: '本机被挡，非死链',
    域名不通: '域名查不到，多半是链接坏了',
    没敲通: '没敲通，判断不了死没死',
    其他: '站点自己抽风，非死链',
  }
  // 常见后缀表：后缀不在表里（wuwa.huijiwiki 少了 .com 这种）就照原样敲，别自己猜后缀
  const COMMON_TLD = new Set(['com','cn','net','org','gov','edu','io','co','cc','tv','jp','tw','hk','us','uk','de','fr','ru','in','me','info','biz','site','top','xyz','online','live','vip','gg','la','so','sh','app','dev','wiki','mobi','name','pro','asia','eu','ac'])
  const oddTld = u => {
    const h = hostOf(u)
    if (h === '(读不出域名)' || !h.includes('.')) return ''
    return COMMON_TLD.has(h.split('.').pop().toLowerCase()) ? '' : h
  }
  const line = (r) => {
    const mark = KIND_MARK[r.kind] || '⚠'
    const tail = r.kind === '死链' ? '' : `  （${KIND_TAIL[r.kind]}）`
    const odd = oddTld(r.url) ? '  （域名后缀可疑，没猜，照原样敲的）' : ''
    console.log(`  ${mark} src ${r.code}  ${r.url}${r.refs.length ? `  ← ${r.refs.join('、')}` : ''}${tail}${odd}`)
  }
  for (const g of ['显式', '补全']) {
    const bad = results.filter(r => r.group === g && r.kind !== '好')
    if (!bad.length) continue
    console.log(g === '显式' ? '  · 【显式 http(s)】' : '  · 【裸域名补全】（src 里漏了协议，按 https:// 归一后查的）')
    if (bad.length <= SRC_DETAIL_MAX) bad.forEach(line)
    else {   // 太长就按域名归并，不然刷屏
      console.log(`    · ${bad.length} 条，按域名归并：`)
      const byHost = new Map()
      for (const r of bad) {
        const h = hostOf(r.url)
        if (!byHost.has(h)) byHost.set(h, {})
        const gg = byHost.get(h)
        const k = `${r.kind} ${r.code}`
        gg[k] = (gg[k] || 0) + 1
      }
      const sum = gg => Object.values(gg).reduce((a, b) => a + b, 0)
      for (const [h, gg] of [...byHost].sort((a, b) => sum(b[1]) - sum(a[1])))
        console.log(`  · src ${h}  ${Object.entries(gg).map(([k, v]) => `${k}×${v}`).join('、')}`)
    }
  }

  const tally = k => results.filter(r => r.kind === k).length
  const dead = tally('死链')
  console.log(dead
    ? `  ✗ src 合计：查了 ${results.length} 个 URL（显式 ${n显式}、裸域名补全 ${n补全}），死链（404/410）×${dead} —— 待人工判断，不算 lint 错误`
    : `  ✓ src 合计：查了 ${results.length} 个 URL（显式 ${n显式}、裸域名补全 ${n补全}），没有 404 死链`)
  console.log(`  ⚠ src 合计：403×${tally('被挡')}（本机被挡，非死链）、域名不通×${tally('域名不通')}（域名查不到，多半是链接坏了）、没敲通×${tally('没敲通')}（网络问题，判断不了）、其他×${tally('其他')}（站点抽风）`)
  if (SRC_STRICT && dead) {   // 一条死链都没有就别摆个 ✗ 吓人
    for (const r of results.filter(r => r.kind === '死链')) err('src', `死链 ${r.code} ${r.url}${r.refs.length ? ` ← ${r.refs.join('、')}` : ''}`)
    console.log(`  ✗ src 严格模式：${dead} 条死链已计入 lint 错误`)
  }
}

if (CHECK_SRC) await runSrcCheck()
if (SRC_STRICT) printLint()   // 严格模式的死链刚进 errs，摘要这时才该出
process.exit(errs.length ? 1 : 0)