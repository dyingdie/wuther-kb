// 按需拉游戏内档案全文（一手文本）
// 端点：https://mc.yakitahome.com/api/info/detail?id=<档案 id>
// 本地 kb/cache/yakitahome-info.json 的 preview 每条只有前 90 字，所以要另外拉 detail 才有全文
// 规矩：并发 3、每条之间歇 400ms、拉过的跳过（断点续拉）、拉不到记 error 不静默丢
// 用法：
//   node tools/pull-info.mjs --dry-run        只看会拉哪些，不发请求
//   node tools/pull-info.mjs                  拉没拉过的
//   node tools/pull-info.mjs --limit 5        只试前 5 条
//   node tools/pull-info.mjs --kw 达妮娅 --kw 洛瑟菈   加筛词（可重复）
//   node tools/pull-info.mjs --print 0        跑完别刷清单
import { join } from 'node:path'
import { loadJson, saveJson, saveText, pickLang, pickFields, fetchJson, runPool, oneLine, parseArgs, KB, HOST, NET_CONCURRENCY, NET_GAP_MS, nowIso, stamp, setLimits, NL } from './pull-common.mjs'

const LOCAL = join(KB, 'cache', 'yakitahome-info.json')
const OUT = join(KB, 'source', 'yakitahome-info-full.json')
const INDEX = join(KB, 'source', 'yakitahome-info-full-index.md')
const FLUSH_EVERY = 5

// 筛词分两档。判据只用本地那份的 title + preview（zh-Hans；空就退回第一个非空语种）
// core：达妮娅线和她的圈子，命中就入选，不看版本
// wide：组织、地名、机制的大词，泛得很；只在 3.2 及以后的版本里才算数，免得把一测二测的边角料也拉下来
export const CORE = [
  '达妮娅', '达斯维达妮娅', '娅娅', '西格莉卡', '绯雪', '阿列夫一', '娜波摩', '娜斯塔霞', '洛瑟菈', '弗洛洛',
  '阿里曼', '阿里曼托', '斯瓦茨洛', '爱弥斯', '千咲', '琳奈', '莫宁', '秧秧', '巴蒂尔', '陆·赫斯',
  '波西亚', '班鲁', '埃尔斯卡', '梅森', '科斯莫', '残星会', '星炬学院', '黯原', '拉海洛', '爱达千',
  '泡影视阈', '声痕', '抑制设备', '频率流失', '战术响应组', 'I.R.I.S', '换日庆典',
]
export const WIDE = [
  // 组织势力（org.js / factions.js 里那批，3.2-3.7 版本出现的）
  '深空联合', '黑海岸', '新联邦', '先行公约', '罗伊族', '隐海修会', '翡萨烈', '莫塔里', '黄金之歌',
  '愚人剧团', '禁锁十契', '昭明商会', '琢钧堂', '稷廷', '呜呜物流', '虚质科学部', '克里斯托弗', '漂泊者',
  // 机制与术语
  '虚质', '悲鸣', '鸣式', '索拉里斯', '调律者', '隧门', '无音区', '残象', '适格者', '隧者',
  '共鸣抑制', '泡泡', '黯核', '聚爆',
  // 地方与场景
  '瑝珑', '今州', '黎那汐塔', '罗伊冰原', '坠剑湖', '浮光林', '引日殿', '玄方城', '医务室',
  '心之集域', '隐海试验场', '天空海', '天槎空间站', '拉古那', '七丘', '莉莉兰德',
]

const TITLE_KEYS = ['titleKey', 'textKey', 'type', 'itemId', 'version']

const opts = parseArgs(process.argv)
// --conc N / --gap MS：站点开始挡人的时候调小再来一遍
setLimits(opts.conc, opts.gap)
// 额外筛词：--kw 词（可重复）
const extra = []
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--kw') { extra.push(String(process.argv[i + 1] || '')); i++ }
}
const WORDS = CORE.concat(WIDE, extra.filter(Boolean))
const PRINT = opts.rest[0] === '--print' ? Number(process.argv[process.argv.indexOf('--print') + 1] || 0) : 120

const local = loadJson(LOCAL)
if (!local) {
  console.log('  ! 读不到 ' + LOCAL + '，先让主人把档案那份放好')
  process.exit(1)
}

// 版本号：'3.3版本' → 3.3；'二测沿用' → 0
const verNum = (s) => {
  const head = String(s || '').split('版本')[0]
  const n = Number(head)
  return Number.isFinite(n) ? n : 0
}

// 先离线筛：title + preview 命中 core 的直接入选；只命中 wide 的要 3.2 及以后
const MIN_VER = 3.2
const all = Array.isArray(local.entries) ? local.entries : []
const picked = []
for (const e of all) {
  const t = pickLang(e.title).text
  const p = pickLang(e.preview).text
  const hay = t + ' ' + p
  const hitCore = CORE.filter((w) => hay.includes(w))
  const hitWide = WIDE.filter((w) => hay.includes(w))
  const ver = e.version || ''
  const ok = hitCore.length > 0 || (hitWide.length > 0 && verNum(ver) >= MIN_VER)
  if (ok) picked.push({ id: String(e.id), title: t, version: ver, hit: hitCore.concat(hitWide), why: hitCore.length ? 'core' : 'wide+' + ver })
}

const prev = loadJson(OUT)
const records = prev && Array.isArray(prev.entries) ? prev.entries.slice() : []
const errors = prev && Array.isArray(prev.errors) ? prev.errors.slice() : []
const done = new Set(records.map((r) => String(r.id)))
const errored = new Set(errors.map((e) => String(e.id)))

const todo = picked.filter((p) => (opts.force || !done.has(p.id))).slice(0, opts.limit > 0 ? opts.limit : undefined)

console.log('档案按需拉取  ' + stamp())
console.log('  本地 ' + all.length + ' 条档案 → 筛出 ' + picked.length + ' 条和达妮娅线相关（判据：title + preview；core ' + CORE.length + ' 个词命中就收，wide ' + WIDE.length + ' 个词要 ' + MIN_VER + ' 版本以上）')
console.log('  已有 ' + records.length + ' 条；本次要拉 ' + todo.length + ' 条；并发 ' + NET_CONCURRENCY + '，每条之间歇 ' + NET_GAP_MS + 'ms')

if (opts.rest[0] === '--dry-run') {
  for (const p of picked) console.log('  ' + p.id + ' [' + p.version + '] ' + p.title + '  ← ' + p.why + '：' + p.hit.join('/'))
  process.exit(0)
}
if (todo.length === 0) {
  console.log('  没什么可拉的了。要重拉加 --force')
  process.exit(0)
}

let okCount = 0
let failCount = 0
const started = Date.now()

const write = () => saveJson(OUT, {
  source: HOST + '/api/info',
  endpoint: HOST + '/api/info/detail?id=<档案 id>',
  localIndex: 'cache/yakitahome-info.json',
  note: '一手文本。text 是 zh-Hans 全文；本地 preview 只有前 90 字，全文以这里为准。正文里 {PlayerName} 是游戏内替换玩家名的占位符，照原样保留。',
  filter: { core: CORE, wide: WIDE, minVer: MIN_VER, basedOn: '本地 title + preview' },
  updatedAt: nowIso(),
  count: records.length,
  entries: records,
  errors,
})

await runPool(todo, async (p) => {
  const url = HOST + '/api/info/detail?id=' + encodeURIComponent(p.id)
  const r = await fetchJson(url)
  const at = nowIso()
  if (!r.ok) {
    failCount++
    if (!errored.has(p.id)) {
      errors.push({ id: p.id, title: p.title, version: p.version, matched: p.hit, endpoint: url, error: r.error, at })
      errored.add(p.id)
    }
    console.log('  ! ' + p.id + ' ' + p.title + ' ' + r.error)
    return
  }
  const d = r.data || {}
  const body = pickLang(d.text)
  // 这条上次失败过的话，把旧的 error 撤掉，别让文件里既有好数据又有报错
  const ei = errors.findIndex((x) => String(x.id) === String(p.id))
  if (ei >= 0) errors.splice(ei, 1)
  records.push({
    id: String(d.id || p.id),
    title: pickLang(d.title).text || p.title,
    version: d.version || p.version,
    matched: p.hit,
    textChars: body.text.length,
    textLang: body.lang,
    pulledAt: at,
    endpoint: url,
    keys: pickFields(d, TITLE_KEYS),
    text: body.text,
    ...(opts.allLangs ? { titleI18n: d.title, textI18n: d.text } : {}),
  })
  done.add(p.id)
  okCount++
  console.log('  ' + okCount + '/' + todo.length + '  ' + p.id + ' [' + (d.version || p.version) + '] ' + (pickLang(d.title).text || p.title) + '  ' + body.text.length + ' 字')
  if (records.length % FLUSH_EVERY === 0) write()
})

write()

// 清单：id + 标题 + 版本 + 命中词 + 字数 + 一句话概要
const md = []
md.push('# 游戏内档案全文索引（' + records.length + ' 条）')
md.push('')
md.push('数据文件 source/yakitahome-info-full.json，来源 ' + HOST + '/api/info/detail?id=<id>')
md.push('拉取时间 ' + stamp() + '。筛选判据：本地 cache/yakitahome-info.json 的 title + preview 命中筛词。')
md.push('正文里 {PlayerName} 是游戏内替换玩家名的占位符，不是漏字。')
md.push('')
md.push('| id | 标题 | 版本 | 命中词 | 字数 | 一句话概要 |')
md.push('| --- | --- | --- | --- | --- | --- |')
const esc = (s) => String(s || '').split('|').join('/')
for (const r of records.slice().sort((a, b) => String(b.textChars || 0) - String(a.textChars || 0))) {
  md.push('| ' + r.id + ' | ' + esc(r.title) + ' | ' + esc(r.version) + ' | ' + esc((r.matched || []).join('/')) + ' | ' + (r.textChars || 0) + ' | ' + esc(oneLine(r.text, 70)) + ' |')
}
if (errors.length) {
  md.push('')
  md.push('## 没拉到的（' + errors.length + ' 条，重跑默认跳过，加 --force 重试）')
  md.push('')
  for (const e of errors) md.push('- ' + e.id + ' ' + e.title + '：' + e.error)
}
saveText(INDEX, md.join(NL) + NL)

const secs = ((Date.now() - started) / 1000).toFixed(1)
console.log('')
console.log('  成功 ' + okCount + ' / 失败 ' + failCount + '，用了 ' + secs + ' 秒')
console.log('  结果 ' + OUT)
console.log('  清单 ' + INDEX)

if (PRINT > 0) {
  console.log('')
  const top = records.slice().sort((a, b) => String(b.textChars || 0) - String(a.textChars || 0))
  for (const r of top.slice(0, PRINT)) {
    console.log('  ' + r.id + ' [' + r.version + '] ' + r.title)
    console.log('      ' + oneLine(r.text, 90))
  }
  if (top.length > PRINT) console.log('  …还有 ' + (top.length - PRINT) + ' 条，完整清单看 ' + INDEX)
}
process.exit(0)
