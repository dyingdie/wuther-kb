# lore-laguna 交账报告（官方术语页 · 拉古那与黎那汐塔旧俗）

## 0. 一句话结论

新建 kb/src/entries/lore-laguna.js，18 条官方 2.4 版词条（19 条官方记录，其中 850135「银行」按 lead 追加要求合并成 alias）；lint EXIT=0、零新增提示；整页渲染 3169 码点（目标 ≤6000、硬顶 8192）；官方 description 逐字回填并用脚本逐条比对过，19/19 与 kb/source/yakitahome-terms.json 完全一致。

- 页面：kb/src/entries/lore-laguna.js（新建，18 条，18 869 字节，U+FFFD 0 个）
- 报告：kb/reports/lore-laguna.md（本文件）
- 未改动：meta.js（页面由 lead 登记）、其它任何 entries 文件、任何 git 操作
- 校验命令：`& "C:\Users\28945\.dsh\dsh-runtimes\dsh-plugin-desktop-primary-runtime\dependencies\node\bin\node.exe" build.mjs --check`（工作目录 kb/），结果 EXIT=0

## 1. 方法

- 素材：kb/source/yakitahome-terms.json（288 条官方术语），只取本单指定 uid，全部 version=「2.4版本」。
- 官方英文名取每条的 i18n.title.en；官方原文取 description，**逐字抄进 note**（description 里句子之间的换行保留为 note 里的 \n，不改成空格）。
- 逐字校验：写完后用 node 导入本文件，把每条 note 的运行时字符串与 JSON 的 description 做 includes 比对，19/19 全中（第一次写完有 10 条把官方换行打成了空格，已修）。
- def/ctx/tabu 只写官方 description 支撑得住的说法；官方没交代的（谁建的、现在如何、归谁管）一律写进 tabu 或 note，不圆。
- 渲染体积按 build.mjs:116-143 的 renderEntry/renderPage 口径复算（src 与 note 不渲染）。

## 2. 逐条表

| uid | 官方英文名 | 中文 t | 入库/跳过 | 原因 |
| --- | --- | --- | --- | --- |
| term:850076 | Remnant Energy | 回音 | 入库 | 官方 2.4 版词条；与 terms 页「残象」(Tacet Discord) 容易混，note 写清英文名差异，不互设 alias |
| term:850094 | Fisalia | 翡萨烈 | 入库 | 官方名只写「翡萨烈」；家族全名在 factions 页，不进 alias，note 写「与 factions 的翡萨烈家族条目指同一族」 |
| term:850095 | Porto-Veno Castle | 波蒂维诺堡 | 入库 | 官方原文写它在狄萨莱海脊悬崖边、现任翡萨烈家主长居于此；家主是谁官方没写，写进 note |
| term:850098 | Cathedral of Mercury | 水星天 | 入库 | 官方英文带 Cathedral、中文名只写「水星天」；供奉哪位岁主官方没写，tabu 写明 |
| term:850100 | Acolyte | 教士 | 入库 | 隐海修会虔信者的称呼；等级与职责官方没写，tabu/notes 写明 |
| term:850101 | Montelli | 莫塔里 | 入库 | 同 850094 口径，t 用官方名，不写「莫塔里家族」进 alias |
| term:850102 | Carnevale | 狂欢节 | 入库 | 拉古那最盛大的庆典；官方没写每年何时办，note 写明 |
| term:850103 | Laurel | 桂冠 | 入库 | 岁主英白拉多在狂欢节高潮所赐；官方没写表演内容与评选方式 |
| term:850106 | Cetus the Tidebreaker | 溯海之鲸 | 入库 | 官方明说它是残象的一种，不是鲸；官方没写它现在在哪、归谁管 |
| term:850107 | Averardo Bank | 埃弗拉德银行 | 入库 | 由莫塔里家族运营；alias 挂「银行」 |
| term:850135 | Bank | 银行 | 合并进 lore-lg-averardo | 官方原文「即埃弗拉德银行，位于拉古那城内，由莫塔里家族运营」＝同物，按 lead 追加要求只建 alias，两个 uid 的原文各记一行 |
| term:850119 | Illusory Dream | 「幻梦」 | 入库 | 坎特蕾拉的毒药异能；与「紫绒梦」不是一回事，note 写明 |
| term:850120 | Velvet Dream | 「紫绒梦」 | 入库 | 坎特蕾拉少女时期调配的药剂；官方只说「一定程度上」抵御鸣式低语，tabu 写明不是免疫 |
| term:850121 | The Other Side of the Dream | 「梦的彼岸」 | 入库 | 官方全文只有一句对照；提到的「梦的此岸」不在本单范围、库里也没有，tabu 明写别替它补 |
| term:850122 | Pero | 佩洛 | 入库 | 官方用「似乎」，来历没写实，tabu 写明 |
| term:850123 | Magic Box | 珍奇箱 | 入库 | 洛可可的箱子兼佩洛住所；官方没写箱子来历与体积 |
| term:850136 | Black Alley | 黑街 | 入库 | 废弃下水道俗称兼犯罪帮派巢穴；官方说多年前被「某个神秘人物」捣毁、近年又有活动的传言，tabu 写「是传言」 |
| term:850137 | The Second Dark Tide | 第二次黑潮 | 入库 | 官方说「二十年前」；「圣女芙露德莉斯殉难」明写是拉古那人的认知，不是官方定论 |
| term:850138 | Carnevale Event A Decade Ago | 十年前的狂欢节事件 | 入库 | 官方写「据说」；平息它的是主座芬莱克；别跟第二次黑潮混成一件 |

条目 id：lore-lg-huiyin / lore-lg-fisalia / lore-lg-portoven / lore-lg-shuixingtian / lore-lg-jiaoshi / lore-lg-montelli / lore-lg-carnevale / lore-lg-guiguan / lore-lg-suhaijing / lore-lg-averardo（alias「银行」）/ lore-lg-huanmeng / lore-lg-zirongmeng / lore-lg-mengbishian / lore-lg-pero / lore-lg-zhenqixiang / lore-lg-heijie / lore-lg-seconddarktide / lore-lg-carnevale-event。

没有为凑数加别的 uid：官方 2.4 版这批共 106 条，本单只点名 19 条，多的一律不写。

## 3. 存疑原文（官方没写、我不圆的地方）

1. **term:850121「梦的彼岸」** 官方全文只有一句：「和「梦的此岸」——梦境相对应，指现实。」——「梦的此岸」是另一个官方词条，本单没点、库里也没有。条目 tabu 明写「别替它补内容」。
2. **term:850076「回音」** 官方英文 Remnant Energy，描述只说「一种纯净、完整的频率能量形态」——它和 terms 页 term-remnant「残象」(Tacet Discord) 不是同一个词，官方没说两者关系，我也没说；只各自写清英文名。
3. **term:850098「水星天」** 官方英文名带 Cathedral，中文名却只写「水星天」；供奉的是哪位岁主、归谁管，官方一律没写，tabu 明写。
4. **term:850095「波蒂维诺堡」** 官方写「现任翡萨烈家主长居于此」，但没给家主名字。def 照抄官方，note 写「官方原文没写家主是谁」。库里 chars-坎特蕾拉 是翡萨烈家主，但那是 wiki 口径，我没把它写进 def。
5. **term:850137「第二次黑潮」** 官方原话「在拉古那人的认知中，圣女芙露德莉斯为了阻止黑潮而殉难」——是当地人的认知。库里 chars-卡提希娅 那条把「芙露德莉斯」列在 wiki 别号栏（带 <del> 划除），两边说法并存，本条只按官方原文写，不下结论。
6. **term:850136「黑街」** 官方只说「被某个神秘人物捣毁」「近年又出现了他们再度活动的传言」——谁捣的、在哪、现在还在不在，官方都没写，tabu 明写是传言。
7. **term:850119「幻梦」/850120「紫绒梦」** 官方 description 内部带换行，逐字保留（note 里是 \n）。另「幻梦」是毒药异能、「紫绒梦」是少女时期调配的药剂，两者在官方描述里不是一回事，note 互相提醒。
8. **term:850138「十年前的狂欢节事件」** 官方用「据说巨大的海兽和残象潮袭击了拉古那」，被袭击的是哪只海兽、有无伤亡，官方没写。

## 4. 撞名表

本页 18 条 t + 1 个 alias（银行）与全库现有 t/alias 归一化后 **0 撞名**，lint 零新增提示。以下是处理过的近名：

| 本页名 | 撞谁 | 处理 |
| --- | --- | --- |
| 回音 | old-lore.js old-cube 的 alias「回音团子」（团子＝2.3 版第二索拉 AI NPC）；terms.js term-remnant「残象」(Tacet Discord) | 近名不同物，保留 t「回音」；note 写清两个英文名差异；不把「残象」写进 alias |
| 翡萨烈 | factions.js org-翡萨烈家族（t「翡萨烈家族」） | 官方名只写「翡萨烈」，按 lead 口径不写「翡萨烈家族」进 alias（会全库撞名），note 写同一族 |
| 莫塔里 | factions.js org-莫塔里家族（t「莫塔里家族」）；chars-npc.js chars-珂莱塔 的 alias「珂莱塔·莫塔里」 | 同上；rel 挂 org-莫塔里家族 |
| 银行（alias） | 全库无同名 t/alias | 官方 850135 与 850107 同物，按追加要求只做 alias |
| 拉古那 / 隐海修会 / 愚人剧团 / 黑海岸 / 英白拉多 / 残象 / 声痕 / 黄金之歌 | 分別已有 world-laguna、org-隐海修会、org-愚人剧团、org-黑海岸、chars-英白拉多、term-remnant、term-shenghen、org-黄金之歌 | 本页不重复建，只做 rel 指过去 |
| 教士 / 佩洛 / 珍奇箱 / 桂冠 / 黑街 | 全库无同名 | 保留官方 t |

## 5. rel 清单（全部为库里已存在的 id，挂不上的没写）

- 指向既有条目：org-翡萨烈家族、org-莫塔里家族、org-隐海修会、org-愚人剧团、chars-坎特蕾拉、chars-英白拉多、chars-洛可可、chars-芬莱克、world-laguna、world-disilai、world-avislin、term-frequency、term-remnant
- 指向本页条目（互链）：lore-lg-guiguan、lore-lg-carnevale、lore-lg-zirongmeng、lore-lg-huanmeng、lore-lg-zhenqixiang、lore-lg-pero、lore-lg-seconddarktide、lore-lg-carnevale-event
- 官方提到但库里没有 id 的人/地，一律不挂，只在 note 里写名字：卡庇托山（库里有 world-extra 的卡庇托山，已由 world-disilai 代挂）、瑟缩之角等 2.4 同批词条本单没做。

## 6. lint 与体积

- `node build.mjs --check` → **EXIT=0**，**17 条提示，全部是既有的**：15 条跨页别称撞名（chars-绯雪、term-silenced-zone、term-astrum、term-deepspace、term-roi、items-voice-mark、attr-爱弥斯/千咲/露帕/布兰特/长离、modes-稳态协议/奇点扩张/病毒侵染、nick-会长）＋ 2 条页面体积（chars-npc 7565、terms 7147）。**本页零新增。**
- 全库 862 条，其中【待】9 条不入正式页。
- 本页 18 条；整页渲染 **3169 码点**，精简版 1931 码点（目标 ≤6000、提示线 6553、硬顶 8192）。
- def 最长 **45 码点**（「莫塔里」），18 条全部 ≤80。
- lvl 全部 ['官']；src 全部固定为 `['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json']`；note 不渲染、不占码点预算。

## 7. 需要 lead 拍板的两件事

1. **贝币（term:850104，2.4版本，Shell Credit）没建** —— meta.js 给本页的 desc 写着「狂欢节、桂冠、**贝币**、黑街、波蒂维诺堡、珍奇箱、佩洛等」，但 850104 不在本单 uid 清单（只准用本单列出的 uid），所以我没建。官方原文：「由瑝珑发行，被各大地区的官方认可的通用货币。\n在亘古以前，瑝珑的祖先便开始使用海贝作为货币。\n随着时间推移，它的制造的工艺几经更迭，但贝型的外观却始终如一。」——要么补进本页（id 建议 lore-lg-beibi，t「贝币」，rel 可挂 factions 的 org-莫塔里家族），要么改 meta.js 的 desc 把「贝币」去掉，二选一，需要你点头。
2. **官方 2.4 版这批还有 87 条没着落**（本单只点 19 条）—— 其中库里有现成条目的不用管：拉古那(850097)→world-laguna、隐海修会(850099)→org-隐海修会、愚人剧团(850108)→org-愚人剧团、黑海岸(850109)→org-黑海岸、英白拉多(850105)→chars-英白拉多、残象(850081)→term-remnant、声痕(850072)→term-shenghen、黄金之歌(850125)→org-黄金之歌。剩下同属拉古那/黎那汐塔片但库里没有条目的（悲田院 850126、谕女 850152、角斗士 850164、声骸角斗 850165、「烈日」酒馆 850156、总督 850157、潮蚀 850161、涨潮期 850159、铜镜 850158、鹫巢石城 850150、大角斗赛 850149、守护兽声骸 850168、古英雄铠 850166、令尹近卫 850124、玄渺真人 850127、今州参事 850128、竞渡会 850129、瑞狮团 850130、狮子舞 850131、狮首 850132、星星花 850133、风仪拳 850134、飞檐 850113、雷煌拳 850114、龙须酥 850115、类书 850117、今令尹 850118、今巡尉 850112、令尹 850084、天工 850085、夜归 850086、巡尉 850087、治安署 850088、巡宁所 850089、呜呜物流 850090、今州 850091、华胥研究院 850092、瑝珑 850093、黎那汐塔 850096、索诺拉 850077、无音区 850078、索拉里斯 850079、海蚀 850080、鸣式 850074、悲鸣 850075、超频 850073、先天/突变/自然/诱导型共鸣者 850068-850071、达妮娅相关档案等）本单没点，我没碰；要不要另开一单收这批，你定。

## 8. 可复现的核验

- 官方原文逐字：导入 kb/src/entries/lore-laguna.js，把每条 note 与 kb/source/yakitahome-terms.json 里对应 debugId 的 description 做字符串包含比对 → 19/19 命中（含 850135 合并进 lore-lg-averardo 的那条）。
- 渲染体积：复刻 build.mjs:116-143 的 renderEntry/renderPage，用 Array.from(text).length 计数 → 3169 / 1931。
- lint：在 kb/ 目录跑捆绑 node 的 `build.mjs --check` → EXIT=0，17 条既有提示。
