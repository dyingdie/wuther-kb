// 把 289 段飞讯会话的全文拉下来（一手文本）
// 端点：https://mc.yakitahome.com/api/feixun/conversation/<会话id>
// 规矩：并发 3、每条之间歇 400ms、拉过的跳过（断点续拉）、拉不到记 error 不静默丢
// 用法：
//   node tools/pull-feixun.mjs                拉没拉过的
//   node tools/pull-feixun.mjs --limit 5      只试前 5 条
//   node tools/pull-feixone.mjs --probe 32000 看一条的原始结构
//   node tools/pull-feixun.mjs --all-langs    连其他七个语种一起存
//   node tools/pull-feixun.mjs --force        已拉过的也重拉
import { join } from 'node:path'
import { loadJson, saveJson, saveText, pickLang, pickFields, fetchJson, runPool, oneLine, parseArgs, KB, HOST, NET_CONCURRENCY, NET_GAP_MS, nowIso, stamp, setLimits, NL } from './pull-common.mjs'

const LOCAL = join(KB, 'source', 'yakitahome-feixun.json')
const OUT = join(KB, 'source', 'yakitahome-feixun-full.json')
const INDEX = join(KB, 'source', 'yakitahome-feixun-full-index.md')
const FLUSH_EVERY = 10
const MSG_KEYS = ['id', 'kind', 'side', 'senderName', 'textKey', 'messageType', 'emojiId', 'attachmentId', 'whoId', 'talkId', 'isOption']

const opts = parseArgs(process.argv)
// --conc N / --gap MS：站点开始挡人的时候调小再来一遍
setLimits(opts.conc, opts.gap)

const local = loadJson(LOCAL)
if (!local) {
  console.log('  ! 读不到 ' + LOCAL + '，先让主人把飞讯那份放好')
  process.exit(1)
}

// 把 114 个联系人摊平成 289 条会话清单
const convList = []
for (const c of local.contacts || []) {
  for (const v of c.conversations || []) {
    convList.push({
      id: v.id,
      contactId: c.id,
      contactName: c.name,
      title: v.title || v.preview || '',
      version: v.versionLabel || '',
      flowParam: v.flowParam || [],
      messageCount: v.messageCount || 0,
    })
  }
}
convList.sort((a, b) => a.id - b.id)

// 断点续拉：已经写进结果文件里的 id 直接跳过
const prev = loadJson(OUT)
const done = new Set()
const records = prev && Array.isArray(prev.conversations) ? prev.conversations.slice() : []
const errors = prev && Array.isArray(prev.errors) ? prev.errors.slice() : []
for (const r of records) done.add(Number(r.id))
const erred = new Set()
for (const e of errors) erred.add(Number(e.id))

const todo = convList.filter((c) => opts.force || !done.has(c.id))
const probeArg = opts.rest[0] ? Number(opts.rest[0]) : 0

// --probe：把一条会话的原始结构打出来看，不写文件
if (opts.rest[0] === '--probe') {
  const id = Number(opts.rest[1] || 0)
  const r = await fetchJson(HOST + '/api/feixun/conversation/' + id)
  if (!r.ok) {
    console.log('  ! ' + id + ' 拉不到：' + r.error)
    process.exit(1)
  }
  const msgs = (r.data.conversation && r.data.conversation.messages) || []
  console.log('顶层键 ' + Object.keys(r.data).join(' '))
  console.log('会话键 ' + Object.keys(r.data.conversation || {}).join(' '))
  console.log('消息 ' + msgs.length + ' 条，首条键：' + Object.keys(msgs[0] || {}).join(' '))
  console.log(JSON.stringify(msgs[0] || {}).slice(0, 500))
  process.exit(0)
}

console.log('飞讯全量拉取  ' + stamp())
console.log('  源清单 ' + convList.length + ' 段会话（本地副本 source/yakitahome-feixun.json）')
console.log('  已有 ' + records.length + ' 段' + (errors.length ? '（含 ' + errors.length + ' 段上次没拉到的，本次默认跳过，加 --force 重试）' : ''))
console.log('  本次要拉 ' + todo.length + ' 段；并发 ' + NET_CONCURRENCY + '，每条之间歇 ' + NET_GAP_MS + 'ms')
if (todo.length === 0) {
  console.log('  没什么可拉的了。要重拉全部加 --force')
  process.exit(0)
}

let okCount = 0
let failCount = 0
const started = Date.now()

const write = () => saveJson(OUT, {
  source: HOST + '/api/feixun',
  endpoint: HOST + '/api/feixun/conversation/<会话id>',
  localIndex: 'source/yakitahome-feixun.json',
  note: '一手文本。messages[].text 默认存简体；没有简体就退回第一个非空语种并记在 textLang。其他语种要 --all-langs 才存。',
  languages: opts.allLangs ? 'all' : 'zh-Hans 优先',
  updatedAt: nowIso(),
  count: records.length,
  conversations: records,
  errors,
})

await runPool(todo, async (c) => {
  const url = HOST + '/api/feixun/conversation/' + c.id
  const r = await fetchJson(url)
  const at = nowIso()
  if (!r.ok) {
    failCount++
    if (!erred.has(c.id)) {
      errors.push({ id: c.id, contactId: c.contactId, contactName: c.contactName, title: c.title, version: c.version, endpoint: url, error: r.error, at })
      erred.add(c.id)
    }
    console.log('  ! ' + c.id + ' ' + c.contactName + ' ' + r.error)
    return
  }
  const conv = r.data.conversation || {}
  const msgs = conv.messages || []
  const out = []
  for (const m of msgs) {
    const t = pickLang(m.i18n || m.text)
    const rec = pickFields(m, MSG_KEYS)
    rec.text = t.text
    rec.textLang = t.lang
    if (opts.allLangs) rec.i18n = m.i18n || m.text
    const att = m.attachment
    if (att && typeof att === 'object') {
      const a = pickLang(att.name || att.i18n || {})
      rec.attachment = pickFields(att, ['id', 'icon', 'iconUrl'])
      if (a.text) rec.attachmentName = a.text
    }
    out.push(rec)
  }
  // 这条上次失败过的话，把旧的 error 记录撤掉，别让文件里既有好数据又有报错
  const ei = errors.findIndex((x) => Number(x.id) === c.id)
  if (ei >= 0) errors.splice(ei, 1)
  records.push({
    id: c.id,
    contactId: c.contactId,
    contactName: c.contactName,
    title: c.title,
    version: c.version || conv.versionLabel || '',
    flowParam: c.flowParam,
    endpoint: url,
    pulledAt: at,
    messageCount: out.length,
    messages: out,
  })
  done.add(c.id)
  okCount++
  console.log('  ' + okCount + '/' + todo.length + '  ' + c.id + ' ' + c.contactName + '「' + c.title + '」' + out.length + ' 条')
  if (records.length % FLUSH_EVERY === 0) write()
})

records.sort((a, b) => a.id - b.id)
errors.sort((a, b) => a.id - b.id)
write()

// 给人看的索引：会话 id / 联系人 / 标题 / 条数 / 版本
const md = []
md.push('# 飞讯会话全文索引（' + records.length + ' 段）')
md.push('')
md.push('数据文件 source/yakitahome-feixun-full.json，来源 ' + HOST + '/api/feixun/conversation/<会话id>')
md.push('拉取时间 ' + stamp() + '；id 可直接写进条目 src 的 note 做引用。')
md.push('')
md.push('| 会话 id | 联系人 | 标题 | 消息条数 | 版本 | 首条 |')
md.push('| --- | --- | --- | --- | --- | --- |')
for (const r of records) {
  const first = r.messages && r.messages[0] ? oneLine(r.messages[0].text, 40) : ''
  md.push('| ' + r.id + ' | ' + (r.contactName || '').split('|').join('/') + ' | ' + String(r.title || '').split('|').join('/') + ' | ' + (r.messages ? r.messages.length : 0) + ' | ' + (r.version || '') + ' | ' + first.split('|').join('/') + ' |')
}
if (errors.length) {
  md.push('')
  md.push('## 没拉到的（' + errors.length + ' 段，重跑脚本会跳过，加 --force 重试）')
  md.push('')
  for (const e of errors) md.push('- ' + e.id + ' ' + (e.contactName || '') + '：' + e.error)
}
saveText(INDEX, md.join(NL) + NL)

const secs = ((Date.now() - started) / 1000).toFixed(1)
console.log('')
console.log('  成功 ' + okCount + ' / 失败 ' + failCount + ' / 跳过 ' + (convList.length - todo.length) + '（已有），用了 ' + secs + ' 秒')
console.log('  结果 ' + OUT)
console.log('  索引 ' + INDEX)
if (errors.length) console.log('  有 ' + errors.length + ' 段没拉到，文件里记了 error，重跑会跳过')
process.exit(0)
