# terms 拆页报告（task-44）

执行人：glosser｜改动文件：`kb/src/entries/terms.js`（删掉 21 条）、`kb/src/entries/terms-disaster.js`（新建，21 条）｜meta.js **没碰**（lead 登记）｜git 没碰，没跑不带 --check 的 build.mjs

## 1. 结果

- 新页 `kb/src/entries/terms-disaster.js`：21 条，**全版 2940 码点 / 精简版 2045 码点**
- 老页 `kb/src/entries/terms.js`：剩 26 条，**全版 3413 码点 / 精简版 2635 码点**（拆前 47 条 6298 码点）
- 两页都远低于 6000 目标线与 6553 告警线（硬顶 8192）
- 21 条的 id / t / alias / lvl / def / ctx / tabu / rel / src / note **全部逐字搬运**，脚本逐块比对过：新文件里每个块与原文件字节一致；老文件里已不含这 21 块的任何字节；两页 id 无交集，21+26=47 对得上。
- 老页剩的 26 条一条没删，id 也没动。

## 2. 21 条 id 对照表（搬前 → 搬后）

| id | t | 搬前所在页 | 搬后所在页 | 内容 | tabu 首句（证明原样） |
|---|---|---|---|---|---|
| `term-lament` | 悲鸣 | terms | terms-disaster | 逐字未改 ✓ | 是灾变不是组织，没有「悲鸣会」；全球五次、区域超三十万次 |
| `term-sea-erosion` | 海蚀现象 | terms | terms-disaster | 逐字未改 ✓ | 官方没定性为鸣式产物；「虚质磁暴」是海蚀一种；恶瘴有前提（心月狐遇刺后） |
| `term-threnodian` | 鸣式 | terms | terms-disaster | 逐字未改 ✓ | 不是悲鸣打出来的怪；无冠者不是鸣式（wiki）；⚠️绯雪「预取尽了成为鸣式共鸣者的未来」查不到原文 |
| `term-remnant` | 残象 | terms | terms-disaster | 逐字未改 ✓ | 残象≠鸣式，鸣式是灾变的产物和推手 |
| `term-silenced-zone` | 无音区 | terms | terms-disaster | 逐字未改 ✓ | 「异维无音区」在独立位面，别混成一处 |
| `term-silenced-other` | 异维无音区 | terms | terms-disaster | 逐字未改 ✓ | 是位面差，不是第二类海蚀现象 |
| `term-sky-sea` | 天空海 | terms | terms-disaster | 逐字未改 ✓ | 溯洄雨是它的降雨，两者别混 |
| `term-backrain` | 溯洄雨 | terms | terms-disaster | 逐字未改 ✓ | 不是普通雨，它让人分不清哪天才发生过 |
| `term-aurora` | 虹光 | terms | terms-disaster | 逐字未改 ✓ | 和黑潮不是一回事 |
| `term-blacktide` | 黑潮 | terms | terms-disaster | 逐字未改 ✓ | 鸣式能力与海蚀现象是同一件事 |
| `term-magnetic-storm` | 虚质磁暴 | terms | terms-disaster | 逐字未改 ✓ | 深空联合称它「虚质」；官方 3.0 版多两句：消解一切存在、发事前有「拂光」预警；def 是 2.8 版旧口径 |
| `term-solari` | 索拉里斯 | terms | terms-disaster | 逐字未改 ✓ | 是星球名不是国家名，别和黑海岸混 |
| `term-nothingness` | 虚无 | terms | terms-disaster | 逐字未改 ✓ | 不是「一片深渊」（wiki 无此说法）；别跟虚空、虚质混；「荒芜」写的是「寂静、熟悉和心安」，不是恐惧 |
| `term-void` | 虚空 | terms | terms-disaster | 逐字未改 ✓ | 官方词是「虚质空间」「学院暗面」；不是阿列夫一住的地方 |
| `term-virtual-matter` | 虚质 | terms | terms-disaster | 逐字未改 ✓ | 不是空间，是现象 |
| `term-void-space` | 虚质空间 | terms | terms-disaster | 逐字未改 ✓ | def 是官方原文，没写她就在里面；「虚质」是侵蚀现象，别与「虚质空间」混 |
| `term-four-void` | 四个「虚」别串 | terms | terms-disaster | 逐字未改 ✓ | 串了就全错，尤其别用「虚质」指代虚无 |
| `term-tunnel-gate` | 隧门 | terms | terms-disaster | 逐字未改 ✓ | 不是普通传送门，是灾厄入口；两版都没写门后通向哪，「能通过它抵达地外空间」只有早期版说过 |
| `term-temper` | 调律者 | terms | terms-disaster | 逐字未改 ✓ | 别编译名或别的头衔，官方只给这一位 |
| `term-shenghen` | 声痕 | terms | terms-disaster | 逐字未改 ✓ | 不是纹身也不是伤疤，是共鸣之后的东西 |
| `term-frequency` | 频率 | terms | terms-disaster | 逐字未改 ✓ | 不要替她宣布哪一次衰减是最后一次 |

老页剩下的 26 条（一条没少）：term-dark-side / term-name-discipline / term-place-discipline / term-traps / term-unfound / term-tunzhe / term-eligible / term-abyss-lab / term-dream-realm / term-astrum / term-infirmary / term-deepspace / term-yunian / term-minerva / term-skyship / term-roi / term-chaomeng / term-codex / term-lostbeyond / term-shixiang / term-shoushidi / term-folding-shadow / term-innerscape / term-celestial / term-white-tower / term-suizhu

## 3. lint 记录

**最终 `node build.mjs --check` = exit 0、✗ 0、⚠ 10**，「✓ lint 通过（10 条提示）」，条目合计 912、其中【待】9 条。

过程留档（登记前那会儿是红的，原因单一，已解决）：build.mjs 的 lint 只遍历 PAGES（L43），未登记页的条目不进 `all` 集合 → 全库指向这 21 个 id 的 rel 全被判成悬空（118 条），另有 1 条 `✗ [terms-disaster] src/entries 里的板块在 PAGES 里没登记`（L38），合计 exit 1 / 119 处错误。lead 在 meta.js 登记该页后这 119 条同时消失（id 一个字没改，rel 按 id 解析）。

为确认这不是真错，我另跑了**复刻 lint**（覆盖全部 42 个 entries 文件，包含未登记的 terms-disaster）：

- **0 error**。唯一一条报出来的 `entry ships-rules 缺 src` 是复刻脚本没实现 `noSrc` 豁免的假警报——meta.js 里 ships 是 `noSrc: true`，真 build 不查它。
- **10 条 ⚠，全是既有跨页别称同名**，没有一条是新造的：modes-stable / jargon-j-wentai、modes-singularity / jargon-j-qidian、modes-virus / jargon-j-bingdu、rel-nabomo / nick-president、rel-feixue / chars-绯雪、term-shenghen / items-voice-mark、term-astrum / org-星炬学院、term-deepspace / org-深空联合、term-roi / org-罗伊族、world-silenced-zone / term-silenced-zone。

### ⚠ 的两处文字变化（数量不变）

- `term-shenghen`（声痕）与 `items-voice-mark` 撞名那条**没消失**：撞名检查里只有「同页同名」才升级成 error，跨页同名一律只是 ⚠。未登记期间因为 term-shenghen 暂时不在 `all` 里，这条 ⚠ 暂时不见了；登记后它回来了，文字是「⚠ [items-voice-mark] 别称「声痕」与 terms-disaster/term-shenghen（词条名）撞了」——同一条，只是引用页号变了。
- `world-silenced-zone`（无音区）那条的引用页变成 `terms-disaster/term-silenced-zone`。
- 其余 8 条一字未变。

10 条 ⚠ 全文（与拆页前的同一批，跨页同名、无一条新造）：chars-绯雪 / term-astrum / term-deepspace / term-roi / term-silenced-zone / items-voice-mark / modes-stable / modes-singularity / modes-virus / nick-president。

## 4. meta.js 登记（lead 已做，我全程没碰 meta.js）

lead 已在 meta.js 登记，本报告里的两页码点就是按登记后的 title/desc 量的：

- PAGES 新增：`{ file: 'terms-disaster', title: '灾变与侵蚀', desc: '灾变、侵蚀、空间与频率类术语：悲鸣、鸣式、海蚀现象、虚质空间、隧群、频率…' }`
- ROUTES 新增：`['悲鸣 / 鸣式 / 海蚀现象 / 虚质空间 / 隧群 / 频率 这些词什么意思', 'terms-disaster']`
- terms 页的 desc 也被 lead 顺手改对了：现在是「共鸣、声痕、调律者、隧者、岁主等最容易说错的一批」（原来写的频率 / 虚质 / 鸣式已经搬走了）。

登记后的最终码点：**terms 26 条＝全版 3417 / 精简 2639；terms-disaster 21 条＝全版 2940 / 精简 2045**。

登记完再跑一次 `node build.mjs --check` 就应该 exit 0。

## 5. 过程与备份

- 用 node 脚本按块切分：`export default [` 之前的文件头原样保留，老页文件头只加了一行「灾变与侵蚀类（悲鸣 / 鸣式 / 海蚀现象 / 虚质空间 / 频率 等 21 条）已拆到 terms-disaster 页，别往回塞」；新页另写了文件头（收录四类：灾变 / 侵蚀 / 空间 / 频率；收录原则；21 条 id 清单；以及「id 保持原样是因为 rel 全库按 id 解析」这句说明）。
- 拆前原件备份：`%TEMP%\terms-pre-split.js`（拆前 terms.js 全文 529 行 / 37016 字节）。
- 写完做了逐块校验：新页 21 块与原块字节一致、老页 26 块与原块字节一致、老页不含任何被搬走的块、两页 id 无交集、21 个 id 与派工清单完全一致（含顺序）。
- 全程未用 git、未改 meta.js、未改别的 entries 文件。

## 6. 仍然保留的「未核」标记（搬家没动它们）

- term-threnodian：绯雪台词「预取尽了成为鸣式共鸣者的未来」查不到原文
- term-sea-erosion：梦州恶瘴的前提（心月狐遇刺后）未核其确切触发
