# docs-2 官方档案·其二 —— 建页报告

- 建页时间：2026-10-24
- 素材：`kb/source/yakitahome-info-full.json`（yakitahome 接口离线快照，builtAt 2026-09-30，共 722 条档案，endpoint `https://mc.yakitahome.com/api/info/detail?id=<档案id>`）
- 页面：`kb/src/entries/docs-2.js`，**23 条**，id 形如 `doc-<英文短名>`
- 页码点（复刻 build.mjs 的 renderPage，标题按 lead 登记为「官方档案·其二」估的）：**全版 4630 码点 / 精简版 2801 码点** → 低于 6000 目标，远低于 8192 硬顶
- lint（`node build.mjs --check`）：**EXIT=1，唯一一条错是 `✗ [docs-2] src/entries 里的板块在 PAGES 里没登记`**（kb/src/meta.js 归 lead 改，我没动）；12 条 ⚠ 全是既有页的（chars-npc / terms 接近码点上限 + 9 条别称撞名），本页 **0 条新 ⚠**；def 最长 43 码点，无 >80 码点的
- 撞名复核：23 条 t + 全部 alias 对全库 878 条 t/alias 扫描，**零重复**

## 一、逐条表

| # | 页面 id | 页面上的名字 | 官方档案 id | 版本 | 原文类型 | 关联 rel |
|---|---|---|---|---|---|---|
| 1 | doc-first-resonator-file | 档案：第一位共鸣者档案 | 310000311 | 三测沿用 | 文书 | term-remnant, term-frequency, term-resonator-innate, term-labelle-curve, lore-jinzhou-suzhu-jiao |
| 2 | doc-c001-spectrum-report | 个体C-001频谱异常表现监测报告 | 102801016 | 1.1版本 | 文书 | lore-jinzhou-suzhu-jiao, term-frequency, term-second-resonance, term-overdrive, org-稷廷 |
| 3 | doc-jiting-memo-one | 稷廷的研究备忘录·其一 | 102801018 | 1.1版本 | 文书 | term-second-resonance, term-overdrive, term-frequency, org-稷廷 |
| 4 | doc-communication-child | 通讯记录：“那个孩子” | 102801019 | 1.1版本 | 文书 | lore-jinzhou-suzhu-jiao |
| 5 | doc-huanglong-beast-study | 瑝珑异兽考 | 102801011 | 1.0版本 | 文书 | world-huanglong, term-sea-erosion, lore-jinzhou-shiziwu, term-silenced-zone, term-remnant |
| 6 | doc-jinzhou-folk-record | 今州民俗志 | 102801010 | 1.0版本 | 文书 | world-jinzhou, lore-jinzhou-suzhu-jiao, term-remnant, lore-jinzhou-shiziwu, org-夜归军 |
| 7 | doc-huanglong-rebuild-history | 瑝珑重建史 | 102900001 | 三测沿用 | 文书 | world-huanglong, world-jinzhou, chars-今汐, term-threnodian, term-remnant |
| 8 | doc-new-state-chronicle | 新州时事纪要（部分） | 36050004 | 3.6版本 | 文书 | lore-yunyuan-zhiyi, world-jinzhou, lore-jinzhou-lingyin, world-huanglong |
| 9 | doc-remnant-file | 档案：残象 | 31000020 | 三测沿用 | 文书 | term-remnant, term-sea-erosion, j-shenghen, term-frequency |
| 10 | doc-jinzhou-huaxu-institute | 今州华胥研究院 | 31000021 | 三测沿用 | 文书 | org-华胥研究院, org-稷廷, world-jinzhou, term-remnant |
| 11 | doc-ghost-evidence | “鬼魂”相关调查证据 | 264800004 | 3.6版本 | 文书 | org-军策府, term-remnant |
| 12 | doc-secret-treasure-accident | 调查笔记：“稷廷秘宝”项目事故 | 11890101 | 三测沿用 | 文书 | org-稷廷, term-remnant, term-silenced-zone |
| 13 | doc-darkwood-survey-log | 无光之森勘察小队日志集 | 102801015 | 1.0版本 | 文书 | term-remnant, org-夜归军, term-sea-erosion |
| 14 | doc-nameless-family-letter | 无名家书 | 102801013 | 1.0版本 | 文书 | chars-忌炎, chars-维里奈, term-remnant |
| 15 | doc-broken-diary | 破损的日记本 | 31000023 | 三测沿用 | 文书 | term-remnant, term-frequency |
| 16 | doc-mist-pit-report | 关于迷雾深坑内迷雾的成分调查说明 | 11030101 | 二测沿用 | 文书 | org-夜归军, term-sea-erosion, term-remnant |
| 17 | doc-stone-leaf-tears | 回梦中曲三段·石叶泪 | 102011901 | 二测沿用 | 文书 | world-huanglong, term-threnodian, term-remnant |
| 18 | doc-sea-city-letter | 一封海市致后来者的信 | 11020122 | 三测沿用 | 文书 | world-laguna, term-blacktide |
| 19 | doc-childrens-sketch | 一幅简笔画 | 101400006 | 三测沿用 | 图画说明 | lore-yanshi, lore-jinzhou-xunwei |
| 20 | doc-averardo-vault-log | 埃弗拉德金库出入库记录 | 102801043 | 2.0版本 | 记录单 | lore-lg-averardo |
| 21 | doc-cloud-valley-survey | 云陵谷调查报告 | 11050106 | 二测沿用 | 短报告 | world-jinzhou, term-remnant |
| 22 | doc-thinking-saintess | 沉思的圣女 | 70050065 | 2.4版本 | 图画说明 | world-avislin, world-laguna |
| 23 | doc-env-assessment | 环境评估模块 | 103012503 | 二测沿用 | 短报告 | term-silenced-zone, term-sea-erosion, term-remnant |

每条的 `src` 都是 `['https://mc.yakitahome.com/api/info/detail?id=<官方id>', 'source/yakitahome-info-full.json']`；每条 `note` 写「官方档案 id <id>（<版本>，标题栏「…」）。原文摘抄：「…」「…」」。

## 二、改了什么

- **新建** `kb/src/entries/docs-2.js`（23 条，15598 字节）。头部 15 行注释写清收录原则：一条 = 一份文书／官方原文写了结论就照抄，没给结论就在 tabu 写清官方只说了什么／原标题带【】、换行、序号的洗成干净名字并在 note 记原样／档案 id、版本号、原文摘抄一律逐字照抄／本页 id 形如 doc-<英文短名>，一经登记不改。
- **新建** `kb/reports/docs-2.md`（本文件）。
- **没动**：`kb/src/meta.js`（页登记归 lead）、`kb/src/entries/docs.js` 及其它任何 entries、html / manifest.json / todo.json、git。

## 三、存疑 / 要人判断的地方

1. **310000311 的检测对象是「待确认」**，官方没给名字；里面「云陵谷战役中与降临的「角」并肩而立的那位共鸣者」也没写名字。**别认成达妮娅或今汐**，我在 tabu 里写了这条。
2. **C-001 / C-002 只在稷廷研究文件里有代号**（「角」「眠龙庭」），「溯流仪」「奇人」「二次共鸣」也都是档案内部的说法。库里目前没有这些名词的正式词条（库里本来就没有），所以我没挂 rel，也没建词条——需要的话得另开单。
3. **传说 / 民间文本 / 私人书信当史料要留余地**：`102801011 瑝珑异兽考`（狻猊）只说「学者已经判定」可能自然灭绝；`102801010 今州民俗志`、`102011901 石叶泪` 是传说与民间故事；`11020122 海市致后来者的信` 是个人书信。
4. **「沉思的圣女」原文里「拉古那乃至整个黎那汐塔的未来」是「有人说」**，只进了 note，没进 def。
5. **占位符我没猜**：原档案里大量 `████`、`[--05]`、`未年████`、`XXX年XX月XX日` 之类，日期栏和年份一律照抄占位符原样。
6. **原标题清洗了两处**，note 里都记了原样：31000021 原标题「【名称】\n今州华胥研究院」（带换行）；102801043 原标题「【埃弗拉德金库 - 出入库记录】」。
7. **别名与已有词条区分**：「华胥研究院」是 org.js 里 org-华胥研究院 的 t，所以本页那一条用「今州华胥研究院组织档案」做别名；「埃弗拉德金库」库里只有「埃弗拉德银行」，本页用「埃弗拉德金库出入库记录」。
8. **没收的候选与理由**：
   - 28050004 达妮娅的生日行程 → items.js 已有同名条目，chars-npc.js 也引用它，放弃（撞名）
   - 102176806【洛塔的日记·一】→ chars-npc.js 已收同一 id，不重复
   - 31000031《最高机密 - 严禁泄露（非必要可不点开）》→ 461 号小组的内部玩笑（谐音梗梗条），世界观信息太少
   - 102801020 稷廷的研究备忘录·其二 → 内容薄，「奇人」这段已被备忘录其一覆盖
   - 120101040「再次演奏」→ 全文 53 字，只两句
   - 其它非 type3 的图件/照片/语音类（125000125~127、120101039/40、34000004~34000010、102001303 晓空谣、103000009 库默尼之歌、11010106 鸣钟语音等）→ 挑选时以「有官方设定信息」为准，没收

## 四、撞名表

| 想收的 t | 撞了谁 | 怎么处理 |
|---|---|---|
| 达妮娅的生日行程（28050004） | items.js items-birthday-schedule「达妮娅的生日行程（档案与读物同名）」 | 放弃这条，不收 |
| 洛塔的日记（102176806） | chars-npc.js 已收 | 不重复收 |
| 一幅简笔画（101400006） | type2 的「破旧的简笔画」不是同名 | 保留 |
| 其余 21 条 t + 全部 alias | 全库 878 条 t/alias 无同名 | 保留 |

## 五、要 lead 做的事

**kb/src/meta.js 的 PAGES 里要加一行**，否则 `node build.mjs --check` 一直是 EXIT=1（那一条 `✗ [docs-2] src/entries 里的板块在 PAGES 里没登记`）：

```js
{ file: 'docs-2', title: '官方档案·其二', desc: '官方档案其二：研究备忘录、勘察日志、家书、日记、调查笔录、记录单。docs 里没有的官方文书抓这里' },
```

ROUTES 里也建议加一条「[问「某份档案里写了什么」, docs-2]」之类的路由。desc 我按 4630 码点的标题算过，改短改长都不影响上限。
