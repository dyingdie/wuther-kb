# lore-late 交账报告（2.7~3.4 后期新词）

- 页面文件：`kb/src/entries/lore-late.js`（23 条，export default 数组，206 行）
- 素材源：官方接口 `https://mc.yakitahome.com/api/terms` + 本地快照 `kb/source/yakitahome-terms.json`（288 条），只取本单指定 uid
- 登记：`kb/src/meta.js` 的 PAGES 已加 `{ file: 'lore-late', title: '后期新词', desc: '2.7~3.4 的后期新设定词：玄方地界、虹音塔、心镜、奇美拉、法比亚纳、索拉电影院、深水层等。问「玄方地界是什么」「虹音塔在哪」抓这里' }`，ROUTES 已加 `['玄方地界 / 虹音塔 / 心镜 / 奇美拉 / 法比亚纳 这些后期新词', 'lore-late']`

## 校验结果

- `node build.mjs --check`（workdir = kb）**exit 0**，✓ lint 通过（20 条提示全部来自别的页：chars-绯雪、term-silenced-zone、term-astrum、term-deepspace、term-roi、items-voice-mark、attr-*、modes-*、nick-president、chars-npc 与 terms 两页接近体积上限、以及三个尚未建词的 lore-* 页跳过生成）。**lore-late 本页零警告、零错误。**
- 渲染体积：全版 **4009 码点** / 精简版 **2538 码点**（预算 6000，硬顶 8192）——余量够，还能再加词
- def 最长 60 码点（限 80），23 条 id 唯一，lvl 一律 `['官']`，src 一律那两条固定值
- 全库 t/alias 精确比对：23 个 t 全部唯一，没有占用别人的 alias
- rel 指向的 id 全部核实在库

## 入库表（uid｜官方英文名｜中文 t｜版本｜入库/跳过｜原因）

| uid | 官方英文名 | 中文 t | 版本 | 结论 | 原因 |
|---|---|---|---|---|---|
| term:260003 | Mindsight | 心镜 | 2.7 | 入库 | 官方写明是仇远的共鸣能力，三层效果（感知频率/勘破位置与心境/借索诺拉外化心境）齐，照抄 |
| term:260005 | Chimera | 奇美拉 | 2.7 | 入库 | 官方写明是利维亚坦融合三种残象频率而成的黑潮造物、有前史，无需补 |
| term:260006 | Fabianum | 法比亚纳 | 2.7 | 入库 | 官方写明是昔日「呓语镇」的旧名，且镇子早已覆灭；照抄并在新旧名关系处提示 |
| term:260012 | Fenrico the First | 芬莱克一世 | 2.7 | 入库 | 原文由 lead 在派工单给出，与快照一致；t 用「芬莱克一世」避开 chars 页的「芬莱克」 |
| term:270001 | Land of Xuanfang | 玄方地界 | 2.8 | 入库 | 官方一句话交代了地界范围、进出必经与旧日关隘职能 |
| term:851064 | Neon Tower | 虹音塔 | 2.8 | 入库 | 官方写明是穗波市中心的电波通讯塔、城内最高建筑兼旧观光地标 |
| term:851068 | Irideglow Crystal | 虹晶 | 2.8 | 入库 | 官方写明是虹光侵蚀留下的结晶化痕迹，可分离出「轻质虹晶」 |
| term:851072 | Namipon | 波仔 | 2.8 | 入库 | 官方写明是穗波市活动的回音生物、毁灭前的城市吉祥物 |
| term:851073 | Missing Namipons | 迷途波仔 | 2.8 | 入库 | 官方写明是波仔频率被悲鸣撕裂后分化出的个体，失去与本体的联系 |
| term:700011 | Starward Riseway | 联运椎骨 | 3.0 | 入库 | 官方写明是依托巨剑结构、连接拉海洛与罗伊冰原的升降运输系统 |
| term:700012 | Greatsword | 巨剑 | 3.0 | 入库 | 官方写明是「隧者」遗存的兵装、贯穿拉海洛核心地域 |
| term:700013 | Hyvatia | 海维夏 | 3.0 | 入库 | 官方写明是深空联合为监测维护「炉芯」在坠剑湖地表部署的仪器 |
| term:750041 | Snowfluff Seal | 雪绒海豹 | 3.1 | 入库 | 官方写明是生活在罗伊冰原的海豹 |
| term:750042 | Ichor | 日髓 | 3.1 | 入库 | 官方写明是治疗极端罕见病、仍在研究验证阶段的特殊药物 |
| term:800032 | Academy's Dark Side | 学院暗面 | 3.2 | 入库 | 官方三句写明是自然诞生的索诺拉；与 items 页那份「调查报告」文书分得开 |
| term:800035 | Vortex's Eye | 涡心 | 3.2 | 入库 | 官方原文是比喻句，只照抄不补实体（详见「存疑原文」） |
| term:852006 | Night City | 夜之城 | 3.4 | 入库 | 官方写明是露西一行人曾居住的多元文化超级都市 |
| term:850110 | Tethys | 泰缇斯 | 2.4 | 入库 | 官方写明是黑海岸独有的超级计算机系统（文明推演沙盘），可发布悲鸣预警 |
| term:850141 | Necrostar | 噬亡星 | 2.4 | 入库 | 官方全文只有一句，照抄不改 |
| term:850143 | Cinema Solaris | 索拉电影院 | 2.4 | 入库 | 官方写明是心之集域深处办电影节的特殊空间 |
| term:850148 | Deep Water Zone | 深水层 | 2.4 | 入库 | 官方写明是集域深处无法直接探索、堆积大量梦境的空间 |
| term:850158 | Copper Mirror | 铜镜 | 2.4 | 入库 | 官方原文是「传说 + 似乎」，照抄并标明是传说 |
| term:850140 | You'tan | 忧昙 | 2.4 | 入库 | 官方写明是形如白色优昙婆罗花的回音生物；与 lore-jinzhou 页的「忧昙」有重复风险（见末尾待办） |

**23 条全部入库，0 条跳过。**

## 存疑原文（官方只给比喻 / 没交代清楚的地方，一律不补）

- **涡心**（800035）：官方原文「如果异变的暗面是一个漩涡，而焦虑、难过的情绪是其涡眼，那么在涡眼之中，引起暗面异变的元凶就是涡心。」——全是比喻，官方没说它是什么实体、在哪、能不能除掉。def 里保留了比喻原样，tabu 明确禁止自行补全。
- **学院暗面**（800032）：官方只说「自然诞生的索诺拉」「受学院师生影响变成学院的影子」「会被集体潜意识影响」，没写它具体长什么样、在学院哪个位置。
- **深水层**（850148）：官方只说「无法直接探索的空间，堆积着集域一直以来所收集的大量梦境」，没写位置、归属、能不能取用那些梦境。
- **铜镜**（850158）：官方原文是「在瑝珑的传说中……用它似乎能看到一些原本不可见之事……」，传说 + 「似乎」，不能当游戏里真实存在的道具。
- **忧昙**（850140）：官方只写外形像白色优昙婆罗花、能与白芷以精神感应沟通，没说它和白芷是什么关系（变的/养的/身上的都别讲）。
- **索拉电影院**（850143）：官方只说在集域「深处」、与集域其他区域不直接连接，没写具体位置，也没写它归谁管。
- **噬亡星**（850141）：官方全文只有「用于收容逸散在泰缇斯系统中错误和弃用数据的特殊星图」一句，别扩写成吞噬数据的活物或武器。
- **海维夏**（700013）：官方只说是深空联合部署的监测仪器 + 搭载「隧者」校准模块副本，没写谁造的、能不能压住炉芯。
- **日髓**（750042）：官方说「至今仍还处于研究及验证阶段」「鲜少有人能负担其强副作用」，没写它在谁手里、是否已上市。
- **法比亚纳**（260006）：官方只说「即昔日的『呓语镇』……覆灭，成为了如今受蚀地一隅的失落角斗士小镇」——**新旧名的先后两边官方文本没给统一说法**（2.7 版这条与 2.6 版「呓语镇」条目互相只说「昔日/如今」），本页只照抄，不替官方裁先后。
- **心镜**（260003）：官方的「在极端情况下，这种感知可以藉由其他的索诺拉被进一步强化，将敌人或是仇远自己的心境外化为短暂存在的场景」——外化条件与范围官方没细写，def 只留三层效果，tabu 提示别简化成读心术。
- **芬莱克一世**（260012）：原文全是隐晦叙述（为什么禁称、为什么只有一位都没解释），只照抄。

## 撞名表（23 个 t 与全库 743 条的 t / alias 逐一精确比对，0 冲突）

以下都是**近名但不同物**，已写进各自 note：

| 本页 t | 库里近名 | 关系 | 处理 |
|---|---|---|---|
| 法比亚纳 | world-extra / world-fabuiana「呓语镇（原名法比亚纳）」；lore-blacktide / lore-bt-murmurstown「呓语镇」 | 同一处地名的新旧名 | t 保持「法比亚纳」，note 写明它是呓语镇旧名、镇子已覆灭 |
| 芬莱克一世 | chars / chars-芬莱克「芬莱克」 | 同一人 | t 用「芬莱克一世」避开，rel 挂 chars-芬莱克 |
| 波仔 | allusions / al-jidao「极道波仔 / 穗波之龙」 | 台词出处条目，非同一物（allusions 的 alias 里没有单独的「波仔」） | t 保持「波仔」，note 写明关系，不另造别称去撞 allusions |
| 学院暗面 | items / items-an25360《星炬学院暗面调查报告编号AN25360》 | 一个是索诺拉/现象，一个是文书 | note 里分清，tabu 禁止混 |
| 夜之城 | versions / ver-34「3.4 心之集域·夜之城」 | 同一次版本里的同一座城 | t 保持「夜之城」，note 说明别当两处地方 |
| 泰缇斯 | world / world-tethys-bottom「泰缇斯之底」 | 系统 vs 地点 | tabu 提示别混，rel 只挂 org-黑海岸 / world-tethys-bottom |
| 玄方地界 | world / world-xuanfang「玄方城」 | 地域 vs 城 | tabu 提示别当同一个词 |
| 雪绒海豹 | memes / meme-xuebao「雪豹」 | 凌阳内测造型梗，非同一物 | t 保持「雪绒海豹」，rel 挂 meme-xuebao 只作梗出处 |
| 忧昙 | meta.js 里 lore-jinzhou 页 desc 已列「忧昙」 | 重复风险（见待办） | 已入库并注明，待 lead 定夺归属 |

## rel 清单（全部核实在库）

| t | rel |
|---|---|
| 心镜 | chars-仇远、roles-仇远 |
| 奇美拉 | al-leviathan、feixun-char-galbrena、term-blacktide |
| 法比亚纳 | world-fabuiana |
| 芬莱克一世 | chars-芬莱克 |
| 玄方地界 | world-mengzhou、world-jinzhou、world-xuanfang、lore-jiuting |
| 虹音塔 | world-suibo |
| 虹晶 | term-aurora、world-suibo |
| 波仔 | world-suibo、al-jidao、lore-late-mitu-bozai |
| 迷途波仔 | world-suibo、lore-late-bozai、term-lament |
| 联运椎骨 | lore-late-jujian、world-jinheli、world-roine |
| 巨剑 | term-tunzhe、al-baldur、world-swordlake、world-jinheli |
| 海维夏 | term-furnace-core、term-deepspace、world-swordlake、term-tunzhe |
| 雪绒海豹 | world-roine、meme-xuebao |
| 日髓 | org-诺维尔再生医药 |
| 学院暗面 | org-星炬学院、term-solari、world-sonorora、term-dark-side |
| 涡心 | term-dark-side、lore-late-xueyuan-anmian |
| 夜之城 | ver-34 |
| 泰缇斯 | org-黑海岸、world-tethys-bottom、term-lament |
| 噬亡星 | lore-late-taithi |
| 索拉电影院 | term-dream-realm、term-filmfest、lore-late-shenshuiceng |
| 深水层 | term-dream-realm、lore-late-suoladianyingyuan |
| 铜镜 | world-huanglong |
| 忧昙 | chars-白芷 |

## 待 lead 定夺

1. **重复条目**：terms 页的 `term-dark-side`「暗面」note 记的也是 uid:800032 同一条官方原文，与本页「学院暗面」并存。建议留本页（t 更准、def 完整），把 term-dark-side 的 note 改成指向本页，或反过来合并——两份都留着会让她答到两处。
2. **忧昙归属**：meta.js 的 lore-jinzhou 页 desc 已列「忧昙」，而该页词条文件尚未建。本页已收「忧昙」（官方 2.4 版原文），若 lore-jinzhou 页随后也建一条，会撞名——建议归到 lore-jinzhou 或本页其一。
3. lore-late 页面 desc 是 lead 定的；若要改标题/描述请直接改 meta.js（本单无 meta.js 写权限，未动）。
