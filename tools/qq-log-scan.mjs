// qq-log-scan —— 从 QQ 聊天日志里挑出「有人向达妮娅提问、且问题涉及《鸣潮》设定」的句子。
//
// 只读日志目录（绝不写）。判据写在下面，跑完人来定夺。
//
// 用法：
//   node tools/qq-log-scan.mjs                     扫默认那四个日志
//   node tools/qq-log-scan.mjs --all               连闲聊也打出来（默认过滤掉）
//   node tools/qq-log-scan.mjs --out <文件>        落盘一份，省得刷屏
//   node tools/qq-log-scan.mjs --no-filter          连「不像在问设定」的也一起挑（默认丢掉的那些）
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
const opts = { all: false, out: '', noFilter: false }
const files = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--all') opts.all = true
  else if (a === '--out') { opts.out = String(argv[i + 1] || ''); i++ }
  else if (a === '--no-filter') opts.noFilter = true
  else files.push(a)
}
if (!files.length) {
  for (const n of readdirSync(LOG_DIR)) if (n.endsWith('.jsonl')) files.push(join(LOG_DIR, n))
}

// 词表：直接从库里来，条目改了这里自动跟着变，不用手工维护
const srcDir = join(KB, 'src', 'entries')
const terms = new Map()
let entryCount = 0
// 别人正写着的词条文件会半路炸掉整个进程 —— 跳过它接着读下一个，把账打在最后。
// 不这样的话，一个文件写坏，后面所有页的词条全没了，扫出来只剩几十条，看着像日志里没提问
const broken = []
for (const f of readdirSync(srcDir).filter((f) => f.endsWith('.js'))) {
  const page = f.replace(/\.js$/, '')   // 页名就是文件名，条目本身不带页字段
  let mod = null
  try {
    // Windows 上绝对路径要转 file:// 才能被 ESM 动态 import 吃下去
    mod = await import(pathToFileURL(join(srcDir, f)).href)
  } catch (e) {
    broken.push(f)
    continue
  }
  for (const e of (mod.default || [])) {
    entryCount++
    for (const w of [].concat(e.t || [], e.alias || [])) {
      const s = String(w || '').trim()
      if (s.length >= 2 && !terms.has(s)) terms.set(s, { page: page, id: e.id })
    }
  }
}
if (broken.length) console.log('  ! 跳过 ' + broken.length + ' 个读不进来的词条文件（正被改？），这些页的词这次没进词表：' + broken.join('、'))
for (const w of ['鸣潮', '达妮娅', '娅娅', '西西', '漂泊者', '虚质', '残星会', '星炬学院', '鸣式', '残象', '悲鸣', '黑海岸', '瑝珑', '今州']) {
  if (!terms.has(w)) terms.set(w, { page: '（兜底）', id: '' })
}
console.log('词表 ' + terms.size + ' 条（来自 ' + entryCount + ' 个词条）')

const BOT_MENTION = /(达妮娅|娅娅)/
const QUESTION = /(是什么|是谁|什么关系|啥意思|什么意思|怎么|为什么|为啥|哪|哪儿|哪里|吗[?？。！!]$|\?|？)/

// ---------- 保守过滤：明显不是在问设定的才丢 ----------
// 考题要的是「有人问《鸣潮》设定」。抱怨她不懂、调戏、问的是另一款游戏、别的 bot 的指令输出 ——
// 这些当考题是噪声。但宁可多留：只对下面这几种一眼能认出来的句子出手，其余一律放过。
// 想看没过滤的全量，加 --no-filter（--all 连闲聊消息也一起打出来，是更外的一层）
const OTHER_GAMES = /(异环|原神|星穹铁道|星铁|绝区零|明日方舟|塞尔达|宝可梦|王者荣耀|和平精英)/
// 整句去掉 @、名字和标点之后还剩几个字：什么都不剩就是在叫唤她，不是在问设定
const bare = (t) => String(t)
  .replace(/@\S+/g, '')
  .replace(/(小达妮娅|达女尼女亚|达妮娅|娅娅|西西)/g, '')
  .replace(/[^\p{L}\p{N}]/gu, '')
const NOISE = [
  ['只是在叫唤她', (t) => bare(t).length < 2],
  ['要东西/下命令，不是问设定', (t) => /(发个|发一张|发点|发一遍|发来|来张).{0,8}(图|图片|立绘|语音|文件)|用语音说|说一句.{0,10}(台词|话)|存.{0,6}(文件夹|文件)|Q版形象|多好听/.test(t)],
  ['抱怨她不懂', (t) => /(怎么.{0,3}会不知道|怎么会不知道|为什么.{0,3}会不知道|都不清楚|不清楚|很失败|应该知道|那么消极|回复怎么.{0,3}慢)/.test(t)],
  ['调戏、玩梗', (t) => /(我们来玩|玩个游戏|想象一下你|读这段文字)/.test(t)],
  ['问的是另一款游戏', (t) => {
    const o = t.search(OTHER_GAMES)
    if (o < 0) return false
    const w = t.indexOf('鸣潮')
    return w < 0 || o < w        // 别的游戏出现在「鸣潮」前面，这句问的就是它
  }],
  ['别的 bot 的指令输出', (t) => /^\s*\[|你可能想查询|已执行该指令|已处理/.test(t)],
  ['问她自己的功能，不是设定', (t) => /(怎么还有.{0,8}进群|能分清|分得出|你是机器人吗|会自己说话吗)/.test(t)],
]
const noiseOf = (t) => {
  for (const [name, test] of NOISE) if (test(t)) return name
  return null
}

const pad = (n) => String(n).padStart(2, '0')
const fmtDate = (ts) => {
  const d = new Date(Number(ts))
  return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

const picked = []
const dropped = []
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
    // 第二层：明显不是在问设定的才丢（抱怨她不懂、调戏、别的游戏、别的 bot 的输出…）
    const noise = (opts.all || opts.noFilter) ? null : noiseOf(text)
    if (noise) {
      dropped.push({ file: file.split(/[\\/]/).pop(), date: fmtDate(m.ts), id: m.messageId,
        who: (m.sender && (m.sender.card || m.sender.name)) || '', noise: noise, text: text })
      continue
    }
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

// 被丢掉的也留一份账：表头用 ✗ 而不是 ·，这样整份文件喂给 pagecheck 时它认得出这段不是考题
const renderDrop = (o) => [
  '✗ [' + o.date + '] ' + o.file + ' #' + o.id + ' ' + o.who + ' —— ' + o.noise,
  '  ' + o.text,
].join(NL)

const byNoise = dropped.reduce((a, o) => { a[o.noise] = (a[o.noise] || 0) + 1; return a }, {})
const noiseSum = Object.keys(byNoise).map((k) => k + ' ' + byNoise[k] + ' 条').join('、')
console.log('扫了 ' + scanned + ' 条消息，挑出 ' + picked.length + ' 条候选')
if (dropped.length) console.log('另过滤掉 ' + dropped.length + ' 条不像在问设定的（' + noiseSum + '），逐条列在末尾，要全量加 --no-filter')
console.log('')
const tail = dropped.length
  ? NL + NL + '（以下 ' + dropped.length + ' 条被过滤掉，不像在问设定：' + noiseSum + '）' + NL + NL + dropped.map(renderDrop).join(NL + NL)
  : ''
const body = picked.map(render).join(NL + NL) + tail
if (opts.out) {
  mkdirSync(dirname(opts.out), { recursive: true })
  writeFileSync(opts.out, body, 'utf8')
  console.log('已写到 ' + opts.out)
} else {
  console.log(body)
}

