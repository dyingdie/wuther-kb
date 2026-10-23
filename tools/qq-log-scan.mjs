// qq-log-scan —— 从 QQ 聊天日志里挑出「有人向达妮娅提问、且问题涉及《鸣潮》设定」的句子。
//
// 只读日志目录（绝不写）。判据写在下面，跑完人来定夺。
//
// 用法：
//   node tools/qq-log-scan.mjs                     扫默认那四个日志
//   node tools/qq-log-scan.mjs --all               连闲聊也打出来（默认过滤掉）
//   node tools/qq-log-scan.mjs --out <文件>        落盘一份，省得刷屏
//
// 日志一行一条 JSON：{ dir: 'in'|'out', ts: 毫秒时间戳,
//   sender: {qq, name, card, isMaster}, messageId, text }
// dir=out 是机器人自己发的，提问筛选里一律不要。

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const KB = join(HERE, '..')
const LOG_DIR = 'C:/Users/28945/.dsh/dsh-onebot-qq/logs/qq_chat'
const NL = String.fromCharCode(10)

const argv = process.argv.slice(2)
const opts = { all: false, out: '' }
const files = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--all') opts.all = true
  else if (a === '--out') { opts.out = String(argv[i + 1] || ''); i++ }
  else files.push(a)
}
if (!files.length) {
  for (const n of readdirSync(LOG_DIR)) if (n.endsWith('.jsonl')) files.push(join(LOG_DIR, n))
}

// 词表：直接从库里来，条目改了这里自动跟着变，不用手工维护
const srcDir = join(KB, 'src', 'entries')
const terms = new Map()
let entryCount = 0
try {
  for (const f of readdirSync(srcDir).filter((f) => f.endsWith('.js'))) {
    const page = f.replace(/\.js$/, '')   // 页名就是文件名，条目本身不带页字段
    // Windows 上绝对路径要转 file:// 才能被 ESM 动态 import 吃下去
    const mod = await import(pathToFileURL(join(srcDir, f)).href)
    for (const e of (mod.default || [])) {
      entryCount++
      for (const w of [].concat(e.t || [], e.alias || [])) {
        const s = String(w || '').trim()
        if (s.length >= 2 && !terms.has(s)) terms.set(s, { page: page, id: e.id })
      }
    }
  }
} catch (e) {
  console.log('  ! 词表没读全：' + e.message)
}
for (const w of ['鸣潮', '达妮娅', '娅娅', '西西', '漂泊者', '虚质', '残星会', '星炬学院', '鸣式', '残象', '悲鸣', '黑海岸', '瑝珑', '今州']) {
  if (!terms.has(w)) terms.set(w, { page: '（兜底）', id: '' })
}
console.log('词表 ' + terms.size + ' 条（来自 ' + entryCount + ' 个词条）')

const BOT_MENTION = /(达妮娅|娅娅)/
const QUESTION = /(是什么|是谁|什么关系|啥意思|什么意思|怎么|为什么|为啥|哪|哪儿|哪里|吗[?？。！!]$|\?|？)/

const pad = (n) => String(n).padStart(2, '0')
const fmtDate = (ts) => {
  const d = new Date(Number(ts))
  return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

const picked = []
let scanned = 0
for (const file of files) {
  let raw = ''
  try { raw = readFileSync(file, 'utf8') } catch (e) {
    console.log('  ! 读不到 ' + file + '：' + e.message)
    continue
  }
  for (const line of raw.split(NL)) {
    if (!line.trim()) continue
    let m = null
    try { m = JSON.parse(line) } catch (e) { continue }
    scanned++
    if (m && m.dir === 'out' && picked.length) {
      // 下一条是她自己发的，就说明这条问句确实是问她的
      const last = picked[picked.length - 1]
      if (last && last.file === file.split(/[\\/]/).pop()) last.replied = true
      continue
    }
    if (!m || m.dir !== 'in') continue
    const text = String(m.text || '').trim()
    if (!text || text === '[图片]' || text === '[表情]') continue
    const mentionsBot = BOT_MENTION.test(text)
    const isQ = QUESTION.test(text)
    const hits = []
    for (const pair of terms) {
      if (text.includes(pair[0])) hits.push({ w: pair[0], page: pair[1].page, id: pair[1].id })
    }
    if (!opts.all && !(hits.length && (mentionsBot || isQ))) continue
    picked.push({
      file: file.split(/[\\/]/).pop(), date: fmtDate(m.ts), id: m.messageId,
      who: (m.sender && (m.sender.card || m.sender.name)) || '',
      master: !!(m.sender && m.sender.isMaster),
      mentionsBot: mentionsBot, isQ: isQ, replied: false, text: text,
      hits: hits.slice(0, 8)
    })
  }
}

const render = (o) => [
  '· [' + o.date + '] ' + o.file + ' #' + o.id + ' ' + o.who + (o.master ? '（主人）' : '') + (o.mentionsBot ? ' [@她]' : '') + (o.isQ ? ' [问句]' : '') + (o.replied ? ' [她回了]' : ''),
  '  ' + o.text,
  '  命中词：' + (o.hits.length ? o.hits.map((h) => h.w + '→' + h.page).join('、') : '（无）'),
].join(NL)

console.log('扫了 ' + scanned + ' 条消息，挑出 ' + picked.length + ' 条候选')
console.log('')
const body = picked.map(render).join(NL + NL)
if (opts.out) {
  mkdirSync(dirname(opts.out), { recursive: true })
  writeFileSync(opts.out, body, 'utf8')
  console.log('已写到 ' + opts.out)
} else {
  console.log(body)
}

