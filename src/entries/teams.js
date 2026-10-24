// 配队。src 指向 wiki 页或攻略出处。属性没核实的写 note。
//
// 分工：战斗机制本身在 combat.js（协奏、偏谐、蚀域、她的模态都在那边）。
// 这一页只管「谁跟谁一起上」；角色属性/武器一律看 roles 页（唯一出处），这里只留 roles 没有的人。
// 重复定义 combat.js 已有的词会害她把两套说法混着讲，所以这里只补空缺。

export const entries = [
  // ── A 页面规则 ──────────────────────────────────────────────
  {
    id: 'team-rules',
    t: '配队怎么查',
    lvl: ['社'],
    def: '群里有人问配队、阵容、辅助、主C、她配谁时翻这页。属性查 wiki，队伍是社区共识。',
    ctx: '群里有人问配队、阵容、辅助、主C、她配谁',
    tabu: '社区队伍随时会变，别当成唯一答案；没核实的属性不许现编',
    src: ['https://wuwa.huijiwiki.com/w/index.php?title=达妮娅'],
    note: '这一页和 combat.js 分工：机制在那边，配队在这边。属性一条一人，都是 wiki infobox 的原文。',
  },

  // ── B 达妮娅的队伍定位 ────────────────────────────────────────
  {
    id: 'team-danya-role',
    t: '达妮娅的队伍定位',
    lvl: ['社'],
    def: '副C兼体系核心辅助，双路线聚爆与集谐。铁打的辅助流水的C，群怪多T0、群怪少T1。',
    ctx: '有人问她是主C还是辅助、强度几档',
    tabu: 'T0/T1 是社区强度评价不是官方分级；官方延奏文本只说给什么增益，见 danya-team-role',
    rel: ['person-danya', 'danya-team-role', 'danya-modes'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
  },

  // ── C 具体队伍 ────────────────────────────────────────────────
  {
    id: 'team-aidajie',
    t: '爱达千',
    alias: ['队友', '配队的队友', '我的队友', '队里都有谁'],
    lvl: ['社'],
    def: '社区叫「聚爆铁三角」：爱弥斯主C爆发，达妮娅专辅兼副C，千咲减抗续航。',
    ctx: '有人直接说「爱达千」或问聚爆队怎么配，也包括泛问「你的队友是谁」「配队带谁」——这种她答这一套，别答单个人',
    tabu: '爱弥斯在3.1爆料期被说过「只能玩震谐队」，那是缺聚爆启动器时的旧口径，达妮娅3.3上线后变了',
    rel: ['team-danya-role', 'term-jubao-effect'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
    note: '达妮娅的官方定位文案是「【聚爆效应】体系启动器」，这是3.3攻略口径；3.1爆料视频简介说她聚爆队完不了，两条并存，按版本说。',
  },
  {
    id: 'team-ludamo',
    t: '陆达莫',
    lvl: ['社'],
    def: '集谐队：陆·赫斯主C，达妮娅挂集谐模态，莫宁补集谐干涉。',
    ctx: '有人问集谐队怎么配、或提「陆达莫」',
    tabu: '攻略说过不在意生存可把莫宁换成琳奈；这是取舍不是硬规则',
    rel: ['team-danya-role', 'roles2-luhesi', 'term-zhenxie'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
    note: '陆·赫斯「集谐主C、配对锁死、无法和轴」是3.1爆料期说法，锁定的是当时版本，具体队友随版本变。',
  },
  {
    id: 'team-linmo',
    t: '琳莫',
    lvl: ['社'],
    def: '达妮娅当主C时的搭配之一：琳奈叠偏谐给增益，莫宁补干涉。',
    ctx: '有人问「达妮娅主C怎么配」或提琳莫',
    tabu: '这是主C向的思路，和副C向的爱达千不是一套，别混着说',
    rel: ['team-danya-role', 'roles2-linnai', 'term-pianxie-branch'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
  },
  {
    id: 'team-threefire',
    t: '三火：露帕布兰特长离',
    lvl: ['社'],
    def: '达妮娅主C的全热熔队：露帕、布兰特、长离三人都是热熔属性。',
    ctx: '有人问达妮娅主C有没有火队、提「三火」',
    tabu: '热熔同属性不等于能互相增伤，鸣潮属性只是分类，见 combat-attrs',
    rel: ['roles-露帕', 'roles-布兰特', 'roles-长离'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
  },


  // ── E 机制术语（只补 combat.js 没有的）────────────────────────
  {
    id: 'term-jubao-effect',
    t: '聚爆效应',
    lvl: ['官', '社'],
    def: '热熔攻击给敌人叠的层数。官方术语只给一句「每5秒，使持有者受到5*层数的效果伤害」，没给层数上限',
    ctx: '有人问聚爆是什么、爱弥斯提前引爆怎么回事',
    tabu: '这是异常效应不是共鸣属性（官方把它和震谐、光噪、电磁并称「减益效果」）。「上限10层」「15秒不叠掉1层」是社区整理的数字，官方术语库查不到——要报数就说是社区数据，别当官方讲',
    rel: ['team-aidajie', 'roles-千咲', 'danya-modes', 'term-jubao'],
    src: [
      'https://mc.yakitahome.com/api/terms',
      'https://baike.baidu.com/item/聚爆效应/67359016',
      'https://forum.gamer.com.tw/C.php?bsn=74934',
    ],
    note: '官方术语原文在 combat 页 term-jubao（uid term:853708，3.7版本：「每5秒，使持有者受到5*层数的效果伤害。」）。本轮查过官方术语库 kb/source/yakitahome-terms.json（288 条，3.7）：全文搜「聚爆」只有两条，就是上面这条和 term:853712 减益效果「包含聚爆、震谐、光噪和电磁四种负面状态的集合」，都没写层数上限或掉层时间；技能档案全文 yakitahome-info-full.json 里「聚爆」只作为标签出现一次，无机制文本。所以 def 里原来的「基础上限10层，15秒不叠掉1层」是二手（百度百科/巴哈姆特），本轮已从 def 挪进 tabu 并标明来源，lvl 加「社」。原 tabu 那句「2.8版本改过叠层与爆炸表现」查不到出处，一并删了；版本数值请以官方术语条目当前版本为准。',
  },
  {
    id: 'term-jubao-trail',
    t: '聚爆轨迹',
    lvl: ['官'],
    def: '聚爆体系下敌人身上的额外层数：每叠1层聚爆效应附1层轨迹，每层+10%聚爆伤害，至多30层。',
    ctx: '有人问聚爆伤害为什么越叠越高',
    tabu: '轨迹层数和聚爆效应层数是两回事，别合并成一个数字',
    rel: ['term-jubao-effect', 'term-jubao'],
    src: ['https://baike.baidu.com/item/聚爆效应/67359016'],
    note: '官方术语原文在 combat 页 term-jubao（uid term:853708，3.7版本）。这条讲轨迹层数怎么加算聚爆伤害，src 同为百度百科属二手，有出入以官方为准。',
  },
  {
    id: 'term-jianbeng',
    t: '简并虚质',
    lvl: ['官'],
    def: '达妮娅专属：目标的聚爆效应叠满引爆时获得，上限5层。蚀域攻击消耗1层，本次伤害倍率+100%。',
    ctx: '有人问达妮娅身上那五层是什么、蚀域打出去为什么这么疼',
    tabu: '「本次伤害倍率+100%」指蚀域的那一次攻击，不是常态增伤，别让她说得像常驻',
    rel: ['person-danya', 'danya-erosion-field', 'term-jubao-effect'],
    src: [
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
      'https://forum.gamer.com.tw/C.php?bsn=74934',
    ],
    note: '蚀域本身（帷幕终景·幻灭之形后生成、持续30秒、每4秒攻击一次）在 combat.js 的 danya-erosion-field，这里不重复。',
  },
  {
    id: 'term-pianxie-branch',
    t: '偏移 / 干涉 / 响应',
    lvl: ['官'],
    def: '偏移是给敌人挂的增益，只有震谐、集谐两种且互斥；谐度破坏把它升成干涉；响应指干涉下的额外攻击或增伤。',
    ctx: '3.0之后有人提到敌人身上的标记、或问「干涉」到底是什么',
    tabu: '偏谐值和失谐状态在 combat.js 的 combat-pianxie，这里只讲标记怎么升级',
    rel: ['combat-pianxie', 'combat-xiedu', 'term-zhenxie'],
    src: [
      'https://www.gamersky.com/handbook/202512/2065880.shtml',
      'https://www.taptap.cn/moment/762649998587330770',
    ],
  },
  {
    id: 'term-zhenxie',
    t: '震谐和集谐这两条路线',
    lvl: ['官'],
    def: '震谐干涉＝响应角色对目标打一次特殊攻击，适合单体；集谐干涉＝全队对该敌人叠伤害，适合群怪。',
    ctx: '有人问震谐队和集谐队差在哪',
    tabu: '琳奈暂是3.0唯一能上偏移的角色，这是攻略组推测不是官方承诺。官方技能文本写「集谱」，攻略站多写「集谐」，是同一组词，讲的时候按官方的说，被追问再解释。3.7 官方术语里「震谐」另指四种负面状态之一（聚爆、震谐、光噪、电磁），见 combat 页减益效果——同词两义，按上下文说',
    rel: ['roles2-linnai', 'term-pianxie-branch', 'danya-modes'],
    src: [
      'https://www.gamersky.com/handbook/202512/2065880.shtml',
      'https://www.taptap.cn/moment/762649998587330770',
    ],
    note: '以官方为准：达妮娅技能页原文是【集谱·偏移】【集谱·干涉】，战斗页 danya-modes 也按这个写；游民星空／游侠／TapTap 攻略统一写「集谐·偏移／集谐·干涉」。她被问到时先说官方叫集谱，对方用集谐就顺着认这是同一个东西，别争。',
  },
  {
    id: 'term-zhenxie-is-not-attr',
    t: '震谐不是湮灭加导电',
    lvl: ['官'],
    def: '震谐和集谐是偏谐体系下偏移、干涉的两条路线，可由角色切换，不是共鸣属性，更不是湮灭加导电。',
    ctx: '有人把「震谐队」说成湮灭加导电的配队时',
    tabu: '六大共鸣属性里没有「震谐」；要组属性队只能从衍射热熔气动导电湮灭冷凝里挑',
    rel: ['term-zhenxie', 'combat-attrs', 'roles2-qingxiao'],
    src: [
      'https://www.gamersky.com/handbook/202512/2065880.shtml',
      'https://m.ali213.net/news/gl2512/1726735.html',
    ],
    note: '三源（游民星空、游侠、TapTap）都只把震谐/集谐描述成偏移与干涉的两种类型，没有任何一处写成属性组合。',
  },

  // ── F 培养速查 ────────────────────────────────────────────────
  {
    id: 'gear-danya-set',
    t: '达妮娅的声骸套装',
    lvl: ['社'],
    def: '聚爆模态穿斑驳粉饰之沫5件套，集谐模态穿剪心辑梦之影5件套。',
    ctx: '有人问她穿什么套、聚爆态和集谐态怎么分',
    tabu: '还有官方【热熔套装】（打10层以上聚爆的敌人时暴击+20%、共鸣解放+30%，15秒），别漏',
    rel: ['person-danya', 'term-jubao-effect'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.gamersky.com/handbook/202605/2143115.shtml',
    ],
  },
  {
    id: 'gear-danya-weapon',
    t: '达妮娅的武器',
    lvl: ['社'],
    def: '专武和光回唱；替代款社区推赝作的矮星、掣傀之手。',
    ctx: '有人问她的专武、不抽专武拿什么',
    tabu: '三把替代武器的具体数值没逐一核实，只记社区推荐顺序',
    rel: ['person-danya', 'team-danya-role'],
    src: [
      'https://forum.gamer.com.tw/C.php?bsn=74934',
      'https://www.taptap.cn/',
    ],
    note: '专武名「和光回唱」来自用户核实过的事实；替代款三把沿用同一来源，未逐把查 wiki 词条。',
  },
]

export default entries