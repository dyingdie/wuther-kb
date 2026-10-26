// battle-terms —— 战斗状态 / 伤害类型侧的官方术语（瑝览类书官方术语档案）
// 全部出自官方接口 https://mc.yakitahome.com/api/terms 的 description 原文照抄，uid 写在各条 note
// 本地存档：source/yakitahome-terms.json（288 条，builtAt 2026-09-30，sourceVersion 3.7）
// 只收战斗状态 / 伤害类型 / 机制词；世界观名词（玄方城设施、养成槽位等）不往这页塞
// 库里已有的同名词条别重复建：聚爆/减益效果/阈限伤害/聚爆效应 在 combat.js，震谐与集谐（偏谐路线）在 teams.js
// 页面渲染预算：硬上限 8192 码点，目标 6000（src/note 不计入渲染体积）
export default [
  {
    id: "bt-zhenxie",
    t: "震谐",
    lvl: ["官"],
    def: "官方负面状态之一：持有者被攻击时，额外承受1×层数的效果伤害（3.7 收录）",
    ctx: "有人问「震谐」是什么状态、或问四种减益里有哪几种时",
    tabu: "同词两义：这条是 3.7 的负面状态，teams 页那个震谐指偏谐路线（与集谐、集谱同属那组词，官方技能文本写「集谱」）。绝不能说「震谐＝湮灭加导电」，它不是共鸣属性",
    rel: ["term-jianyi-effect", "term-zhenxie", "term-zhenxie-is-not-attr", "term-jubao"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853709（3.7版本）官方原文照抄：「受到攻击时，额外对持有者造成1*层数的效果伤害。」官方英文名 Tune Rupture。同批「减益效果」（853712）把它与聚爆、光噪、电磁并列成四种负面状态。"
  },
  {
    id: "bt-guangzao",
    t: "光噪",
    lvl: ["官"],
    def: "官方负面状态之一：每2秒掉25%的层数，持有者按掉的层数吃效果伤害（3.7 收录）",
    ctx: "问四种减益之一的光噪、或问「层数会自己掉」的减益时",
    tabu: "跟 3.6 的「异常·光噪」是两回事：那个按漂泊者攻击力百分比掉血，这个按掉层数结算。同音不同机制，别说混",
    rel: ["term-jianyi-effect", "bt-yichang-guangzao", "term-jubao"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853710（3.7版本）官方原文照抄：「每2秒减少25%的层数，持有者受到减少层数*100%的效果伤害。」官方英文名 Spectro Frazzle。⚠️英文名与 3.6「异常·光噪」（800042）几乎同名，机制完全不同。"
  },
  {
    id: "bt-dianci",
    t: "电磁",
    lvl: ["官"],
    def: "官方负面状态之一：每秒判定触发，触发时清空层数、暂停持有者一件武器的攻击间隔回复1秒，并造成2×层数效果伤害",
    ctx: "问四种减益里的电磁、或问「层数够了必定触发」那种状态时",
    tabu: "官方 uid 是 853711，853712 是「减益效果」，别把两个 uid 记反。触发时「清空层数」是原文，别改写成消耗一部分",
    rel: ["term-jianyi-effect", "bt-xiaoguo-damage", "term-jubao"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853711（3.7版本）官方原文照抄：「每秒检测一次，每层10%概率触发，层数≥10层时必定触发，触发时清空层数，使持有者随机1件武器的攻击间隔回复时间暂停1秒，并对持有者造成对应2*层数的效果伤害。」官方英文名 Electro Flare。⚠️档案里 853712 是「减益效果」不是电磁。"
  },
  {
    id: "bt-zengyi",
    t: "增益效果",
    lvl: ["官"],
    def: "官方正面状态的集合名：迅捷、吸血、反伤、精准、幸运五种（3.7 收录）",
    ctx: "有人问「增益效果」包括哪些、或问正面状态有几种时",
    tabu: "官方只列了五种，没给每种的层数上限、持续时间或获取方式，别自己补；反面那组叫「减益效果」，两组不是一回事",
    rel: ["bt-xunjie", "bt-xixue", "bt-fanshang", "bt-jingzhun", "bt-xingyun", "term-jianyi-effect"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853707（3.7版本）官方原文照抄：「包含迅捷、吸血、反伤、精准和幸运的五种正面状态的集合」官方英文名 Positive Effects。⚠️官方没写这五种属于哪个玩法，也没给层数上限。"
  },
  {
    id: "bt-xixue",
    t: "吸血",
    lvl: ["官"],
    def: "官方增益之一：每层在攻击时回复1%造成武器伤害的生命值，最多100层",
    ctx: "问吸血、问哪种增益能回血时",
    tabu: "官方只写「每层1%、最多100层」，没说怎么获得、能不能叠满；这是通用增益名，不是谁的技能名",
    rel: ["bt-zengyi", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853703（3.7版本）官方原文照抄：「每层在攻击时使自身回复1%造成武器伤害的生命值，最多100层。」官方英文名 Lifesteal。"
  },
  {
    id: "bt-fanshang",
    t: "反伤",
    lvl: ["官"],
    def: "官方增益之一：每层在受到武器攻击时对敌人造成1点效果伤害",
    ctx: "问反伤、问挨打之后回敬伤害的增益时",
    tabu: "官方写的是「1点」效果伤害，不是1%、也不按攻击力算；只对武器攻击生效，被别的伤害打不出",
    rel: ["bt-zengyi", "bt-xiaoguo-damage", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853704（3.7版本）官方原文照抄：「每层在受到武器攻击时对敌人造成1点效果伤害。」官方英文名 Counter。"
  },
  {
    id: "bt-jingzhun",
    t: "精准",
    lvl: ["官"],
    def: "官方增益之一：每层提升0.5%暴击率、1%暴击伤害；暴击伤害按武器伤害算，且只对武器生效",
    ctx: "问精准、问暴击类增益时",
    tabu: "官方明确「暴击伤害计算为武器伤害，只对武器生效」——别把它算进效果伤害那一类",
    rel: ["bt-zengyi", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853705（3.7版本）官方原文照抄：「每层提升0.5%暴击率，1%暴击伤害，暴击伤害计算为武器伤害，只对武器生效。」官方英文名 Precision。"
  },
  {
    id: "bt-xingyun",
    t: "幸运",
    lvl: ["官"],
    def: "官方增益之一：每1层在回合结束时得1枚「咩咩金币」",
    ctx: "问幸运、问咩咩金币怎么来时",
    tabu: "「回合结束」「咩咩金币」是官方原文用词；这套增益减益带回合制口吻，别整套套到共鸣者战斗上",
    rel: ["bt-zengyi"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853706（3.7版本）官方原文照抄：「每拥有1层幸运，回合结束时获得1「咩咩金币」。」官方英文名 Luck。⚠️官方术语档案没写这套「回合」是哪个玩法的回合。"
  },
  {
    id: "bt-xunjie",
    t: "迅捷",
    lvl: ["官"],
    def: "官方增益之一：每层提升1%武器攻击间隔回复速度，最多100层",
    ctx: "问迅捷、问攻击间隔回得快时",
    tabu: "是「攻击间隔回复速度」，不是攻击力、也不是攻速倍率，别说成后者",
    rel: ["bt-zengyi", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853702（3.7版本）官方原文照抄：「每层提升1%武器攻击间隔回复速度，最多100层。」官方英文名 Speed。"
  },
  {
    id: "bt-xiaoguo-damage",
    t: "效果伤害",
    lvl: ["官"],
    def: "官方伤害类型之一：通过异常状态造成的伤害（3.7 收录）",
    ctx: "有人问效果伤害、或问哪种伤害算效果伤害时",
    tabu: "官方中文写「异常状态」、英文原文写 Negative Effects（减益效果），两版口径不一致，别当官方已统一；它也不是阈限伤害",
    rel: ["bt-yichang", "term-jianyi-effect", "term-yuxian-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853714（3.7版本）官方原文照抄：「通过异常状态造成的伤害」官方英文名 Effect DMG，英文原文 Damage dealt through Negative Effects. ⚠️中英不一致：中文说「异常状态」，英文说「减益效果」。阈限伤害（800044）是另一种伤害类型，别混。"
  },
  {
    id: "bt-wuqiang-damage",
    t: "武器伤害",
    lvl: ["官"],
    def: "官方伤害类型之一：通过武器攻击造成的伤害（3.7 收录）",
    ctx: "问武器伤害、或问哪种伤害算武器伤害时",
    tabu: "只覆盖武器攻击造成的伤害；效果伤害、阈限伤害是另外两套，别并成一类",
    rel: ["bt-xiaoguo-damage", "term-yuxian-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853715（3.7版本）官方原文照抄：「通过武器攻击造成的伤害」官方英文名 Weapon DMG。"
  },
  {
    id: "bt-yichang",
    t: "异常",
    lvl: ["官"],
    def: "官方 3.6 的异常总称：包含「异常·光噪」「异常·撕裂」「异常·破甲」三种",
    ctx: "有人问「异常」是哪些、或问异常状态有几种时",
    tabu: "这是 3.6 的「异常」口径（三种），跟 3.7 的「减益效果」（四种：聚爆／震谐／光噪／电磁）不是一套，别合并；两套都含「光噪」，同名不同机制",
    rel: ["bt-yichang-guangzao", "bt-yichang-silie", "bt-yichang-pojia", "bt-xiaoguo-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800043（3.6版本）官方原文照抄：「包含「异常·光噪」、「异常·撕裂」和「异常·破甲」三种效果。」官方英文名 Affliction。⚠️官方没写这套「异常」与 3.7「减益效果」的关系，别自己圆。"
  },
  {
    id: "bt-yichang-guangzao",
    t: "异常·光噪",
    lvl: ["官"],
    def: "官方 3.6 异常之一：目标每层每秒吃漂泊者4%攻击力伤害，最多20层、持续10秒",
    ctx: "问 3.6 的异常·光噪、或问按攻击力百分比结算的异常时",
    tabu: "跟 3.7 减益组的光噪是两回事（那边按掉层数结算），官方英文名还几乎一样；也别拿「异常」当泛称乱套",
    rel: ["bt-yichang", "bt-guangzao", "person-danya"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800042（3.6版本）官方原文照抄：「目标身上每有一层「异常·光噪」，每秒受到漂泊者4%攻击的伤害，可叠加20层，持续10秒。」官方英文名 Affliction: Spectro Frazzle。⚠️英文后缀与 3.7「光噪」Spectro Frazzle 相同但机制不同。"
  },
  {
    id: "bt-yichang-silie",
    t: "异常·撕裂",
    lvl: ["官"],
    def: "官方 3.6 异常之一：叠到20层后，下次受伤时清空全部层数，每层折算漂泊者50%攻击力伤害",
    ctx: "问 3.6 的异常·撕裂、或问「层数满了才结算」的异常时",
    tabu: "官方没写能不能叠过20层；是「下次受到伤害时」才结算，不是叠满立刻爆，别说成即时",
    rel: ["bt-yichang", "person-danya"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800046（3.6版本）官方原文照抄：「目标身上的「异常·撕裂」叠加至20层时，在下次受到伤害时将移除所有撕裂层数，每移除一层造成相当于漂泊者50%攻击的伤害。」官方英文名 Affliction: Laceration。"
  },
  {
    id: "bt-yichang-pojia",
    t: "异常·破甲",
    lvl: ["官"],
    def: "官方 3.6 异常之一：目标防御降低2%，可叠20层、持续10秒",
    ctx: "问 3.6 的异常·破甲、或问降防的异常时",
    tabu: "降的是防御，不是抗性、不是伤害减免；官方只给2%每层、20层上限、10秒，别补别的",
    rel: ["bt-yichang", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800047（3.6版本）官方原文照抄：「目标防御降低2%，可叠加20层，持续10秒。」官方英文名 Affliction: Exposed。"
  },
  {
    id: "bt-nixing-skill",
    t: "拟形技能",
    lvl: ["官"],
    def: "官方 3.6 技能类型：短暂变身或召唤「共鸣因子」对应的角色施放其技能，变身期间自身受伤减半",
    ctx: "问拟形技能、问「变身成别人」那种技能时",
    tabu: "官方只说「共鸣因子对应的角色」、没点名是谁，也没说谁拥有；别跟达妮娅的「布景之形／幻灭之形」两形态混",
    rel: ["term-yuxian-damage", "danya-two-forms"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800041（3.6版本）官方原文照抄：「可短暂变身或召唤「共鸣因子」对应的角色， 并施放该角色的特殊技能。变身期间，自身受到的伤害降低50%。」（官方原文「角色」后面有一个空格，照抄保留）官方英文名 Morph Skill。"
  },
  {
    id: "bt-jianpo",
    t: "剑魄",
    lvl: ["官"],
    def: "官方 3.6 状态：伤害提升10%，可叠加99层、持续10秒",
    ctx: "问剑魄、问 3.6 那个叠99层的增伤时",
    tabu: "官方没写它怎么触发、属于谁；别当成达妮娅的共鸣链或天赋",
    rel: ["bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800057（3.6版本）官方原文照抄：「伤害提升10%，可叠加99层，持续10秒。」官方英文名 Sword Spirit。"
  },
  {
    id: "bt-benming-jianyi",
    t: "本命剑意",
    lvl: ["官"],
    def: "官方 3.6 词条：清宵分出的一缕特殊剑意频率，凝聚她最本质、最纯粹的共鸣力",
    ctx: "问本命剑意、问清宵那缕剑意时",
    tabu: "官方只说来源是清宵、性质是剑意频率；这是清宵的词条不是达妮娅的，也别跟「剑魄」混",
    rel: ["chars-清宵", "roles2-qingxiao"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800055（3.6版本）官方原文照抄：「清宵所分出的一缕特殊的剑意频率，凝聚了她最为本质、最为纯粹的共鸣力。」官方英文名 Lifebound Sword Intent。⚠️这是清宵（瑝珑剑仙）的词条，别安到达妮娅身上。"
  },
  {
    id: "bt-weishe",
    t: "威慑",
    lvl: ["官"],
    def: "官方 3.6 触发状态：当前生命不低于60%时可触发特殊效果",
    ctx: "问威慑、问「血量到线就触发」那类状态时",
    tabu: "官方只写「可触发特殊效果」，没写触发什么、也没写它属于谁，别补数值别补归属",
    rel: ["bt-jianyi"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800036（3.6版本）官方原文照抄：「当前生命不低于60%时可触发特殊效果。」官方英文名 Dominance。"
  },
  {
    id: "bt-jianyi",
    t: "坚毅",
    lvl: ["官"],
    def: "官方 3.6 触发状态：当前生命不高于50%时可触发特殊效果",
    ctx: "问坚毅、问「残血才触发」那类状态时",
    tabu: "跟「威慑」（生命不低于60%）是两条不同触发线，别混成一条；官方同样没写触发内容",
    rel: ["bt-weishe"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800037（3.6版本）官方原文照抄：「当前生命不高于50%时可触发特殊效果。」官方英文名 Grit。"
  },
  {
    id: "bt-niren",
    t: "逆刃",
    lvl: ["官"],
    def: "官方 3.6 增益：攻击提升1.5%，可叠加20层、持续10秒",
    ctx: "问逆刃、问 3.6 那个小百分比攻击增益时",
    tabu: "提升的是攻击不是伤害，别混；官方没写它跟谁绑定、怎么获得",
    rel: ["bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800038（3.6版本）官方原文照抄：「攻击提升1.5%，可叠加20层，持续10秒。」官方英文名 Reverse Edge。"
  },
  {
    id: "bt-zhaojia",
    t: "招架",
    lvl: ["官"],
    def: "官方 3.6 状态：自身即将受到伤害时，短时间内自身受到的伤害降低",
    ctx: "问招架、问「挨打前一瞬减伤」时",
    tabu: "官方只写「降低」没写降多少、也没写持续多久；别跟社区与 wiki 口径的闪避反击、逆势回击（弹刀）混成同一条",
    rel: ["combat-parry", "bt-wuqiang-damage"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800040（3.6版本）官方原文照抄：「自身即将受到伤害时，使自身短时间内受到的伤害降低。」官方英文名 Parry。combat 页的「闪避反击 / 逆势回击」是 wiki 与社区口径的招式名，不是这条官方状态。"
  },
  {
    id: "bt-jianmie",
    t: "歼灭",
    lvl: ["官"],
    def: "官方 3.6 状态：消灭敌人时可触发特殊效果",
    ctx: "问歼灭、问「打死敌人就触发」那类状态时",
    tabu: "官方只写「消灭敌人时可触发特殊效果」，没说触发什么、谁带、怎么获得；跟「受击」是两条不同触发线，别混",
    rel: ["bt-shouji", "bt-weishe"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800039（3.6版本）官方原文照抄：「消灭敌人时可触发特殊效果。」官方英文名 Kill。"
  },
  {
    id: "bt-shouji",
    t: "受击",
    lvl: ["官"],
    def: "官方 3.6 状态：受到攻击时可触发特殊效果",
    ctx: "问受击、问「挨打就触发」那类状态时",
    tabu: "官方只写「受到攻击时可触发特殊效果」，没说触发什么、谁带；跟「招架」（降低所受伤害）不是一回事",
    rel: ["bt-jianmie", "bt-zhaojia"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800045（3.6版本）官方原文照抄：「受到攻击时可触发特殊效果。」官方英文名 Taking Hits。"
  },
  {
    id: "bt-yangbian-yinhe",
    t: "阳变阴合",
    lvl: ["官"],
    def: "景燃的机制：按生命上限换额外攻击，官方数值留的是占位符",
    ctx: "问「阳变阴合是什么」「景燃按血条加攻击」时",
    tabu: "官方原文里的 {0}{1}{2} 是官方占位符，官方没给具体数字，别自己填；它是景燃一个人的机制，不是通用战斗规则",
    rel: ["chars-景燃", "roles-景燃"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:121205（3.6版本）官方原文照抄：「景燃基于生命上限获得额外攻击：景燃每{0}点生命上限获得{1}点攻击，上限{2}。」官方英文名 Yang Changes, Yin Unites。"
  },
  {
    id: "bt-xin-modal",
    t: "共鸣模态·同奏与·电磁",
    lvl: ["官"],
    def: "心（3.7 导电）的两条战斗模态：同奏吃队友变奏，电磁吃电磁爆发换来的霆心域输出",
    ctx: "问「心怎么打」「同奏还是电磁」「应世相照世相是什么」时",
    tabu: "官方技能名是「共鸣模态·同奏」「共鸣模态·电磁」；社区说「同奏版／电磁版」；应世相、照世相是心在模态下的招式名，不是模态名，别说反；响应同奏在联机状态下不生效，替她算配队别忘了这条",
    rel: ["roles2-心", "bt-tingxinyu", "bt-dianci-baofa", "combat-varso-pair"],
    src: ["https://wuwa.huijiwiki.com/wiki/心/技能详情", "source/wiki-心-技能详情-2026-10-24.txt"],
    note: "官方技能文本原文（wiki 心/技能详情，2026-10-24 抓，存档 source/wiki-心-技能详情-2026-10-24.txt）：「共鸣模态·同奏：处于共鸣模态·同奏时，获得以下效果：心拥有响应同奏的能力，该效果联机状态下不会生效……」「共鸣模态·电磁：处于共鸣模态·电磁时，获得以下效果：心进入战斗状态时，一定范围内的目标电磁效应每次触发时不再减少层数……」延奏技能「身作千灯」：同奏模态下队伍中除心之外的角色获得同奏时将获得灯同辉，心施放延奏技能后拥有灯同辉的角色全伤害加深20%，持续30秒；电磁模态下队伍中除心之外的角色导电伤害加深20%，持续20秒。社区叫法见 jargon 的 j-xinbing（心配队）。"
  },
  {
    id: "bt-tingxinyu",
    t: "霆心域",
    lvl: ["官"],
    def: "心在电磁模态下的输出层数：队友给目标每叠一层电磁爆发，心就长一层霆心域，上限一百层",
    ctx: "问「霆心域」是什么、心的伤害为什么突然涨起来时",
    tabu: "心一切模态霆心域就被清掉；满五十层才让照世相的共鸣技能能停滞周围目标；真正打多少看目标身上电磁效应的层数，别当成心自己的攻击力",
    rel: ["bt-dianci-baofa", "bt-xin-modal", "roles2-心"],
    src: ["https://wuwa.huijiwiki.com/wiki/心/技能详情", "source/wiki-心-技能详情-2026-10-24.txt"],
    note: "官方原文照抄：「队伍中的角色为目标添加电磁爆发后，每添加1层电磁爆发使心获得1层霆心域，可叠加100层，并消耗目标全部的电磁爆发层数。心切换模态时移除霆心域。」「心拥有至少50层霆心域时，施放共鸣技能·照世相期间停滞周围目标。」共鸣链「授以舟楫渡潮生」还写：处于共鸣模态·电磁时，心进入战斗状态时若霆心域层数不足50层则增加至50层，每12秒可触发一次。"
  },
  {
    id: "bt-dianci-baofa",
    t: "电磁爆发与电磁效应",
    lvl: ["官"],
    def: "队友往目标身上叠的两个3.7状态：电磁爆发给心换霆心域，电磁效应触发时造成电伤",
    ctx: "问「电磁爆发」「电磁效应」是什么、跟那个减益「电磁」有啥分别时",
    tabu: "跟3.7减益状态「电磁」（bt-dianci）完全不是一回事，别说混；电磁效应本身的伤害倍率不在心这条技能文本里写，别自己填数字；攻略说的加成25%、上限16层那些是攻略口径，官方文本里没有这些数",
    rel: ["bt-dianci", "bt-tingxinyu", "bt-xin-modal", "roles2-心"],
    src: ["https://wuwa.huijiwiki.com/wiki/心/技能详情", "source/wiki-心-技能详情-2026-10-24.txt", "https://www.taptap.cn/moment/854680763013009342"],
    note: "官方原文照抄：「施放共鸣解放·转相后，为附近一定范围内的目标附加5层电磁效应」「共鸣技能·踏月归心最后一段攻击时，心将主动触发一次电磁效应伤害，伤害倍率为35%自身霆心域层数目标当前电磁效应的层数对应的电磁效应伤害倍率」（共鸣链提升至42%）；共鸣链「溪山深处留归梦」：「共鸣解放·万阙垂天最后一段命中具有电磁效应的目标时，主动触发一次电磁效应伤害，伤害倍率为1500%*目标当前电磁效应的层数对应的电磁效应伤害倍率」；共鸣链「浮灯照水藏微愿」：队友给目标附加电磁效应、电磁爆发，或队友获得同奏、响应同奏时，使队伍中所有角色全属性伤害加成提升20%，持续30秒。⚠️3.7官方减益术语里另有一条「电磁」（uid 853711），别和这两个混。"
  },
  {
    id: "bt-xingxing",
    t: "星星",
    lvl: ["官"],
    def: "武器/物品上的加成位：星星位置放上指定种类的物品，星星所属武器或物品的效果会变强（3.7 收录）",
    ctx: "问「星星是什么」「道具栏里那个星星位」时",
    tabu: "官方就这一句：星星怎么获得、有几个位置、放几件、叠多少上限都没写；它不是共鸣属性，也不是武器词条，别混",
    rel: [],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853701（3.7版本）官方原文：「当星星位置有指定种类的物品时，星星所属武器/物品的效果会得到提升」官方英文名 Star，日文 星。｜ ⚠️ 这条严格说属于道具/武器系统词，terms-official 页更贴切；本轮先收在 battle-terms，Lead 若要挪页可连 id 一起搬。"
  },
  {
    id: "bt-leibie",
    t: "类别",
    lvl: ["官"],
    def: "官方道具与武器条目里那一栏「类别」：写这件东西属于哪一类（3.7 收录）",
    ctx: "问「道具栏那个类别是什么意思」「道具条目上那栏是什么」时",
    tabu: "官方只给了一句定义，没列具体有哪几类、分类依据是什么；别自己编一套分类表，也别跟共鸣属性那套六色搞混",
    rel: [],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:853716（3.7版本）官方原文：「道具或武器所属的种类」官方英文名 Type，日文 種類。｜ ⚠️ 与 853701「星星」同属道具/武器条目字段，严格说更适合 terms-official 页；Lead 若要挪页可连 id 一起搬。"
  }
]
