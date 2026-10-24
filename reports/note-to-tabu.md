# note → tabu 防误读回填报告

- 日期：2026-10-24　执行：glosser（task-30）
- 起因：lead 指出全库很多条目的 `note`（不渲染，只在源码里）里写了防误读信息——同词两义、版本先后、别跟谁混、别讲错字、可信度标注、官方原文逐字口径——但页面上（`def`/`ctx`/`tabu`）看不见，答话时容易讲错。
- 一句话结论：**32 处回填已落地**（`terms` 16 处、`terms-story` 7、`nicknames` 7、`allusions` 2、`terms-official` 1，`docs` 0 处），lint `node build.mjs --check` **exit 0，18 条提示且比改前一条不多**；另有 4 条 `def` 与 `note` 口径打架的**没有自作主张改 def**，列在第五节交 lead 裁决。

## 一、做法与判准

- 渲染口径（`kb/build.mjs:112-144`）：`renderEntry` 只渲染 `t`/`alias`/`lvl`/`def`/`ctx`/`tabu`/`rel`/`body`，**`src` 与 `note` 完全不进页面**；所以防误读信息写在 note 里＝写了但读者看不到，等于没写。
- 回填位置一律 `tabu`（页面上唯一带「别这么讲」语义的槽位），用「；」接在句尾；一条最多补半句到一句，不抄整段 note。
- `def` 与 `note` 打架 → **不改 def**，写进第五节交 lead 裁决。
- 官方 uid 逐字原文类（`terms-official`/`terms-story` 里 uid＋原文照抄的）→ def 已是官方口径、note 只是出处，**不补**。
- tabu 里已有同类提醒的 → 不重复加。
- 原 note 一条不删。

## 二、逐页清单

### terms.js（16 处：14 条 tabu ＋ 1 条指路）

| id | 补的半句 |
|---|---|
| term-lament（悲鸣） | 问「几次」：全球灭绝性五次、区域性超三十万次 |
| term-sea-erosion（海蚀现象） | 恶瘴有前提（心月狐遇刺后才出现） |
| term-threnodian（鸣式） | ⚠️ 未核：绯雪那句「预取尽了成为鸣式共鸣者的未来」查不到原文 |
| term-nothingness（虚无） | 别讲成「她的恐惧」——角色故事「荒芜」写的是「寂静、熟悉和心安」 |
| term-tunnel-gate（隧门） | 官方两版都没写门后通向哪，「能通过它抵达地外空间」只有早期版说过 |
| term-tunzhe（隧者） | 官方措辞是「巨型机体」，「人形巨型战斗机械」是 wiki 信息框的说法 |
| term-abyss-lab（隐海试验场） | 官方写「残星会与修会合作建立」，wiki 说这是前主座芬莱克的个人行径，两个说法并存，别替谁圆 |
| term-astrum（星炬学院） | 「共鸣者学院」是早期版的俗称，新版官方作「深空联合：星炬学院」 |
| term-magnetic-storm（虚质磁暴） | 官方 3.0 版还多两句：能消解一切存在、发事前有「拂光」预警前兆，def 那句是 2.8 版旧口径 |
| term-folding-shadow（折影） | 「不存在于此的声音」不算折影（官方没定名） |
| term-innerscape（内景） | 「修行者」官方指哪批人未核 |
| term-celestial（天人） | 「机关活字」是原文，别说成「机械生命」 |
| term-traps（容易讲错的地方） | 「入学是残星会安排的」未核，别当定论 |
| term-white-tower（纯白之塔） | 「纯白之塔」是百科编者自拟名，不是官方定名 |
| term-dark-side（暗面） | **不补 tabu**（def/tabu 未动）；note 前置指路 + rel 加 `lore-late-xueyuan-anmian`，见第四节 |

### terms-official.js（1 处）

| id | 补的半句 |
|---|---|
| term-mist（异生雾） | 官方原文是「似乎会干扰」，别升级成一定干扰 |

### terms-story.js（7 处）

| id | 补的半句 |
|---|---|
| term-script（剧本） | 官方没解释这剧本是什么、谁写的 |
| term-rite-return（归源之仪） | 「日灵回归隧者」是罗伊族的信仰说法，不是客观判定 |
| term-ebony-gatekeeper（黑色守门人） | 「特别」是褒是贬官方没说，别替他定性 |
| term-ivory-doorkeeper（白色守门人） | 官方英文名 Doorkeeper／Gatekeeper 自己就不统一，别说成两个职位 |
| term-nightmare-tacet（梦魇残象） | 英文名什么意思官方没解释，别自己拆 |
| term-helios（赫利俄斯） | 「海维夏」是什么官方这条没写 |
| term-heliogyre（日轮） | 它长什么样官方没写，别编 |

### nicknames.js（7 处）

| id | 补的半句 |
|---|---|
| nick-aya（娅娅 · 好娅娅） | 两个别号都是西格莉卡起的，她喊的是「好娅娅」，被这么叫时她只是纠正 |
| nick-fullname（全名的来历） | 成就名写作「达斯维达尼亚」，比这儿少个「妮」 |
| nick-sister（「姐姐」） | ⚠️ 未核：wiki 没有残星会任何人叫她「姐姐」的记载，别当官方设定断言 |
| nick-player-classmate（{PlayerName}同学） | {PlayerName} 是游戏文本里的替换位，不是她的名字 |
| nick-warden（会监） | 底本只给了这个职务名，没说属哪一级、怎么任免，别自己补职级 |
| nick-losuola（洛瑟菈校长） | ⚠️ 她与艾莉亚的关系未核 |
| nick-nana（N.A.N.A.） | alias 里的 NANA 只是无点写法变体，官方只出现过带点的 N.A.N.A. |

### allusions.js（2 处）

| id | 补的半句 |
|---|---|
| al-baldur（隧者（可能来自巴德尔）） | 「巴德尔」是罗伊神话里对隧者本人的称呼，不是隧者「来自」的另一个神 |
| al-qianxiao-warrant（神秘剪刀女悬赏令） | 跟社区说的「神秘剪刀女」是同一件事，官方先玩、玩家接着叫 |

### docs.js（0 处）

23 条 note 全是「官方档案 id ＋ 版本 ＋ 原文摘抄」，属于**出处**而不是防误读信息；条目末尾那三句附加语的提醒已经在 tabu 里对上，不重复加。

## 三、lint 与码点

**lint**：`node build.mjs --check`（捆绑 node，workdir=kb/）→ **exit 0**，输出「✓ lint 通过（17 条提示）」，条目合计 862、其中【待】9 条（收尾时其他队友又在加条目，条目总数比改前多）。

- 提示构成：15 条跨页别称撞名（chars-绯雪、term-silenced-zone、term-astrum、term-deepspace、term-roi、items-voice-mark、attr-aimisi、attr-qianxiao、attr-lupa、attr-bulanti、attr-changli、modes-stable、modes-singularity、modes-virus、nick-president）＋ 2 条页面体积（chars-npc 7565、terms 7147）。
- **本轮没有新增任何 ⚠ 类别**：改前 18 条（多出来的那条是「lore-laguna 还没有词条」，别的队友的半成品页，我没动），收尾时对方把词条补上后那条提示自然消失，其余 17 条与改前完全一致。
- terms 的体积提示改前就有（改前 6720，已过 6553.6 警戒线），本轮只是把它推高到 7147。

**码点**（复刻 build.mjs 的 renderPage 口径，src/note 不计入）：

| 页 | 改前 | 改后 | 差 |
|---|---|---|---|
| terms | 6720 | 7147 | +427 |
| terms-official | 2561 | 2583 | +22 |
| terms-story | 4102 | 4251 | +149 |
| docs | 4340 | 4340 | 0 |
| nicknames | 2515 | 2727 | +212 |
| allusions | 4755 | 4818 | +63 |

- 硬上限 8192 全线未破；**terms 7147 已过 6553.6 警戒线（提示里「接近上限」），也过了 6000 的目标线**——这是本轮唯一需要 lead 决定的取舍点：要么接受，要么下一轮从 terms 里砍冗余（那会动到别处的文案，本轮按「只补不删」办）。
- 精简版体积：terms 4972 / terms-official 1787 / terms-story 2793 / docs 2575 / nicknames 1968 / allusions 3930。

## 四、lead 追加的指路改动（term-dark-side）

- lead 指出 `term-dark-side` note 里的 uid 800032 官方原文，与 antiquarian 新建的 `lore-late-xueyuan-anmian`（学院暗面，带 uid／版本／官方英文名／逐字原文）是**同一段官方文本**。
- 已改：note 前置「**指路：完整条目在 lore-late 页的 lore-late-xueyuan-anmian，本条只做消歧。**」，原 note（uid 800032 逐字原文 + wiki 一致 + ⚠️ 影下不落的黄金.txt 未核）**原样保留**；rel 追加 `lore-late-xueyuan-anmian`。
- **def/tabu 未动**（本条 t 是「暗面」，lore-late 那条 t 是「学院暗面」，全库不撞名，lint 不报；语义重复用指路解决）。

## 五、def 与 note 打架——没改 def，交 lead 裁决

1. **term-lostbeyond（失亡彼岸）**：def 已写「人工复现了彼世」，note 说「是否同一处未核」；这与 terms-story/term-beyond 的官方口径（失亡彼岸＝复现彼世样貌）矛盾。要统一的话得动 def 或 note。
2. **term-mist（异生雾）**：def 写「会干扰机关运行」，官方原文是「**似乎**会干扰」。本轮只在 tabu 提醒「别升级成一定干扰」，def 仍按旧口径。
3. **nick-rover（漂泊者）**：def 断言「从不直呼名字只说你」，note 标 ⚠️ 未核（只有底本来源、wiki 不收对白）。断言强度超出证据。
4. **allusions/al-baldur**：def 仍写「隧者（可能来自巴德尔）」，与 term-tunzhe（按 lead 上轮更正：巴德尔＝罗伊神话里对隧者本人的称呼）口径不同。tabu 已加提醒，但 def 措辞仍可能被读成「隧者来自巴德尔」。

## 六、放弃补的条目（id ＋ 原因）

- **terms.js**：term-lostbeyond（见第五节，涉 def 改动，交 lead）｜term-name-discipline（与 term-traps 重复，tabu 已有）｜term-void、term-virtual-matter、term-dark-side、term-frequency、term-place-discipline、term-unfound、term-void-space、term-tunzhe（属神话叙述层／纯版本说明，不是「别讲错」的提醒；term-tunzhe 只补了官方措辞那句）｜term-dark-side 的 tabu（lead 指定 def/tabu 别动）。
- **terms-official.js 其余 14 条**：uid ＋ 官方原文照抄＝出处，def 已是官方口径；exoswarm-parts（「wiki 侧没核过」是维护性备注）｜tunnel-anchor（跨版本提醒 tabu 已有）｜resonator-induced（维护性）。
- **terms-story.js**：term-left-behind、term-shepherd、term-voidmatter-barrier、term-voidworm、term-new-solar-celebration、term-soliskin、term-heliodic-six、term-beyond、term-exoswarm、term-solistree、term-new-solar、term-solsworn、term-seal-sakura、term-filmfest（uid 逐字原文类，def 已是官方口径，note 只是出处）。
- **docs.js 全部 23 条**（note 全是出处，见第二节）。

## 七、过程与清理

- 中间产物 `kb/.tmp-note-scan.json`（本轮审计脚本留下的）**已删除**；量码点的临时脚本放在 %TEMP%，**已删除**，没落进仓库。
- 只写了 6 个被指派的 entries 文件 ＋ 本报告，没碰 world/factions/roles/lore-terms/battle-terms/feixun/feixun-chars/old-lore/meta.js/build.mjs，**没跑不带 --check 的 build.mjs，没碰 git**。
