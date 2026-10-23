# 玩法页（modes）建页报告

日期：2026-10-23　执行：splitter　任务：task-11
文件：kb/src/entries/modes.js（新建，16 条）、kb/reports/modes-page.md（本文件）
素材：kb/source/modes-research-2026-10-23.md（网页原文摘录存档）

## 一、wiki 已核（标 ['官'] 的那一层）

wiki 站内**没有**「终焉矩阵」「冥歌海墟」「全息战略」三个词条，只有「逆境深塔」词条（世界观向）。
正式名对照的唯一出处是 wiki 梗/黑话页：

    深塔：[[逆境深塔]]。全息：[[全息战略]]。海墟：[[冥歌海墟]]。矩阵：[[终焉矩阵]]。

| 条目 | 标 ['官'] 的部分 | 出处 |
|---|---|---|
| modes-matrix | 正式名终焉矩阵 | wiki 梗/黑话 |
| modes-tower | 正式名逆境深塔 | wiki 梗/黑话 |
| modes-lagoon | 正式名冥歌海墟（写在 note 里，lvl 按派单用 ['社']）| wiki 梗/黑话 |
| modes-hologram | 正式名全息战略 | wiki 梗/黑话 |

**wiki 的「逆境深塔」词条是世界观**：瑝珑正在开发中的人工蜃境战力演算项目，实验场地是华胥研究院由稷廷一处大型实验场遗址改建。它跟爬塔玩法不是一回事，modes-tower 的 tabu 里写死了别混。

## 二、攻略站来源（['考'] = wuthering.gg，['社'] = 社区）

| 条目 | lvl | 出处 |
|---|---|---|
| modes-matrix-score / modes-stable / modes-singularity / modes-virus | ['考'] | wuthering.gg 终焉矩阵、奇点扩张页 |
| modes-stacking | ['考'] | wuthering.gg 矩阵叠兵·先行版页 |
| modes-tower-area / -fatigue / -noise / -cycle / -mark | ['考'] | wuthering.gg 逆境深塔页 |
| modes-lagoon / modes-lagoon-token | ['社'] | TapTap UP「秦白叶」攻略 |

## 三、留待 / 拿不准

- **modes-hologram-rules（lvl ['待']）**：全息战略的规则正文没查到。检索式写在 note 里
  （huijiwiki list=search 确认无词条；梗/黑话只有一行名对照；wuthering.gg 导航能见
  全息战略·速攻／飞檐／致爆／竞雪／刀伶之舞 五个关卡页，正文没取）。不上线，只进 todo.json。
- **矩阵积分口径**：社区攻略出现过 5000 / 7025 / 77755，彼此差一个数量级，来源原文也只说
  「按对敌人的伤害来结算」，所以库里只写「按伤害量算分」，**没写满分**。tabu 里写了别编。
- **危机演进**：来源只说「解锁更为危险的【危机演进】能力」，具体有哪几种没写，库里也没列。
- **矩阵版本线**：社区标题里有 3.0 首发 / 3.2 第一阶段 / S1 S2 赛季 / 「削弱」等说法，
  **全无官方公告佐证**，这轮没往库里写（versions 页要写也得标 ['社']）。
- **海墟层数 1-6 / 7-8 / 9-11 另有无尽**：出自一篇玩家攻略，社区口径，lvl 标 ['社']。
- **信物名目**（船长印章、赞颂交融的福音、隐而不发的野心、珍奇契约）：社区攻略说法，tabu 写死别当官方设定。
- **拉古那悲叹墓岛里的「冥歌海墟」是地点**，跟这个玩法同名不同物，modes-lagoon 的 tabu 指到 world-extra。

## 四、纪律

- 别称不跟 jargon 页重复（矩阵／深塔／爬塔／海墟／全息都已在 jargon 页），这页用 rel 指过去，
  没加 alias，避免跨页同名多报 ⚠。
- 每条 src 都对着存档里的原文写；查不到的一律没写。
