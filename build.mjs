// 生成器：读 src/entries/*.js → 渲染全部 html + manifest.json，同时跑 lint
// 用法：node build.mjs        （在 kb/ 目录下跑）
//      node build.mjs --check 只跑 lint 不写文件
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { PAGES, LEVELS, LEVEL_DESC, ROUTES, PAGE_MAX } from './src/meta.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const ENT_DIR = join(HERE, 'src', 'entries')
const CHECK_ONLY = process.argv.includes('--check')

const cpLen = s => Array.from(s).length
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
// 4. 别称全局冲突：同一个别名不能指向两个实体
const aliasMap = new Map()
for (const e of all) for (const a of [e.t, ...(e.alias || [])]) {
  const hit = aliasMap.get(a)
  if (hit && hit !== e.id) err(e.id, `别称「${a}」与 ${hit} 冲突`)
  else aliasMap.set(a, e.id)
}
// 5. 悬空关联
const ids = new Set(all.map(e => e.id))
for (const e of all) for (const r of e.rel || []) if (!ids.has(r)) err(e.id, `rel 指向不存在的 id：${r}`)

// ---------- 3. 渲染 ----------
const lvlTag = lv => lv.map(l => `【${l}】`).join('')

function renderEntry(e, idx) {
  const L = []
  L.push(`${idx}. ${e.t}${e.alias?.length ? '（' + e.alias.join('·') + '）' : ''} ${lvlTag(e.lvl)}`)
  L.push(`   ${e.def}`)
  L.push(`   语境：${e.ctx}`)
  L.push(`   禁忌：${e.tabu}`)
  if (e.rel?.length) L.push(`   关联：${e.rel.join('、')}`)
  if (e.src?.length) L.push(`   出处：${e.src.join('；')}`)
  if (e.note) L.push(`   备注：${e.note}`)
  if (e.body) L.push('', e.body)
  return L.join('\n')
}

function renderPage(p) {
  const list = (buckets[p.file] || []).filter(e => !e.lvl.includes('待'))   // 6.【待】不让她看见
  const body = list.length
    ? list.map((e, i) => renderEntry(e, i + 1)).join('\n\n')
    : '（这一页还空着。被问到就说不知道。）'
  const text = `${p.title}\n${'='.repeat(p.title.length * 2)}\n\n【什么时候翻这页】${p.desc}\n\n${body}`
  const html = `<!doctype html>
<html lang="zh"><head><meta charset="utf-8"><title>鸣潮设定库 · ${p.title}</title></head><body><pre>
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
    `  ${m.file.padEnd(10)} ${String(m.n).padStart(3)} 条  ${String(m.cp).padStart(5)} 码点  ${m.title} —— ${PAGES.find(p => p.file === m.file).desc}`
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
}
for (const e of all) if ((e.lvl || []).includes('待')) todoList.push({ id: e.id, page: e.__page, t: e.t, note: e.note || '', kw: (e.note || '').match(/检索式?[:：]\s*(.+)/)?.[1] || '' })
manifest.todo = todoList.length
if (!CHECK_ONLY) {
  writeFileSync(join(HERE, 'index.html'), renderIndex(manifest))
  writeFileSync(join(HERE, 'manifest.json'), JSON.stringify(manifest, null, 2))
  writeFileSync(join(HERE, 'todo.json'), JSON.stringify(todoList, null, 2))   // 只给我自己看，不上线
}

for (const w of warns) console.log('  ⚠ ' + w)
for (const w of errs) console.log('  ✗ ' + w)
console.log(errs.length ? `\n✗ lint 未通过：${errs.length} 处错误` : `\n✓ lint 通过（${warns.length} 条提示）`)
console.log(`  条目合计 ${all.length}，其中【待】${manifest.todo} 条不入正式页`)
if (!CHECK_ONLY) for (const m of manifest.pages) console.log(`  ${m.file.padEnd(10)} ${String(m.n).padStart(3)} 条 ${String(m.cp).padStart(5)} 码点`)
process.exit(errs.length ? 1 : 0)