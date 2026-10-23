// scan-gaps —— 后台补充机制的扫描端（PLAN.md 第八节）
//
// 她查不到时会装傻含糊过去。这些「装傻」恰好是精确的缺口信号：
// 日志里凡是 bot 的发言命中含糊话术，就把它前面那条用户发言当成待补问题。
//
// 用法：node scan-gaps.mjs            只打印
//      node scan-gaps.mjs --write     追加写入 TODO-待补.md
//
// 写入是幂等追加：已经收录过的问法不会重复出现。

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const LOG_DIR = 'C:\\Users\\28945\\.dsh\\dsh-onebot-qq\\logs\\qq_chat'
const TODO = join(HERE, 'TODO-待补.md')

// 命中即视为「她没答上来」。越具体越好，别写成会把正常回答也吃掉的宽泛词。
const HEDGE = [
  '我不记得', '不记得了', '我忘了', '忘了呢',
  '你怎么会问这个', '你怎么会知道',
  '查不到', '没查到', '搜不到', '找不到',
  '差不多吧', '大概…', '记不太清', '有点印象',
  '没印象', '没有这个', '不存在哦', '查不到资料',
]

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim()

function scanFile(file) {
  const out = []
  let prevIn = null
  let lines
  try {
    lines = readFileSync(file, 'utf8').split('\n')
  } catch {
    return out
  }
  for (const line of lines) {
    if (!line.trim()) continue
    let r
    try { r = JSON.parse(line) } catch { continue }
    if (!r || !r.dir) continue

    if (r.dir === 'in') {
      const t = norm(r.text)
      if (t) prevIn = { text: t, ts: r.ts, chat: r.chatKey || file }
      continue
    }

    if (r.dir === 'out') {
      const t = norm(r.text)
      if (!t) continue
      if (!HEDGE.some((h) => t.includes(h))) continue
      if (!prevIn) continue
      out.push({ question: prevIn.text, reply: t, ts: r.ts, chat: prevIn.chat })
      prevIn = null // 一条含糊只配一次问题，避免连坐
    }
  }
  return out
}

function main() {
  if (!existsSync(LOG_DIR)) {
    console.error(`日志目录不存在：${LOG_DIR}`)
    process.exit(1)
  }
  const files = readdirSync(LOG_DIR).filter((f) => f.endsWith('.jsonl'))
  let hits = scanFiles(files)

  // 同一个问题只留最早那条
  const seen = new Set()
  hits = hits.filter((h) => {
    const k = h.question.slice(0, 40)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  console.log(`扫了 ${files.length} 个日志文件，命中 ${hits.length} 条待补`)
  if (!hits.length) return

  // 已收录的不再重复写
  const already = existsSync(TODO) ? readFileSync(TODO, 'utf8') : ''
  const fresh = hits.filter((h) => !already.includes(h.question.slice(0, 40)))

  for (const h of hits) {
    const stamp = h.ts ? new Date(h.ts).toLocaleString('zh-CN') : ''
    console.log(`\n  [${stamp}] ${h.chat}`)
    console.log(`   问：${h.question}`)
    console.log(`   答：${h.reply.slice(0, 60)}`)
  }
  console.log(`\n其中新增 ${fresh.length} 条`)

  if (process.argv.includes('--write') && fresh.length) {
    const block =
      '\n## 待补 ' + new Date().toLocaleString('zh-CN') + '\n\n' +
      fresh
        .map((h) => `- **问**：${h.question}\n  **她答**：${h.reply}\n  **检索词**：鸣潮 ${h.question.replace(/[\s?？!！。.]/g, ' ').slice(0, 20)}`)
        .join('\n') + '\n'
    const header = existsSync(TODO) ? '' : '# 待补清单\n\n她答不上来的问题。补一条的流程：web_search 找到权威来源 → 写进 src/entries/ 对应板块 → node build.mjs → push。\n查不到就留着，别硬编。\n'
    writeFileSync(TODO, header + already + block, 'utf8')
    console.log(`\n已写入 ${TODO}`)
  }
}

function scanFiles(files) {
  const all = []
  for (const f of files) all.push(...scanFile(join(LOG_DIR, f)))
  return all.sort((a, b) => (a.ts || 0) - (b.ts || 0))
}

main()