# 官方战斗词页（battle-terms.js）交付说明

- 日期：2026-10-24　执行：glosser（task-20）
- 源：官方术语档案 `kb/source/yakitahome-terms.json`（288 条，builtAt 2026-09-30，sourceVersion 3.7），接口 `https://mc.yakitahome.com/api/terms`
- 产出：`kb/src/entries/battle-terms.js`，**22 条**，全部 `lvl: ['官']`、0 条【待】、每条 `src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json']`
- 页面体积：**全版 3880 码点**（目标 6000、硬顶 8192；note 与 src 不进渲染页）。def 最长 54 码点，无一条超 80。
- 逐字核对：22 条 note 里引的官方 description 与档案 **22/22 逐字命中**，版本号与官方英文名 **22/22 命中**（脚本按 uid 从档案比对，非手抄）

## 一、清单（id / 词 / uid / 版本 / 官方英文名）

| id | 词 | uid | 版本 | 官方英文名 |
| --- | --- | --- | --- | --- |
| bt-zhenxie | 震谐 | 853709 | 3.7 | Tune Rupture |
| bt-guangzao | 光噪 | 853710 | 3.7 | Spectro Frazzle |
| bt-dianci | 电磁 | 853711 | 3.7 | Electro Flare |
| bt-zengyi | 增益效果 | 853707 | 3.7 | Positive Effects |
| bt-xixue | 吸血 | 853703 | 3.7 | Lifesteal |
| bt-fanshang | 反伤 | 853704 | 3.7 | Counter |
| bt-jingzhun | 精准 | 853705 | 3.7 | Precision |
| bt-xingyun | 幸运 | 853706 | 3.7 | Luck |
| bt-xunjie | 迅捷 | 853702 | 3.7 | Speed |
| bt-xiaoguo-damage | 效果伤害 | 853714 | 3.7 | Effect DMG |
| bt-wuqiang-damage | 武器伤害 | 853715 | 3.7 | Weapon DMG |
| bt-yichang | 异常 | 800043 | 3.6 | Affliction |
| bt-yichang-guangzao | 异常·光噪 | 800042 | 3.6 | Affliction: Spectro Frazzle |
| bt-yichang-silie | 异常·撕裂 | 800046 | 3.6 | Affliction: Laceration |
| bt-yichang-pojia | 异常·破甲 | 800047 | 3.6 | Affliction: Exposed |
| bt-nixing-skill | 拟形技能 | 800041 | 3.6 | Morph Skill |
| bt-jianpo | 剑魄 | 800057 | 3.6 | Sword Spirit |
| bt-benming-jianyi | 本命剑意 | 800055 | 3.6 | Lifebound Sword Intent |
| bt-weishe | 威慑 | 800036 | 3.6 | Dominance |
| bt-jianyi | 坚毅 | 800037 | 3.6 | Grit |
| bt-niren | 逆刃 | 800038 | 3.6 | Reverse Edge |
| bt-zhaojia | 招架 | 800040 | 3.6 | Parry |

## 二、派工清单里的一处更正

派工写「电磁 853712？」—— **电磁是 853711**；**853712 是「减益效果」**（Negative Effects，description 原文：「包含聚爆、震谐、光噪和电磁四种负面状态的集合」）。已在 `bt-dianci` 的 note 与 tabu 里写明「官方 uid 是 853711，853712 是减益效果，别记反」。
因为 853712 的 `t`「减益效果」与 combat.js/term-jianyi-effect 撞名，本页**不建**减益效果，改为在 bt-zhenxie/bt-guangzao/bt-dianci 的 rel 里指向既有条目。

## 三、没建的条目及原因

| 官方词 | uid | 为什么不建 |
| --- | --- | --- |
| 聚爆 | 853708 | **t 撞名**：combat.js/term-jubao 已建（t「聚爆」），teams.js/term-jubao-effect 已建「聚爆效应」。官方定义已在 combat 页 |
| 减益效果 | 853712 | **t 撞名**：combat.js/term-jianyi-effect 已建（t「减益效果」） |
| 阈限伤害 | 800044 | **t 撞名**：combat.js/term-yuxian-damage 已建 |
| 歼灭 | 800039 | 官方 description 只有一句「消灭敌人时可触发特殊效果」，信息量最低，页面容量留给更硬的条目；可随时补 |
| 受击 | 800045 | 同上，官方 description 只有「受到攻击时可触发特殊效果」 |
| 凌空栈 | 800048 | 玄方城飞舟码头，世界观地点名，不是战斗状态/机制词 → 归 world 页 |
| 护玄屏 | 800049 | 玄方城防壁，同上 |
| 玄元境 | 800051 | 玄方城数据空间，同上 |
| 梦枢天罗 | 852009 | 玄方城控制中枢，同上 |
| 星星 | 853701 | 武器/物品槽位强化，养成向名词 |
| 涡心 | 800035 | 暗面异变机制，terms.js/term-dark-side 已覆盖 |

派工里说「异常/光噪/震谐 极可能已有或别名撞名」—— 实测：全库 t+alias 扫过（带「」与不带「」两形都查），**本页 22 个词全空闲**，没有撞名，也没退让改 alias。唯一两个真撞名是聚爆与减益效果（见上）。

## 四、官方原文里没交代的点（都写进了 tabu，没替官方圆）

1. **震谐 / 集谐 / 集谱 同词两义**：官方 3.7 的「震谐」是**负面状态**（Tune Rupture），teams 页那个「震谐」指**偏谐路线**（与集谐、集谱同属那组词，官方技能文本写「集谱」）。bt-zhenxie 的 tabu 明写这两义不同源，并钉死「绝不能说震谐＝湮灭加导电，它不是共鸣属性」（teams.js/term-zhenxie-is-not-attr 同义）。
2. **3.6「异常」与 3.7「减益效果」官方没写关系**：3.6 异常三种（光噪/撕裂/破甲），3.7 减益四种（聚爆/震谐/光噪/电磁）。两套都含「光噪」，但机制不同（3.7 按掉层数结算，3.6 按漂泊者攻击力百分比），英文名还几乎一样（Spectro Frazzle）。bt-yichang / bt-guangzao / bt-yichang-guangzao 三条互相 rel 并各自标 ⚠️。
3. **效果伤害中英不一致**：853714 中文「通过异常状态造成的伤害」，英文原文 Damage dealt through Negative Effects（=减益效果）。照抄两边，没替官方统一。
4. **增益效果五种没给上限/持续时间/获取方式**；幸运那条的「回合结束」「咩咩金币」官方没说属于哪个玩法 —— bt-zengyi / bt-xingyun 已标。
5. **「威慑 / 坚毅 / 逆刃」官方只写「可触发特殊效果」「提升1.5%攻击」**，没说属于谁、怎么获得 —— 都没补。
6. **拟形技能只说「共鸣因子对应的角色」**，没点名是谁；wiki 的达妮娅/技能详情页全文没有拟形/共鸣因子/阈限/剑魄字样，所以这一条只能靠官方档案，wiki 补不了。bt-nixing-skill 的 rel 指 combat.js/term-yuxian-damage（库内唯一提「共鸣因子」的条目）。
7. **招架**（官方 Parry）与 combat.js/combat-parry 的「闪避反击 / 逆势回击」是不同东西，bt-zhaojia 的 tabu 说明了；官方也没给降低多少、持续多久。
8. **本命剑意是清宵（瑝珑剑仙）的词条**，官方 description 明写「清宵所分出的一缕特殊的剑意频率」——别安到达妮娅身上，bt-benming-jianyi 已标注并 rel 到 chars-清宵。

## 五、lint

`node build.mjs --check`：**exit 0**，「✓ lint 通过（16 条提示）」，条目合计 693、其中【待】9 条不入正式页。
16 条提示**全是既有的**（14 条跨页别称同名 + nick-president 别称「会长」与 person/rel-nabomo 撞 + chars-npc 页面 7241 码点），**本页 0 条新增 ⚠**、0 条 error。

meta.js 由 lead 改，已登记（lead 加的）：
```js
{ file: 'battle-terms', title: '官方战斗词',   desc: '官方术语档案原文：震谐、光噪、电磁、异常、增益、吸血反伤等战斗状态与伤害类型' },
```
ROUTES 也加了一条：`['震谐 / 光噪 / 电磁是什么 / 减益效果有几种', 'battle-terms']`。

体积（按 build.mjs:116-138 渲染口径复刻）：**全版 3880 码点 / 精简版 2438 码点**（目标 6000、硬顶 8192）。
