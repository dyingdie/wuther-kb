# old-lore —— 官方术语 2.3~2.5 的早期世界观词

- 页文件：`kb/src/entries/old-lore.js`，17 条（meta.js 已由 lead 登记为「早期旧事」，我没碰 meta.js）
- 素材源：官方接口 `https://mc.yakitahome.com/api/terms`（本地快照 `kb/source/yakitahome-terms.json`，288 条）。英文名取自快照的 `i18n.title.en`，description 逐字照抄
- 渲染体积：全版 **3609 码点** / 精简 **2421 码点**（硬顶 8192，目标 6000）
- 校验：`node build.mjs --check` → **exit 0，✓ lint 通过（20 条提示）**；20 条全是别页既有告警，本页 0 条、0 error
- 本单 18 个 uid → **17 条入库 + 1 条跳过**

## 条目清单（uid｜官方英文名｜中文 t｜入库/跳过｜原因）

| uid | 官方英文名 | 中文 t | 决定 | 原因 |
|---|---|---|---|---|
| 800002 | Anniversary Cake | 庆典蛋糕 | 入库 | 2.3 版；description 明确说是第二索拉的控制中枢 |
| 800003 | Second Coming of Solaris | 第二索拉 | 入库 | 2.3 版；本单的锚点条目 |
| 800004 | Cube | 团子 | 入库 | 2.3 版；t 用官方标题「团子」，alias 加「回音团子」 |
| 800006 | Sonoro Sphere | 蜃境 | 入库 | 2.3 版；与 850077 同英文，见「存疑原文」 |
| 800007 | Channel | 信道 | 入库 | 2.3 版 |
| 800008 | Ghost Hounds | 猎犬 | **跳过** | 与 factions.js `org-幽灵猎犬` 同一物（官方原文「猎犬即『幽灵猎犬』，是卡卡罗在新联邦所率领的一支佣兵团」），不另建条目；**uid 800008 待 lead 回填到 `org-幽灵猎犬` 的 note** |
| 800009 | The Golden Bough | 《金枝记》 | 入库 | 2.3 版；t 照抄官方标题带书名号，alias 加「金枝记」 |
| 800010 | Requiem Paradise | 安魂乐园 | 入库 | 2.3 版 |
| 800011 | Celestial Steed | 天马座 | 入库 | 2.3 版 |
| 800012 | Melody | 旋律 | 入库 | 2.3 版 |
| 850077 | Sonoro Sphere | 索诺拉 | 入库 | 2.4 版（lead 追加）；t 用「索诺拉」 |
| 851010 | Dreamland Coupon | 乐园券 | 入库 | 2.5 版 |
| 851011 | Frequency Crystal | 频率晶体 | 入库 | 2.5 版 |
| 851017 | Lillibet | 莉莉贝 | 入库 | 2.5 版 |
| 851018 | Book of Prophecies | 「预言书」 | 入库 | 2.5 版；t 照抄官方标题带引号，alias 加「预言书」 |
| 851019 | Hero of Heroes | 「英雄王」 | 入库 | 2.5 版；t 照抄官方标题带引号，alias 加「英雄王」 |
| 851022 | Echo Brooder | 声骸培育舱 | 入库 | 2.5 版 |
| 851027 | Threnodian's Gem | 鸣式宝石 | 入库 | 2.5 版 |

## 存疑原文

- **800006 蜃境 vs 850077 索诺拉**：官方英文名同为 Sonoro Sphere，2.3 版中文叫「蜃境」、2.4 版中文叫「索诺拉」——同一条官方英文的前后两个中文说法，不是两个地方。两条 note 里互相点明，tabu 也各写了一句。
- **world-extra.js 的 `world-sonorora` 词条名是「索诺拉（声之领域／蜃境）」**：与本页 t「索诺拉」「蜃境」字面都不撞名（lint 不告警），但两处口径不同（那边是 wiki 口径，这边是官方术语口径）。回复时按本页的官方原文说，别把两处当两个地方。
- **800004 团子**：官方中文正式名是「回音团子」，官方英文名 Cube（不是 Dango）。t 用官方标题「团子」，alias 补「回音团子」。
- **800012 旋律**：官方原文出现共鸣者「夏空」，**本页没建夏空条目**（不在本单 uid 清单内），note 原文照抄，别据此编她的身份。
- **851027 鸣式宝石**：官方原文出现「蜜芽」这个角色名，本页同样没建她的条目，note 照抄。
- **851018 / 851019**：官方 t 自带引号/书名号，t 照抄；另加不带符号的 alias，方便提问时能匹配上。
- 官方没交代的一律写进 tabu（谁造的、怎么用、现在还在不在），没替它圆。

## 撞名表

全库 801 条（含本页 17 条）的 t + alias 逐一对过，**本页 0 处撞名**（同页、跨页都没有），lint 也没因本页新增任何提示。唯一要留意的近名：

| 本页 | 别处 | 结论 |
|---|---|---|
| t「索诺拉」「蜃境」 | world-extra.js `world-sonorora`「索诺拉（声之领域／蜃境）」 | 字符串不同不触发告警，但同指官方 Sonoro Sphere，别当两个地方 |
| （跳过）800008「猎犬」 | factions.js `org-幽灵猎犬` | 同一物，按 lead 指示不建条目，只记 uid 待回填 |

## rel 清单（全部在库中存在，lint 0 悬空）

- old-solaris → org-先行公约、chars-安可、old-cake、old-cube、old-channel
- old-cake → old-solaris、chars-安可
- old-cube → old-solaris、chars-安可、world-tethys-bottom
- old-mirage → old-sonora、world-sonorora
- old-channel → old-solaris、world-tethys-bottom
- old-golden-bough → world-rinascita、org-黄金之歌
- old-requiem → world-rinascita
- old-steed → world-rinascita、org-黄金之歌
- old-melody → term-frequency、old-sonora
- old-coupon → j-shenghen
- old-crystal → term-frequency、term-dream-realm
- old-lillibet → org-谕女、world-septimont、old-prophecy-book
- old-prophecy-book → old-lillibet、org-谕女、world-septimont
- old-hero-king → world-septimont、org-谕女
- old-brooder → j-shenghen、term-remnant
- old-gem → term-threnodian、al-leviathan
- old-sonora → old-mirage、world-sonorora、old-melody

## 纪律

- 只用 write/edit 写文件；没碰 meta.js、没碰别的 entries 文件、没跑不带 --check 的 build、没动 git
- 每条 lvl 一律 `['官']`，src 一律 `['https://mc.yakitahome.com/api/terms','source/yakitahome-terms.json']`
- 每条 tabu 都带一句：这是早期版本的世界观词，现在是否还成立官方没说，别当现状断言
- def 最长 52 码点（上限 80），整页离 6000 还有一半以上余量
