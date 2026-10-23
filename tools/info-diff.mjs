// info-diff —— 把「档案全文」和本地那份 90 字 preview 比一遍，打印正文里多出来的东西。
//
// 为什么要有：cache/yakitahome-info.json 每条 preview 被服务端硬砍到 90 字，
// 干货全在 source/yakitahome-info-full.json 里。入库前先跑这个，看哪些是 preview 里没有的。
//
// 用法：
//   node tools/info-diff.mjs                 按「多出来的字数」从多到少
//   node tools/info-diff.mjs --top 20        只看前 20 条（默认 20）
//   node tools/info-diff.mjs --min 200       只看多出 200 字以上的（默认 40）
//   node tools/info-diff.mjs --id 28050004   打印某一条的全文
//   node tools/info-diff.mjs --sum           只看汇总（拉到几条、失败几条）
//
// 只读本地文件，不联网、不写文件。

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const KB = join(HERE, '..')
const FULL = join(KB, 'source', 'yakitahome-info-full.json')
const LOCAL = join(KB, 'cache', 'yakitahome-info.json')
const NL = String.fromCharCode(10)
const TAG_RE = /<[^>]+>/g          // 有些正文带 <b> 之类标签，比对前先抹掉
const WS_RE = /\s+/g
const DEF_TOP = 20
const DEF_MIN = 40

const argv = process.argv.slice(2)
const opts = { top: DEF_TOP, min: DEF_MIN, id: '', sum: false }
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--top') { opts.top = Number(argv[i + 1] || DEF_TOP); i++ }
  else if (a === '--min') { opts.min = Number(argv[i + 1] || DEF_MIN); i++ }
  else if (a === '--id') { opts.id = String(argv[i + 1] || ''); i++ }
  else if (a === '--sum') opts.sum = true
}

const clean = (s) => String(s ?? '').replace(TAG_RE, ' ').replace(WS_RE, ' ').trim()
const readJson = (p) => {
  try { return JSON.parse(readFileSync(p, 'utf8')) } catch (e) { return null }
}

// preview 那种多语种对象里取第一个非空的
const pickLang = (o) => {
  if (typeof o === 'string') return { text: o, lang: 'zh-Hans' }
  if (!o || typeof o !== 'object') return { text: '', lang: '' }
  const order = ['zh-Hans', 'zh-Hant', 'ja', 'en', 'ko', 'de', 'es', 'fr']
  for (const l of order) {
    if (typeof o[l] === 'string' && o[l].length) return { text: o[l], lang: l }
  }
  for (const k of Object.keys(o)) {
    if (typeof o[k] === 'string' && o[k].length) return { text: o[k], lang: k }
  }
  return { text: '', lang: '' }
}

const full = readJson(FULL)
const local = readJson(LOCAL)
const records = full && [full.entries, full.records, full.conversations].find((x) => Array.isArray(x))
if (!records) {
  console.log('  ! 读不到 ' + FULL + '，先跑 node tools/pull-info.mjs')
  process.exit(1)
}
const errors = Array.isArray(full.errors) ? full.errors : []
const localMap = new Map()
const localRows = new Map()
for (const e of (local && Array.isArray(local.entries) ? local.entries : [])) {
  localMap.set(String(e.id), pickLang(e.preview))
  localRows.set(String(e.id), e)
}

// 逐条比：preview 是全文的前缀才算「只多了尾巴」，否则全文另算
const rows = []
for (const r of records) {
  const id = String(r.id)
  const pv = clean((localMap.get(id) || {}).text || '')
  const body = clean(r.text || '')
  const isPrefix = pv.length > 0 && body.startsWith(pv)
  const extra = isPrefix ? body.slice(pv.length).trim() : body
  const extraChars = isPrefix ? Math.max(0, body.length - pv.length) : body.length
  rows.push({
    id: id,
    // 有的档案 detail 端点标题字段是空的，回退到本地那份标题
    title: clean(r.title) || pickLang((localRows.get(id) || {}).title).text || '(无标题)',
    version: r.version || '',
    pvChars: pv.length, chars: body.length, extraChars: extraChars,
    prefix: isPrefix, extra: extra,
    matched: Array.isArray(r.matched) ? r.matched : []
  })
}
rows.sort((a, b) => (b.extraChars - a.extraChars) || (b.chars - a.chars))

const totalFull = rows.reduce((n, r) => n + r.chars, 0)
const onlyTail = rows.filter((r) => r.prefix).length
console.log('档案全文 ' + records.length + ' 条，正文合计 ' + totalFull + ' 字；本地 preview 每条最多 90 字')
console.log('其中 ' + onlyTail + ' 条是 preview 的加长版（preview 是全文前缀），' + (records.length - onlyTail) + ' 条 preview 不是前缀')
console.log('没拉到 ' + errors.length + ' 条' + (errors.length ? '：' : '：没有'))
for (const e of errors) console.log('  ! ' + e.id + ' ' + (e.title || '') + ' —— ' + (e.error || ''))

if (opts.sum) process.exit(0)

// --id：打印一条全文
if (opts.id) {
  const r = rows.find((x) => x.id === opts.id)
  if (!r) {
    console.log('  ! 全文里没有 id ' + opts.id + '（可能不在筛选名单里，用 pull-info.mjs --kw 加重筛）')
    process.exit(1)
  }
  console.log('· ' + r.id + ' ' + r.title + ' [' + r.version + '] ' + r.chars + ' 字（preview ' + r.pvChars + ' 字，命中词 ' + (r.matched.join('、') || '无') + '）')
  console.log(records.find((x) => String(x.id) === opts.id).text || '')
  process.exit(0)
}

const show = rows.filter((r) => r.extraChars >= opts.min).slice(0, opts.top)
console.log('')
console.log('多出来的干货（≥ ' + opts.min + ' 字，前 ' + opts.top + ' 条）：')
for (const r of show) {
  const head = r.extra.slice(0, 160)
  console.log('· ' + r.id + ' ' + r.title + ' [' + r.version + ']  ' + r.pvChars + ' → ' + r.chars + ' 字，多 ' + r.extraChars + (r.prefix ? '' : '（preview 不是前缀，全文另算）'))
  console.log('    ' + head + (r.extra.length > 160 ? '…' : ''))
}
console.log('（看某条全文：node tools/info-diff.mjs --id <id>）')