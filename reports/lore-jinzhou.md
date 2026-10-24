# lore-jinzhou —— 瑝珑与今州的旧制度与民俗（建页报告）

来源：kb/source/yakitahome-terms.json（yakitahome 官方术语 API 快照，288 条可见词，builtAt 见文件内 builtAt）
接口：https://mc.yakitahome.com/api/terms
落地文件：kb/src/entries/lore-jinzhou.js（24 条，default 导出）
页面登记：kb/src/meta.js 已由 lead 登记 `{ file: 'lore-jinzhou', title: '今州旧貌' }`，我没动 meta.js

## 收录口径

只收派单列出的 uid，description 逐字抄进 note，def / ctx / tabu 只写官方 description 撑得住的说法；
官方没写的（谁的辖区、现在还在不在、具体编制）一律 note 里写「官方没写」，不替它圆。
lvl 一律 ['官']；src 一律 ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json']。

## 条目清单（uid｜官方英文名｜中文 t｜入库/跳过｜原因）

- term:850084｜Magistrate｜令尹｜入库｜—
- term:850085｜Ministry of Development｜天工｜入库｜—
- term:850086｜Midnight Rangers｜夜归｜**跳过**｜与 factions 页已有的 org-夜归军（夜归军）是同一个东西：官方原文写「夜归是今州军策府统辖的军队。夜归军下设有踏白、破阵和伏波三部」。不重复建条目，uid 留在下面「待 lead 回填」一节
- term:850087｜Patroller｜巡尉｜入库｜—
- term:850089｜Patrol Station｜巡宁所｜入库｜—
- term:850104｜Shell Credit｜贝币｜入库｜—
- term:850112｜Jinzhou Patroller｜今巡尉｜入库｜—
- term:850113｜Overdash｜飞檐｜入库｜—
- term:850114｜Leihuangquan｜雷煌拳｜入库｜—
- term:850115｜Loong Whiskers Crisp｜龙须酥｜入库｜—
- term:850116｜Sentinel Jué｜岁主「角」｜入库｜t 照官方字面抄，没简化成「角」
- term:850124｜Magistrate's Bodyguard｜令尹近卫｜入库｜—
- term:850126｜Shelter Home｜悲田院｜入库｜—
- term:850127｜Master Xuanmiao｜玄渺真人｜入库｜—
- term:850128｜Jinzhou Counselor｜今州参事｜入库｜—
- term:850129｜Riverside Games｜竞渡会｜入库｜—
- term:850130｜Liondance Troupe｜瑞狮团｜入库｜—
- term:850131｜Liondance｜狮子舞｜入库｜—
- term:850132｜Lion Head｜狮首｜入库｜—
- term:850133｜Starflower｜星星花｜入库｜—
- term:850134｜Fengyiquan｜风仪拳｜入库｜—
- term:850139｜Outrider｜踏白｜入库｜官方 description 与 850086「夜归」逐字相同（见存疑一节）
- term:260008｜Grand Marshal｜本兵｜入库｜—
- term:260009｜Mingting｜明庭｜入库｜—
- term:260011｜Censorate｜兰台｜入库｜—

派单 25 条，入库 24 条，跳过 1 条（夜归）。

## 存疑原文（照抄了，没替它圆）

1. **term:850132 狮首**——官方原文：「狮子舞的形式多样，既有单兵出阵「巧首」，也有双人成行的「巧首」与「磐尾」。「巧首」又称「狮首」。」「巧首」在同段里出现两次（单兵出阵一次、双人成行一次），看着像官方文本自己写岔了。def 只写「狮子舞的一种形式，「巧首」又称「狮首」」，没去推断单兵/双人到底怎么分。
2. **term:850139 踏白**——这段 description 与 term:850086「夜归」逐字相同，讲的都是「夜归军下设有踏白、破阵和伏波三部」。踏白自己的介绍官方没单写。def 写「夜归军下设的三部之一，承担斥候职能」，是按原文「分别承担斥候，前锋及后卫的职能」的顺序对号入座（踏白＝斥候、破阵＝前锋、伏波＝后卫），note 里把这层推断写明了。
3. **term:850128 今州参事**——官方同一段里既是职位（令尹的策士）又像指人（「在今汐继任前作为今汐的老师」）。两种读法都留着，tabu 写「在今汐继任前」指她还没当令尹的时候，别倒过来讲。
4. **term:850116 岁主「角」**——官方 description 里「」和「」混用，还夹着全角引号（“神祇”）。逐字抄了，没改标点。

## 撞名表

| 本页 t | 撞/近名的库内条目 | 处理 |
| --- | --- | --- |
| 岁主「角」 | terms 的 岁主（term-suizhu） | 近名不同物（一位岁主 vs 泛指岁主）。t 照官方字面抄；**alias 没写「岁主」**（会撞） |
| 巡尉 / 今巡尉 | 彼此（两条官方词条） | 都建，ctx / tabu 写清差别：泛指治安署工作人员 vs 今州一州 |
| 令尹 | chars-npc 的 今汐（别称「今令尹」） | 近名，不撞（精确串不同）。note 里写「今州这一任是今汐」 |
| 夜归 | factions 的 夜归军（org-夜归军） | 同一个东西 → 跳过本页条目 |
| 雷煌拳 / 风仪拳 | 彼此 | 近名不同物（渊武 vs 道馆/瑝珑），tabu 互相点名 |
| 狮子舞 / 狮首 / 瑞狮团 | 彼此 | 近名（民俗 / 形式 / 演出团），互为 rel，tabu 写区别 |
| 明庭 / 悲田院 | 悲田院 note 里的「中央庭」 | 近名，tabu 写「明庭是都城，中央庭是悲田院的上级机构」 |

精确串与归一化（去「」『』（）空格·）后都撞不上的 22 条：令尹、天工、巡尉、巡宁所、贝币、今巡尉、飞檐、雷煌拳、龙须酥、令尹近卫、悲田院、玄渺真人、今州参事、竞渡会、瑞狮团、狮子舞、狮首、星星花、风仪拳、踏白、本兵、明庭、兰台。
本页 alias 一条都没加（避免跨页撞名提示，也避免给别处「岁主」这种词乱挂）。

## rel 清单（全部是库里真实存在的 id）

| 条目 | rel |
| --- | --- |
| lore-jinzhou-lingyin | chars-今汐、lore-jinzhou-jinzhou-canshi |
| lore-jinzhou-tiangong | world-huanglong |
| lore-jinzhou-xunwei | org-治安署、lore-jinzhou-jinxunwei |
| lore-jinzhou-xunningsuo | org-治安署、lore-jinzhou-xunwei |
| lore-jinzhou-beibi | world-huanglong |
| lore-jinzhou-jinxunwei | org-治安署、lore-jinzhou-xunwei |
| lore-jinzhou-feiyan | （无）官方没写它属于哪一州，不硬挂 |
| lore-jinzhou-leihuangquan | （无）官方没写渊武在哪，不硬挂 |
| lore-jinzhou-longxusu | chars-丹瑾、roles-丹瑾 |
| lore-jinzhou-suzhu-jiao | term-suizhu、world-huanglong |
| lore-jinzhou-lingyin-jinwei | lore-jinzhou-lingyin |
| lore-jinzhou-beitianyuan | chars-长离、lore-jinzhou-mingting |
| lore-jinzhou-xuanmiao | chars-长离、world-huanglong |
| lore-jinzhou-jinzhou-canshi | chars-今汐、lore-jinzhou-lingyin |
| lore-jinzhou-jingduhui | org-夜归军、world-huanglong |
| lore-jinzhou-ruishituan | lore-jinzhou-shiziwu |
| lore-jinzhou-shiziwu | lore-jinzhou-fengyiquan、world-huanglong |
| lore-jinzhou-shishou | lore-jinzhou-shiziwu |
| lore-jinzhou-xingxinghua | world-huanglong |
| lore-jinzhou-fengyiquan | world-huanglong |
| lore-jinzhou-tabai | org-夜归军、org-军策府、chars-忌炎 |
| lore-jinzhou-benbing | org-军策府 |
| lore-jinzhou-mingting | world-huanglong、lore-jinzhou-beitianyuan |
| lore-jinzhou-lantai | world-huanglong |

「飞檐」没有挂 modes 页的「全息战略」：官方词条只说它是全世界流行的竞技运动，
和全息战略里同名的那一关是什么关系，官方没写，站点资料不算官方依据，所以不挂。

## 码点与 lint

- 本页 24 条，渲染 **3230 码点**（精简版 2111），目标 ≤6000、硬顶 8192；最长 def 42 码点（限 80）
- `node build.mjs --check`（捆绑 node，kb/ 目录）→ **EXIT=0，0 条 ✗ error**，19 条 ⚠ 全是别人页的既有提示（别称跨页近名、chars-npc / terms 页接近上限），**本页 0 条新 ⚠**
- 全库条目合计 825，其中【待】9 条不入正式页
- 本页登记后，meta.js 里那条「lore-jinzhou 还没有词条」的 ⚠ 也随之消失

## 待 lead 回填

- **term:850086 夜归**：同 factions 的 org-夜归军（夜归军），本页没建。建议在 factions 那条的 note 或 def 里补一句「夜归军（官方词条 term:850086 作「夜归」）统率踏白、破阵、伏波三部，由忌炎统率」——要改 factions.js 请另派人手或给我新写范围。
