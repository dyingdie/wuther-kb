# lore-terms —— 官方新世界观专有名词页（3.5 / 3.6 / 3.7）

新页面：`kb/src/entries/lore-terms.js`，22 条，全部 `lvl: ['官']`。
出处统一为官方术语档案接口 `https://mc.yakitahome.com/api/terms`（本地快照 `source/yakitahome-terms.json`，builtAt 2026-09-30T17:17:20+00:00，sourceVersion 3.7，288 条）。
每条 note 逐字抄官方 description，并记 uid、版本号、官方英文名（英文名取接口 `i18n.title.en`，快照文件里没有 i18n，英文名是现查的）。

口径：官方原文照抄不改写；官方没交代的地方（谁造的、怎么用、什么时候、归谁管）一律写进 tabu，不替官方圆。
别称只在官方原文里真出现才加：本页只加了一个 —— 梦枢天罗的「万相神宫」（官方原句「亦被称为「万相神宫」」）。

## 一、已建 22 条清单

| id | t | uid | 版本 | 官方英文名 | 关联 |
|---|---|---|---|---|---|
| lore-jiolong | 咎笼 | 750044 | 3.5 | Censure Cage | 咎庭 / 悬天构 / 玄方城 |
| lore-jiuting | 咎庭 | 750045 | 3.5 | Censure Court | 咎笼 / 玄方城 |
| lore-houxuan-sanji | 后玄三骑 | 750046 | 3.5 | Xuan Triad | 定玄卫 / 后玄骑使 |
| lore-houxuan-qishi | 后玄骑使 | 750047 | 3.5 | Xuan Watchers | 后玄三骑 |
| lore-waishifu | 外事府 | 750048 | 3.5 | Ministry of Foreign Affairs | — |
| lore-xuantiangou | 悬天构 | 750050 | 3.5 | Skyworks | 咎笼 / 玄方城 |
| lore-liangyuan | 梁鸢 | 750051 | 3.5 | Rafter Kite | 玄翎雀 |
| lore-yuancheng | 渊城 | 750052 | 3.5 | Yuan Fortress | 云渊之役 / 琢钧堂 / 玄方城 |
| lore-yunyuan-zhiyi | 云渊之役 | 750053 | 3.5 | Fortress and Gorges War | 渊城 / 今州 / 玄方城 |
| lore-xuanlingque | 玄翎雀 | 750054 | 3.5 | Xuanling Bird | 梁鸢 / 云渊之役 |
| lore-liuxi | 流息 | 750055 | 3.5 | The Streams | 秧秧 |
| lore-sisheng-zhiren | 祀声之人 | 750056 | 3.5 | Votary of the Voice | 秧秧 |
| lore-yanshi | 偃师 | 750058 | 3.5 | Dollmaker | 归魂互助会 / 吟霖 |
| lore-sujing | 宿镜 | 750059 | 3.5 | Prism of Fate | 心域 |
| lore-mengshu-tianluo | 梦枢天罗 | 852009 | 3.7 | Simulacrum Nexus of Mengzhou | 心钥井 / 心域 / 玄方城 |
| lore-xinyinjing | 心钥井 | 852010 | 3.7 | Inner Threshold | 梦枢天罗 / 心域 |
| lore-jinmiaosuo | 锦妙锁 | 852011 | 3.7 | Providence Lock | 谛天鉴 |
| lore-xinyu | 心域 | 852012 | 3.7 | Heart Realm | 梦枢天罗 / 宿镜 / 心钥井 |
| lore-chaoyuehui | 朝月会 | 852014 | 3.7 | Waking Moon Festival | 梦州 |
| lore-tianluo-huying | 天罗狐影 | 852015 | 3.7 | Nexus Fox Shadow | 梦枢天罗 |
| lore-jianshui-duo | 渐水舵 | 800056 | 3.6 | Jianshui Branch | 琢钧堂 / 梦州 |
| lore-shannao-yao | 山猫妖 | 800054 | 3.6 | Lynx Spirit | 景燃 |

没建的指定词：**定玄卫、归魂互助会、禁锁十契、岐路司、诺维尔再生医药、浮光林、引日殿、苇原**（全库已有同名词条，见第三节）。
uid 750049（定玄卫）、750057（归魂互助会）、852013（禁锁十契）不在本页，但在第三节里给了回填建议。

## 二、版本更早的官方词：为什么不建

指定清单里 3.0 / 3.1 / 2.8 / 3.4 / 3.2 那批，属于旧版本内容，且多数已有别的页在写，本页主题是 3.5/3.6/3.7 专有名词，硬塞进来会把「这一页讲新版世界观」这条线搅浑。

| t | uid | 版本 | 官方英文名 | 不建的原因 / 建议落点 |
|---|---|---|---|---|
| 玄方地界 | 270001 | 2.8 | Land of Xuanfang | 地域词，建议回填进 world-xuanfang（玄方城）的 note（官方：「位于梦州与今州之间的一部分地域，是由今州进入梦州的必经之地，也是昔日阻击残象的关隘。」） |
| 海维夏 | 700013 | 3.0 | Hyvatia | 炉芯监测仪器，属 terms-official 口径，本页不收 |
| 日髓 | 750042 | 3.1 | Ichor | 药物，属 terms-official / items 口径 |
| 雪绒海豹 | 750041 | 3.1 | Snowfluff Seal | 生态生物，memes 页已有「雪豹」梗条目，别再立词 |
| 联运椎骨 | 700011 | 3.0 | Starward Riseway | 罗伊冰原交通，属 world 口径（world 已有「罗伊冰原」「冰原地表」） |
| 虹音塔 | 851064 | 2.8 | Neon Tower | 穗波市地标，world-extra 已有「时隙废都（穗波市）」 |
| 虹晶 | 851068 | 2.8 | Irideglow Crystal | 虹光侵蚀物，terms 页有「虹光」，建议并进去 |
| 波仔 | 851072 | 2.8 | Namipon | allusions 页有「极道波仔 / 穗波之龙」，memes 页有梗条目 |
| 迷途波仔 | 851073 | 2.8 | Missing Namipons | 同上；官方原文是波仔频率被悲鸣撕裂后的分化个体 |
| 夜之城 | 852006 | 3.4 | Night City | versions 页已有「3.4 心之集域·夜之城」 |
| 涡心 | 800035 | 3.2 | Vortex's Eye | 暗面异变的说法，terms 页有「暗面」，建议并进去 |
| 浮光林 / 引日殿 / 苇原 / 诺维尔再生医药 / 岐路司 | — | — | — | t 撞名，见第三节 |

## 三、t 撞名清单（这 8 条没重复建，官方 uid 建议回填）

回填格式照本页 note 的写法：`uid:750049（3.5版本）官方原文：「…」英文原名 Xuanfang Wardens。`

| t | uid | 版本 | 官方英文名 | 已存在的条目 | 与官方原文的出入（要 lead 拍板是否改） |
|---|---|---|---|---|---|
| 定玄卫 | 750049 | 3.5 | Xuanfang Wardens | factions.js / org-定玄卫（alias 已含英文名） | 官方只说「隶属于玄方地界的守城士兵被称为「定玄卫」」；现有 def 里的「梦州边庭设」「最后一道屏障」「定玄卫长是秋鸿」是 wiki 说法，官方没讲。现有 def 说后玄三骑「专对付强残象」，官方原文是「专用于解决一般定玄卫难以处理的问题」——口径不同，建议按官方改。 |
| 归魂互助会 | 750057 | 3.5 | The Séance Society | factions.js / org-归魂互助会（alias 已含英文名） | 官方：「曾在今州活动的一个犯罪组织，借由能让人看到已故家人的宣传口号…如今已经覆灭」。现有 def 是「按家属记忆做成人偶…给残星会提供能诱发超频的归魂人偶」（wiki 说法，官方没提人偶和残星会）。官方明确「已覆灭」，现有 def 没写结局。 |
| 禁锁十契 | 852013 | 3.7 | Ten Seals Covenant | factions.js / org-禁锁十契（lvl ['考']） | **现有 def 有三处与官方用字不同**：写的是「住在华庭的「恶憩」锁衿」，官方是「家乡华亭的「恶瘴」」「锁暝」。人数「其余九人都已牺牲」与官方「除锁暝外其余成员均已牺牲…手下一至九契的频率存入锁中」对得上。lvl 可以从 ['考'] 升 ['官']。 |
| 岐路司 | 852007 | 3.4 | Kiroshi | factions.js / org-岐路司（alias 已含英文名） | 现有 def 与官方基本一致（专精光学义眼、大家拿它泛指所有眼部义体）。只缺 uid 与 note。 |
| 诺维尔再生医药 | 750043 | 3.1 | Novialle Regenerative Group | factions.js / org-诺维尔再生医药（alias 已含英文名） | 官方：「扎根于新联邦的中小型医药集团，其核心技术源于一种被称为"日髓"的特殊药物——既被视为突破性的成果，也始终伴随着争议与审视」。现有 def 里的「所有者是陆·赫斯的养父埃尔温·赫斯」是 wiki 说法，官方没讲；「外号黄金血」官方也没说。 |
| 浮光林 | 700021 | 3.0 | Bjartr Woods | world.js / world-fuguanglin | **官方原文能解掉现有 note 里那个 ⚠️ 未核**：「整片土地沐浴于炉芯的光辉之中，不受虚质磁暴侵扰」——官方说的就是浮光林本身不受虚质磁暴侵扰（不是「罗伊符文」）。现有 def 因此可以补回这句。 |
| 引日殿 | 700018 | 3.0 | Solisylum | world.js / world-yinridian | 官方：「罗伊族的圣地，秘日六席的所在之处。不仅承担着保管**隧者零件**的职责，也是属于罗伊人的数据与记录的集散中心。」现有 note 写的是「保管隧群部件」——官方用词是「隧者零件」，可按官方统一。 |
| 苇原 | 851074 | 2.8 | Ashinohara | world.js / world-weiyuan | 官方比 wiki 全得多：「穗波市所属的国度，尽管海蚀现象频发，仍有着繁荣的都市文明，内部建立起了发达的轨道交通网。」现有 def 只说「wiki 只留了这一句名字」，回填后可以补上「穗波市所属的国度」和轨道交通网。 |

## 四、几处值得记一笔的发现

1. **咎笼与咎庭的官方 description 完全相同**（同一段话），uid 不同：750044 / 750045。两条 note 里互相标了。
2. **官方原文只有一句话的**：后玄骑使（一句）、偃师（一句）、祀声之人（一句）、宿镜（一句）、云渊之役之外的多数都是两三句。凡官方短的，本页 tabu 里都写明「官方没交代什么」，别替它扩写。
3. **朝月会官方写的是「一说是起源于纪念神狐拯救梦州的传说」** —— 官方自己标了「一说」，是民间说法之一，别当定论。
4. **流息是秧秧的能力相关词**（官方：「秧秧自幼觉醒共鸣力后，所能感知并解读的一种特殊气流」），所以本页把它 rel 到 chars-秧秧，而不是当普通术语。
5. **天罗狐影**官方说是岁主心月狐「法相之一」，所以本页 tabu 写明别把别的法相塞进来。
6. 官方术语表里**没有**逆境深塔 / 终焉矩阵 / 冥歌海墟 / 全息战略（与 wiki 红链一致），本页也不会有。

## 五、体积与 lint

- 页面：22 条，**3489 码点**（lite 2325），目标 6000 / 硬顶 8192 —— 达标，离上限很远。
- 全库 lint（把本页临时登记进 PAGES 后跑的）：✓ lint 通过，**0 error**，16 条 ⚠ 全是库里的旧提示（15 条别称撞词条名 + chars-npc 7241 码点接近上限），本页 **0 条新增 ⚠**。条目合计 647、【待】9。
- def 全部 ≤80 码点，没有一条触发「def 超过 80 码点」。
- 在 kb/ 原目录跑 `node build.mjs --check` 现在会有一条错：`✗ [lore-terms] src/entries 里的板块在 PAGES 里没登记` —— 因为 meta.js 是 lead 改、我没碰。**lead 在 meta.js 的 PAGES 里加一行就消**：

```js
  { file: 'lore-terms', title: '官方新名词', desc: '官方术语档案里 3.5/3.6/3.7 三版新增的世界观专有名词' },
```

（加在 `versions` 那行后面即可。ROUTES 里也可以补一条 `['官方新世界观专有名词 / 咎笼、心域、朝月会', 'lore-terms']`，由 lead 定。）
- 本页 src 两个都填了：`https://mc.yakitahome.com/api/terms`（接口）与 `source/yakitahome-terms.json`（本地快照，build 的本地出处校验会检查它存在）。

## 六、拿不准的地方

1. **玄方地界（270001）没建**，它是 3.5 那批词的地名底座（咎笼/咎庭/悬天构的原文都提到「玄方地界」）。我按「地域词归 world 口径」处理，让 lead 决定是回填 world-xuanfang 的 note，还是单独立一条。
2. **玄方城（world-xuanfang）没有官方同名术语**，官方只有「玄方地界」；本页的咎庭/咎笼/悬天构/梦枢天罗都 rel 到了 world-xuanfang。
3. **归魂互助会、诺维尔再生医药、定玄卫、浮光林、引日殿、苇原这几条现有 def 与官方出入不小**（见第三节）。我只写了建议，没改别人的条目 —— 要不要照官方改，是 lead 的活。
4. **官方英文名只有接口里有**，本地快照 `source/yakitahome-terms.json` 不带 i18n。英文名是我现查接口拿的；若接口以后不可用，回填建议里的英文名仍可用（已抄在本报告里）。
5. 本页 def 是照官方原文的浓缩表述（官方原句整段在 note 里），不是逐字复制 —— 一页放 22 条整段原文会超体积。要逐字版可以改成拆两页。
