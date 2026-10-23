// 两个拉取脚本（pull-feixun / pull-info）共用的小工具：限速、断点续拉、原子写、错误不静默丢
// 规矩：并发最多 3、每条之间歇 400ms、每条记 id/title/version/pulledAt、拉不到记 error
import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const HERE = dirname(fileURLToPath(import.meta.url))
export const KB = join(HERE, '..')

export const HOST = 'https://mc.yakitahome.com'
export const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

export let NET_CONCURRENCY = 3   // 别把人家站点打挂：并发封顶 3
export let NET_GAP_MS = 400      // 每条之间歇 400ms（规矩是 300~500ms）

// 站点开始挡人（返回一坨 HTML 而不是 JSON）时，把它调小再跑：
//   node tools/pull-feixun.mjs --conc 1 --gap 1500 --force
export const setLimits = (conc, gap) => {
  if (Number(conc) > 0) NET_CONCURRENCY = Math.min(5, Math.max(1, Number(conc)))
  if (Number(gap) > 0) NET_GAP_MS = Math.max(100, Number(gap))
}
export const NET_TIMEOUT = 20000
export const NET_TRY = 2           // 网络抖动重试一次；4xx 不重试
export const LANGS = ['zh-Hans', 'zh-Hant', 'ja', 'en', 'ko', 'de', 'es', 'fr']

export const NL = String.fromCharCode(10)
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
export const nowIso = () => new Date().toISOString()
export const stamp = () => {
  const d = new Date()
  const p2 = (n) => String(n).padStart(2, '0')
  return String(d.getFullYear()) + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + ' ' + p2(d.getHours()) + ':' + p2(d.getMinutes()) + ':' + p2(d.getSeconds())
}

// 读本地 JSON；没有就当 null，不抛
export const loadJson = (p) => {
  if (!existsSync(p)) return null
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch (e) {
    console.log('  ! 读不了 ' + p + '：' + e.message)
    return null
  }
}

// 原子写：先写 .tmp 再改名。中途挂了不会留半个文件出来。
export const saveJson = (p, data) => {
  mkdirSync(dirname(p), { recursive: true })
  const tmp = p + '.tmp'
  writeFileSync(tmp, JSON.stringify(data))
  renameSync(tmp, p)
}

// 原子写文本（索引 md 用）
export const saveText = (p, text) => {
  mkdirSync(dirname(p), { recursive: true })
  const tmp = p + '.tmp'
  writeFileSync(tmp, text)
  renameSync(tmp, p)
}

// 从 {key: {...}} 这种摊平的表里取值；顺带兼容数组形态
export const pickLang = (o) => {
  if (o === null || o === undefined) return { text: '', lang: '' }
  if (typeof o === 'string') return { text: o, lang: 'plain' }
  for (const l of LANGS) if (typeof o[l] === 'string' && o[l].trim()) return { text: o[l], lang: l }
  const keys = Object.keys(o)
  for (const k of keys) if (typeof o[k] === 'string' && o[k].trim()) return { text: o[k], lang: k }
  return { text: '', lang: '' }
}

// 只留白名单字段，别把整坨 rawText 拖进文件
export const pickFields = (o, keys) => {
  const out = {}
  for (const k of keys) if (o && o[k] !== undefined && o[k] !== null) out[k] = o[k]
  return out
}

// 抓一个 json。永远不抛：拿不到就回 { ok:false, error }，让调用方记进 errors。
export const fetchJson = async (url) => {
  if (typeof fetch !== 'function') return { ok: false, error: '这个 node 没有内置 fetch' }
  for (let i = 1; i <= NET_TRY; i++) {
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), NET_TIMEOUT)
    try {
      const res = await fetch(url, {
        signal: ac.signal,
        headers: { 'User-Agent': UA, Accept: 'application/json' },
      })
      clearTimeout(timer)
      if (res.status === 404) return { ok: false, status: 404, error: '站点没有这条（404）' }
      if (!res.ok) return { ok: false, status: res.status, error: 'HTTP ' + res.status }
      const raw = await res.text()
      let data
      try { data = JSON.parse(raw) } catch (parseErr) {
        // 返回的不是 JSON —— 200 也可能是挡人页/挑战页
        const head = raw.slice(0, 60).replace(/\s+/g, ' ')
        if (i >= NET_TRY) return { ok: false, status: res.status, error: '站点返回的不是 JSON（HTTP ' + res.status + '，开头「' + head + '」）——多半被挡了' }
        await sleep(2000 * i)
        continue
      }
      return { ok: true, data }
    } catch (e) {
      clearTimeout(timer)
      const cause = (e && e.cause && (e.cause.code || e.cause.message)) || ''
      const why = String(cause || (e && e.message) || e)
      if (i >= NET_TRY) return { ok: false, error: '没取到（' + why + '）' }
      await sleep(900 * i)
    }
  }
  return { ok: false, error: '没取到' }
}

// 限速跑一批活：最多 NET_CONCURRENCY 条并发，每条干完歇 NET_GAP_MS。
// 崩了就崩在单条里（worker 自己 try），不影响别的条。
export const runPool = async (items, worker) => {
  let next = 0
  const lanes = []
  const lanes_n = Math.min(NET_CONCURRENCY, Math.max(items.length, 1))
  for (let k = 0; k < lanes_n; k++) {
    lanes.push((async () => {
      for (;;) {
        const i = next++
        if (i >= items.length) return
        await worker(items[i], i)
        await sleep(NET_GAP_MS)
      }
    })())
  }
  await Promise.all(lanes)
}

// 一句话概要：取第一句、压到 n 个字
export const oneLine = (text, n = 60) => {
  const flat = String(text || '').replace(/\s+/g, ' ').trim()
  if (!flat) return ''
  const cut = flat.split(/[。！？\n]/)[0] || flat
  return cut.length > n ? cut.slice(0, n) + '…' : cut
}

// 参数：--limit N 只拉前 N 条（试跑用）、--force 重拉已拉过的、--all-langs 连其他语种一起存
export const parseArgs = (argv) => {
  const opts = { limit: 0, force: false, allLangs: false, rest: [] }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--limit') { opts.limit = Number(argv[i + 1] || 0); i++ }
    else if (a === '--force') opts.force = true
    else if (a === '--all-langs') opts.allLangs = true
    else if (a === '--conc') { opts.conc = Number(argv[i + 1] || 0); i++ }
    else if (a === '--gap') { opts.gap = Number(argv[i + 1] || 0); i++ }
    else opts.rest.push(a)
  }
  return opts
}
