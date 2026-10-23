// pagecheck.mjs —— 本地问一句「库里有没有答案」，不去线上抓 html
//
// 用途：验收「她能不能答对」。输入一句中文问话，在本地 22 页的 t/alias/def/id 里
// 模糊匹配，输出该翻哪一页 + 命中的条目 id + 一行 def，按命中强度取前几条。
//
// 只读 src/entries/*.js 和 manifest.json，不联网、不写文件。
//
// 用法（在 kb/ 目录下跑）：
//   node tools/pagecheck.mjs 秧秧是谁
//   node tools/pagecheck.mjs 爱达千怎么配队 --page teams
//   node tools/pagecheck.mjs "阿列夫一是什么" "虚质空间在哪"   一次问几句
//   node tools/pagecheck.mjs 虚质 --top 8 --all               --all 放宽阈值，多给几条
//   某人的问题从标准输入灌进来：node tools/pagecheck.mjs < q.txt
//
// 命中强度从强到弱：t 精确 > alias 别称 > def 正文子串 > 全库 id 匹配。

import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const KB = join(HERE, '..')
const ENT_DIR = join(KB, 'src', 'entries')
const MANIFEST = join(KB, 'manifest.json')
const SITE = 'https://dyingdie.github.io/wuther-kb'

const DEF_TOP = 5        // 默认给几条
const DEF_MIN = 2        // 至少两个字才算命中
const DEF_MAXG = 8       // 参与匹配的最长词块
const DEF_SCORE = 60     // def 正文每命中一个字的权重

// 机制·养成类词：句子在问打法/养成，不是在问「她是谁」。出现了就按问题类型说话，
// 不然句首那个角色名会把 person 页的角色词条顶上来（2026-10-23 点的病根）
const MECH_WORDS = ['共鸣链', '共鸣', '属性', '形态', 'buff', '提升', '养成',
  '配装', '配队', '毕业', '武器', '技能', 'cost']
const MECH_RE = new RegExp(MECH_WORDS.join('|'), 'i')
const MECH_PAGES = new Set(['combat', 'teams', 'jargon', 'roles'])   // 讲打法/黑话/角色属性的四页
const ID_PAGES = new Set(['person', 'chars', 'chars-npc'])  // 讲「她是谁」的三页
const MECH_BONUS = 2500      // 机制页加权
const MECH_DEMOTE = 0.3      // 身份页自己没提这个词，就乘这个再排
// 句首当称呼的名字：「达妮娅，……」是在叫唤她，不是在问她。后面必须跟标点，
// 否则「达妮娅本身自己还带霜渐弱吧」这种主语会被误当称呼剥掉
const VOCATIVE_RE = /^\s*@?[（(]?(达妮娅|娅娅|西西|漂泊者|阿漂|漂子)[）)]?\s*[，,、：:]\s*/

// 问句点到的那几个机制词（属性？形态？提升？）
const asksMech = (q) => {
  const low = String(q || '').toLowerCase()
  return MECH_WORDS.filter((w) => low.includes(w.toLowerCase()))
}

// 词条自己有没有讲这个维度：讲了就不降权（那一页是真能答的），没讲就别让它抢戏。
// 按「问句点到的那几个词」逐个对，不是一沾机制词就放过 —— 「属性」问到就只认属性
const coversMech = (rec, words) => {
  if (!words.length) return true
  const e = rec.e
  const all = [e.t, ...(e.alias || []), e.def, e.ctx, e.tabu, e.body]
    .map(clean).join(' ').toLowerCase()
  return words.some((w) => all.includes(String(w).toLowerCase()))
}

// 日常词和疑问词：命中它们不算数（不然「今天天气」也能在某个 def 里撞上两个字）
const STOP = new Set([
  '今天', '明天', '昨天', '现在', '今天天气', '天气', '什么', '怎么', '怎样', '如何',
  '哪里', '哪儿', '哪个', '为什么', '是谁', '是什么', '是谁啊', '是不是', '有没有',
  '什么意思', '意思', '介绍', '讲讲', '说说', '聊聊', '东西', '事情', '时候',
  '可以', '能不能', '多少', '这个', '那个', '一下', '一些', '关于', '对于',
  '而且', '还有', '不是', '没有', '我们', '你们', '他们', '请问', '想知道',
  '告诉我', '怎么办', '为什么事', '的话', '的话呢', '关系是什么', '什么关系',
])

// 客套话和虚词：句首称呼被摘掉之后，整句剩下的全是这些，就说明人家不是在问内容
const FLUFF = ['自己', '认识', '知道', '介绍', '一下', '说说', '讲讲', '聊聊', '告诉',
  '你', '您', '我', '咱', '吧', '呀', '啊', '呢', '哈', '哦', '嘛', '了',
  '是', '不', '在', '有', '和', '与', '就', '都', '也', '很', '太', '吗']
// 一句话里还剩多少「有内容」的字：全被停用词和客套话吃光，就算没在问内容
const hasContent = (s) => {
  let rest = String(s || '')
  for (const w of STOP) rest = rest.split(w).join('')
  for (const w of FLUFF) rest = rest.split(w).join('')
  return rest.replace(/[^\p{L}\p{N}]/gu, '').length >= 2
}

// ---------- 载入：entries + manifest ----------
const loadPages = async () => {
  const out = new Map()
  try {
    const man = JSON.parse(readFileSync(MANIFEST, 'utf8'))
    for (const p of man.pages || []) out.set(p.file, { title: p.title, n: p.n })
  } catch {
    console.log('  ! 读不到 manifest.json，页名就只显示文件名')
  }
  const files = (() => {
    try { return readdirSync(ENT_DIR).filter((n) => n.endsWith('.js')).sort() }
    catch { console.log('  ! 读不到 src/entries/'); return [] }
  })()
  const entries = []
  const broken = []
  for (const f of files) {
    // 别人正写着的词条文件会半路炸掉整个进程 —— 跳过它，把账打在最后，别让人以为工具坏了
    let mod = null
    try {
      mod = await import(pathToFileURL(join(ENT_DIR, f)).href)
    } catch {
      broken.push(f)
      continue
    }
    const page = f.replace(/\.js$/, '')
    const info = out.get(page) || { title: page }
    for (const e of mod.default || []) {
      entries.push({
        e: e,
        page: page,
        pageTitle: info.title,
        shortId: String(e.id || '').split('-').pop(),
      })
    }
  }
  if (broken.length) console.log('  ! 跳过 ' + broken.length + ' 个读不进来的词条文件（正被改？）：' + broken.join('、'))
  return entries
}

// ---------- 问句切词块 ----------
// 中文没有空格，这里从长到短贪心取「问句里出现过、且没被更长的块占掉」的片段。
// 长块优先，所以「秧秧是谁」整块能对上 def 就整块算分，比只对上「秧秧」还强。
const blocksOf = (q) => {
  const used = new Array(q.length).fill(false)
  const blocks = []
  const stopped = []
  for (let len = Math.min(DEF_MAXG, q.length); len >= DEF_MIN; len--) {
    for (let i = 0; i + len <= q.length; i++) {
      const seg = q.slice(i, i + len)
      if (STOP.has(seg)) { stopped.push(seg); continue }
      let free = true
      for (let k = i; k < i + len; k++) if (used[k]) { free = false; break }
      if (!free) continue
      blocks.push(seg)
      for (let k = i; k < i + len; k++) used[k] = true
    }
  }
  return { blocks: blocks, stopped: Array.from(new Set(stopped)) }
}

// 整句切块有个坑：「娅娅，介绍一下自己」正好八个字，等于 DEF_MAXG 上限，会被当成一整块，
// 什么都对不上。称呼回退那次按标点断开再切，称呼自己才是一个能用的块
const PUNCT_SPLIT = /[\s，。！？、；：,.!?;:"'（）()【】\[\]…～~]+/
const blocksBySplit = (q) =>
  q.split(PUNCT_SPLIT).filter(Boolean).flatMap((seg) => blocksOf(seg).blocks)

const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

// ---------- 打分：t 精确 > alias > def 子串 > id ----------
const scoreOne = (q, blocks, rec) => {
  const e = rec.e
  const t = clean(e.t)
  const hits = []

  // 1) t 精确：问句里原样含着这个词条名
  if (t.length >= DEF_MIN && !STOP.has(t) && q.includes(t)) {
    const exact = q === t ? 400 : 0
    hits.push({ band: 't', seg: t, score: 10000 + t.length * 100 + exact })
  }

  // 2) alias 别称：问句里含着别称，或词块落在别称里
  let aliasBest = 0
  let aliasSeg = ''
  for (const a of e.alias || []) {
    const al = clean(a)
    if (al.length < DEF_MIN || STOP.has(al)) continue
    if (q.includes(al)) {
      if (al.length * 100 > aliasBest) { aliasBest = al.length * 100; aliasSeg = al }
      continue
    }
    for (const b of blocks) if (al.includes(b) && b.length * 60 > aliasBest) { aliasBest = b.length * 60; aliasSeg = b }
  }
  if (aliasBest) hits.push({ band: 'alias', seg: aliasSeg, score: 8000 + aliasBest })

  // 3) def 正文：词块出现在 def 里
  const def = clean(e.def)
  let defScore = 0
  const defSegs = []
  if (def) {
    for (const b of blocks) {
      if (b.length < DEF_MIN) continue
      if (def.includes(b)) {
        defScore += b.length * b.length * DEF_SCORE / 10
        defSegs.push(b)
      }
    }
  }
  if (defScore) {
    // 名字里也提到了这个词块（「深塔 / 爬塔」遇上问句「深塔」）就往前排一排
    let nameBonus = 0
    for (const b of defSegs) {
      if (t && t.includes(b)) nameBonus = Math.max(nameBonus, 300 * b.length)
      for (const a of e.alias || []) if (clean(a).includes(b)) nameBonus = Math.max(nameBonus, 300 * b.length)
    }
    hits.push({ band: 'def', seg: defSegs.join('、'), score: 4000 + Math.min(defScore, 3000) + nameBonus })
  }

  // 4) 全库 id 匹配（最弱）
  const id = String(e.id || '')
  if (id && (q.includes(id) || (rec.shortId.length >= DEF_MIN && q.includes(rec.shortId)))) {
    hits.push({ band: 'id', seg: id, score: 1000 + 30 })
  }

  if (!hits.length) return null
  hits.sort((a, b) => b.score - a.score)
  const top = hits[0]
  return { rec: rec, score: top.score, band: top.band, seg: top.seg, hits: hits }
}

// ---------- 排一遍 ----------
const rank = (text, entries, opts, blocksOverride) => {
  const part = blocksOf(text)
  const blocks = blocksOverride || part.blocks
  const scored = []
  for (const rec of entries) {
    if (opts.page && rec.page !== opts.page) continue
    const s = scoreOne(text, blocks, rec)
    if (s) scored.push(s)
  }
  // --strict：把被停止词挡住的词块也当成弱命中放进来。默认不放 —— 那些多半是撞词的巧合，
  // 主人调词表时想看它们长什么样，才用 --strict
  if (opts.strict && part.stopped.length) {
    for (const seg of part.stopped) {
      for (const rec of entries) {
        if (opts.page && rec.page !== opts.page) continue
        if (scored.some((s) => s.rec === rec)) continue
        const e = rec.e
        const inName = clean(e.t).includes(seg) || (e.alias || []).some((a) => clean(a).includes(seg))
        if (!inName && !clean(e.def).includes(seg)) continue
        scored.push({ rec: rec, score: 300 + seg.length * 10, band: 'stop', seg: seg, hits: [] })
      }
    }
  }
  // 问题类型优先于人名：认成机制·养成问句就重排一次。人物页里那条要是自己都没提
  // 这个维度（只答了「她是谁」），就该让位给讲打法的页
  const asked = asksMech(text)
  const mech = asked.length > 0
  if (mech) {
    for (const s of scored) {
      if (MECH_PAGES.has(s.rec.page)) s.score += MECH_BONUS
      else if (ID_PAGES.has(s.rec.page) && !coversMech(s.rec, asked)) s.score = Math.round(s.score * MECH_DEMOTE)
    }
  }
  // 问「属性/武器」时，roles 页那 25 条是靠角色名（shortId）命中的，会被打成 id 弱命中藏掉，
  // 于是机制页加了权也白加 —— 人名页照样第一。这里把它提回正常候选（只对 roles 页、
  // 只对问到属性/武器的句子，不碰别的页的 id 弱命中）。
  if (asked.includes('属性') || asked.includes('武器')) {
    for (const s of scored) {
      if (s.rec.page === 'roles' && s.band === 'id') { s.band = 'name'; s.score = 4000 }
    }
  }
  scored.sort((a, b) => (b.score - a.score) || a.rec.page.localeCompare(b.rec.page))

  const strong = scored.filter((s) => (opts.all || opts.strict ? true : s.band !== 'id'))
  return { scored: scored, strong: strong, part: part, asked: asked, mech: mech }
}

// ---------- 查一句 ----------
const ask = (q, entries, opts) => {
  // 句首称呼先摘掉：「娅娅，秧秧是谁」里「娅娅」不是问的宾语，是叫她的
  const voc = q.match(VOCATIVE_RE)
  const target = voc ? q.slice(voc[0].length) : q
  let res = rank(target, entries, opts)
  let fallback = false
  // 摘掉称呼之后整句只剩客套话（「娅娅，介绍一下自己」剩下「介绍一下自己」，一个词条名都不含），
  // 库里必然零命中。这时拿原句连称呼一起再试一次 —— 称呼自己就是个能用的词块，能把人领回
  // 她那一页。只在这一种情况下回退：摘完称呼还剩内容的句子走原路，一个字没动
  if (voc && !res.strong.length && !hasContent(target)) {
    res = rank(q, entries, opts, blocksBySplit(q))
    fallback = true
  }
  const scored = res.scored
  const part = res.part
  const asked = res.asked
  const mech = res.mech
  const top = res.strong.slice(0, opts.top)
  console.log('· 问题：' + q)
  if (voc) console.log('  · 句首称呼「' + voc[1] + '」已忽略（叫她的，不是问她的）')
  if (fallback) console.log('  · 摘掉称呼后没剩什么内容，改用原句再匹配一次（称呼自己也算词）')
  if (mech) console.log('  · 认成机制·养成问句（' + asked.join('、') + '）：机制页加权，身份页自己没讲这个维度时让位')
  if (!top.length) {
    console.log('  没命中。库里没有能对上这句的词条 —— 别硬答，按她那三句含糊带过。')
    if ((opts.all || opts.strict) && scored.length) {
      for (const s of scored.slice(0, opts.top)) console.log('  （放宽后只有弱命中：' + s.band + ' / ' + s.rec.page + ' / ' + s.rec.e.id + '）')
    }
    return
  }
  top.forEach((s, i) => {
    const e = s.rec.e
    const def1 = clean(e.def).split(/[；;。]/)[0]
    const why = { t: 't 精确', alias: '别称', def: '正文命中', id: 'id 匹配', stop: '停止词挡住的（弱，调词表用）' }[s.band]
    console.log('  ' + (i + 1) + '. [' + s.rec.page + '] ' + s.rec.pageTitle + '　' + e.t + '　(id ' + e.id + ')')
    console.log('     ' + why + '：「' + s.seg + '」')
    if (def1) console.log('     def：' + def1.slice(0, 70) + (def1.length > 70 ? '…' : ''))
    if (e.lvl && e.lvl.length) console.log('     lvl：' + e.lvl.join('、'))
  })
  const first = top[0]
  console.log('  → 先翻 ' + SITE + '/' + first.rec.page + '.html（' + first.rec.pageTitle + '）；' +
    '页名对不上就抓 index.html 顶部的路由表')
}

// ---------- 入口 ----------
const argv = process.argv.slice(2)
const opts = { top: DEF_TOP }
const qs = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--top') { opts.top = Number(argv[i + 1] || DEF_TOP); i++ }
  else if (a === '--page') { opts.page = argv[i + 1]; i++ }
  else if (a === '--all') opts.all = true
  else if (a === '--strict') opts.strict = true
  else qs.push(a)
}

// 标准输入有两种喂法，都得认：
//   一、qq-log-scan.mjs --out 的三行一块 —— 「· [日期] 文件 #id 谁」/「  问句」/「  命中词：秧秧→chars-npc」
//   二、裸问句，一行一句
// 一要是照「一行一句」读，表头和命中词都会变成考题：命中词那行是扫描器自己算好的
// 答案，喂进来等于把答案抄进卷子，这种题必中，分数会被抬上去而排序其实没变好。
function parseStdin(raw) {
  const lines = String(raw).split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  const isHead = (l) => /^[·•]\s*\[/.test(l)
  if (!lines.some(isHead)) return { list: lines, blockMode: false }
  const list = []
  let cur = []
  let inBlock = false
  const flush = () => { if (cur.length) { list.push(cur.join(' ')); cur = [] } }
  for (const l of lines) {
    if (isHead(l)) { flush(); inBlock = true; continue }
    if (/^命中词[：:]/.test(l)) { flush(); continue }
    if (!inBlock) { list.push(l); continue }
    cur.push(l)
  }
  flush()
  return { list, blockMode: true }
}

let questions = qs
let blockMode = false
if (!questions.length && !process.stdin.isTTY) {
  const parsed = parseStdin(readFileSync(0, 'utf8'))
  questions = parsed.list
  blockMode = parsed.blockMode
}
if (blockMode) {
  // 走 stderr，别混进给人看的结果里
  console.error('[pagecheck] 按 q.txt 三行块读，只取问句行（表头和「命中词」行都不算题）—— 共 ' + questions.length + ' 道')
}
if (!questions.length) {
  console.log([
    'pagecheck —— 本地问一句「库里有没有答案」（只读 src/entries 和 manifest.json，不联网）',
    '',
    '  node tools/pagecheck.mjs 秧秧是谁',
    '  node tools/pagecheck.mjs "阿列夫一是什么" "虚质空间在哪"',
    '  node tools/pagecheck.mjs 爱达千怎么配队 --page teams',
    '  node tools/pagecheck.mjs 虚质 --top 8 --all',
    '',
    '开关：--top N 给几条（默认 ' + DEF_TOP + '）　--page <页名> 只看一页　--all 连 id 匹配也算',
    '　　　　--strict 连 id 匹配和「被停止词挡住的」弱命中一起放出来，调词表时用',
  ].join(String.fromCharCode(10)))
  process.exit(0)
}

const entries = await loadPages()
if (!entries.length) {
  console.log('  ! src/entries/ 里没读到词条')
  process.exit(1)
}
for (const q of questions) {
  ask(q, entries, opts)
  console.log('')
}
console.log('· 扫了 ' + new Set(entries.map((r) => r.page)).size + ' 页 / ' + entries.length + ' 条词条（字段 t、alias、def、id）')
