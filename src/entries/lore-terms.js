// lore-terms —— 官方新世界观专有名词（3.5 / 3.6 / 3.7）
// 原文出自官方接口 https://mc.yakitahome.com/api/terms（uid 见各条 note），本地快照 source/yakitahome-terms.json
// 收录口径：官方术语档案里 3.5 / 3.6 / 3.7 三版新增的世界观专有名词（玄方地界、梦州新 岁主 线、瑝珑 3.0/3.1 旧词等）
// description 照抄官方原文，不改写；官方没交代的地方（谁造的、怎么用、什么时候）一律写进 tabu，不要替它圆
// 本页不收（全库已有同名词条，官方 uid 建议回填到那些条目 note）：定玄卫 / 归魂互助会 / 禁锁十契 / 岐路司 /
//   诺维尔再生医药（factions.js）、浮光林 / 引日殿 / 苇原（world.js）
// 版本更早的官方词（玄方地界、海维夏、日髓、雪绒海豹、联运椎骨、虹音塔、虹晶、波仔、迷途波仔、夜之城、涡心）
//   不在本页：它们属旧版本且多数已有别的页在写，见 kb/reports/lore-terms.md
// 页面渲染预算：硬上限 8192 码点，目标 6000（src/note 不计入渲染体积）
export default [
  {
    id: "lore-jiolong",
    t: "咎笼",
    lvl: ["官"],
    def: "玄方地界「咎庭」里关押残象的笼子，也能装机傀，负责运送悬天构新造的机傀",
    ctx: "问「玄方城关东西的笼子」「机傀怎么运」时",
    tabu: "官方只说它关残象、装机傀；造它的是悬天构，笼子本身怎么造官方没说；别把「咎笼」和「咎庭」混成一样东西",
    rel: ["lore-jiuting", "lore-xuantiangou", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750044（3.5版本）官方原文：「自北落野残象潮而来的大量残象，被分割关押在了玄方地界内大小不一的庭院之中，这些庭院被称作「咎庭」，是如今定期剿灭残象的场所。\n在「咎庭」内，每只残象都被关押在了各自的「咎笼」中。这些「咎笼」也可装载机傀，用于将悬天构新造的机傀们运输到需要它们的地方。」英文原名 Censure Cage。"
  },
  {
    id: "lore-jiuting",
    t: "咎庭",
    lvl: ["官"],
    def: "玄方地界内关押残象的大大小小的庭院，如今是定期剿灭残象的场所",
    ctx: "问「玄方城关残象的地方」「咎庭」时",
    tabu: "官方原文里「咎庭」是庭院、「咎笼」是庭院里每只残象的笼子，别混；这些庭院归谁管、什么时候建的官方没交代",
    rel: ["lore-jiolong", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750045（3.5版本）官方原文：「自北落野残象潮而来的大量残象，被分割关押在了玄方地界内大小不一的庭院之中，这些庭院被称作「咎庭」，是如今定期剿灭残象的场所。\n在「咎庭」内，每只残象都被关押在了各自的「咎笼」中。这些「咎笼」也可装载机傀，用于将悬天构新造的机傀们运输到需要它们的地方。」英文原名 Censure Court。★原文与 uid:750044「咎笼」完全相同。"
  },
  {
    id: "lore-houxuan-sanji",
    t: "后玄三骑",
    lvl: ["官"],
    def: "定玄卫特设的三人特派小队，专门解决一般定玄卫处理不了的问题",
    ctx: "问「玄方城那支特别小队」「后玄三骑」时",
    tabu: "官方只说三名队员、归定玄卫、专办棘手问题；队长是谁、办过什么案子官方一个字没提，别替官方编",
    rel: ["org-定玄卫", "lore-houxuan-qishi"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750046（3.5版本）官方原文：「定玄卫特设的特派小队，共有三名队员，其成员亦被称作后玄骑使。\n此特派小队专用于解决一般定玄卫难以处理的问题。」英文原名 Xuan Triad。"
  },
  {
    id: "lore-houxuan-qishi",
    t: "后玄骑使",
    lvl: ["官"],
    def: "后玄三骑三名队员的称呼",
    ctx: "问「后玄三骑的队员叫什么」时",
    tabu: "官方原文只有一句，队员姓名、事迹、结局官方都没写；别把「骑使」当成有实职官阶",
    rel: ["lore-houxuan-sanji"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750047（3.5版本）官方原文：「后玄三骑的成员亦被称作后玄骑使。」英文原名 Xuan Watchers。"
  },
  {
    id: "lore-waishifu",
    t: "外事府",
    lvl: ["官"],
    def: "井栈的办事机构：监运使清点入城物资，巡方使核查身份并兼管地界治安",
    ctx: "问「井栈那边办事的机构」「外事府」时",
    tabu: "官方只写它清点物资、核查身份、兼管治安；归谁、属哪个州，官方没交代；「井栈」是什么官方在这条里也没说",
    rel: [],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750048（3.5版本）官方原文：「坐落于井栈的办事机构，设有「监运使」负责清点入城的物资和商品情况，另有「巡方使」负责核查入城人员的身份，并兼管地界内的治安。」英文原名 Ministry of Foreign Affairs。"
  },
  {
    id: "lore-xuantiangou",
    t: "悬天构",
    lvl: ["官"],
    def: "玄方地界西侧方擎西峰里的机关工厂，由造机傀的千形坊和专杀强大残象的万囮牢组成",
    ctx: "问「玄方城的机傀哪来的」「玄方城靠什么打仗」时",
    tabu: "千形坊造机傀、万囮牢镇杀残象，是它底下的两块，别当成两个平级工厂；这厂归谁、产能多少官方没写",
    rel: ["lore-jiolong", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750050（3.5版本）官方原文：「位于玄方地界西侧，方擎西峰中的机关工厂。\n「悬天构」由负责制造机傀的流水线工坊「千形坊」，以及专用于镇压、绞杀强大残象的「万囮牢」共同构成，它们昼夜运转不息，为玄方城提供源源不断的增援与助力。」英文原名 Skyworks。"
  },
  {
    id: "lore-liangyuan",
    t: "梁鸢",
    lvl: ["官"],
    def: "仿玄翎雀造的机关鸟，过去替代玄翎雀传信，如今终端普及后成了仪式性的传信",
    ctx: "问「玄方城怎么传信」「梁鸢是什么鸟」时",
    tabu: "它是仿玄翎雀造的机关造物，不是活物、也不是玄翎雀本身；「仪式性的传信」是官方原话，别吹成民间祈福习俗",
    rel: ["lore-xuanlingque"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750051（3.5版本）官方原文：「玄翎雀灭绝后，玄方地界的人们仿制其形，制造了名为「梁鸢」的机关造物。\n在过去，「梁鸢」们替代玄翎雀，成为了地界内的沟通工具。\n如今由于终端的普及，梁鸢传信已不再是主流的沟通方式，而是成为了一种仪式性的传信手段。」英文原名 Rafter Kite。"
  },
  {
    id: "lore-yuancheng",
    t: "渊城",
    lvl: ["官"],
    def: "玄方城之前琢钧堂与天工部合建的机关堡垒，为抵挡北落野残象潮而建",
    ctx: "问「玄方城之前是什么地方」「渊城」时",
    tabu: "官方说渊城已在云渊之役中被彻底摧毁，别当成还在的城；天工部是什么官方没交代",
    rel: ["lore-yunyuan-zhiyi", "org-琢钧堂", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750052（3.5版本）官方原文：「在玄方城修建前，「琢钧堂」与天工部曾合力建设了名为「渊城」的机关堡垒，用于抵抗北落野残象潮的入侵。」英文原名 Yuan Fortress。"
  },
  {
    id: "lore-yunyuan-zhiyi",
    t: "云渊之役",
    lvl: ["官"],
    def: "残象潮时云陵谷与渊城同时爆发的大战：云陵谷一役后今州建立，渊城被毁，废墟上建起玄方城",
    ctx: "问「今州怎么来的」「玄方城哪来的」「云陵谷那场仗」时",
    tabu: "官方只说两处同时开打与结果，没给年份、参战者、谁胜谁负；「云渊之役」是这场战役，别当成悲鸣的名字",
    rel: ["lore-yuancheng", "world-jinzhou", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750053（3.5版本）官方原文：「为了阻止北落野的残象潮从玄方地界向瑝珑其他州域扩散，当年曾在云陵谷与渊城同时爆发了规模空前的战役。\n经云陵谷一役，今州才终于建立了起来。\n而在渊城战场，渊城被彻底摧毁，但在其废墟之上，玄方城得以建成。」英文原名 Fortress and Gorges War。"
  },
  {
    id: "lore-xuanlingque",
    t: "玄翎雀",
    lvl: ["官"],
    def: "玄方地界曾有的一种回音生物，能携带并传递人的情感与话语，云渊之役后灭绝",
    ctx: "问「玄方城那只机关鸟的原型」「玄翎雀是什么」时",
    tabu: "官方说它因云渊之役灭绝，梁鸢是工匠仿它造型做的纪念物；别把玄翎雀说成现在还活着的生物",
    rel: ["lore-liangyuan", "lore-yunyuan-zhiyi"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750054（3.5版本）官方原文：「玄方地界曾经存在过的一种回音生物，能够携带并传递人的情感与话语。随着云渊之役的爆发在玄方地界灭绝。为了纪念玄翎雀，玄方地界的工匠们仿造它的造型，打造了名为梁鸢的机关鸟。」英文原名 Xuanling Bird。"
  },
  {
    id: "lore-liuxi",
    t: "流息",
    lvl: ["官"],
    def: "秧秧觉醒共鸣力后能感知并解读的一种特殊气流，能携带声音与情感等各种信息",
    ctx: "问「秧秧的感知力是什么」「流息」时",
    tabu: "官方只说秧秧能感知解读它、它携带声音与情感；别人能不能感知、怎么用官方没写；「自幼觉醒」别改成后来才有",
    rel: ["chars-秧秧"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750055（3.5版本）官方原文：「秧秧自幼觉醒共鸣力后，所能感知并解读的一种特殊气流，其能携带包括声音与情感在内的各种信息。」英文原名 The Streams。"
  },
  {
    id: "lore-sisheng-zhiren",
    t: "祀声之人",
    lvl: ["官"],
    def: "某位神秘的存在对秧秧的称呼，意为“祭祀声音的人”",
    ctx: "问「谁这么叫秧秧」「祀声之人」时",
    tabu: "官方只说是「某位神秘的存在」的称呼，没说是谁、也没说敌友；别替官方圆成具体角色，更别当成职业或组织",
    rel: ["chars-秧秧"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750056（3.5版本）官方原文：「某位神秘的存在对秧秧的称呼，意为“祭祀声音的人”。」英文原名 Votary of the Voice。"
  },
  {
    id: "lore-yanshi",
    t: "偃师",
    lvl: ["官"],
    def: "归魂互助会的首领，也是吟霖父母曾经的弟子",
    ctx: "问「归魂互助会的头目是谁」「偃师」时",
    tabu: "官方就这两句：外貌、能力、怎么当上首领、现在在哪，官方都没写；别拿「偃师＝造傀儡的人」那套民间说法当官方设定",
    rel: ["org-归魂互助会", "chars-吟霖"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750058（3.5版本）官方原文：「归魂互助会的首领，亦是吟霖父母曾经的弟子。」英文原名 Dollmaker。"
  },
  {
    id: "lore-sujing",
    t: "宿镜",
    lvl: ["官"],
    def: "心月狐以自身频率制作、封存了部分岁主权能的信物",
    ctx: "问「心月狐的信物」「宿镜」时",
    tabu: "官方只说它封存部分岁主权能、用心月狐自己的频率做的；怎么用、现在在谁手里、能不能用几次官方都没写",
    rel: ["lore-xinyu"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:750059（3.5版本）官方原文：「心月狐以自身的频率制作，封存了部分岁主权能的信物。」英文原名 Prism of Fate。★心月狐即岁主。"
  },
  {
    id: "lore-mengshu-tianluo",
    t: "梦枢天罗",
    alias: ["万相神宫"],
    lvl: ["官"],
    def: "玄方城的控制中枢，司掌维持玄方城运转的底层秩序",
    ctx: "问「玄方城的中枢在哪」「万相神宫」时",
    tabu: "官方只说它是控制中枢、司掌底层秩序，谁造的、里面住着谁官方没写；它不是玄方城本身；别称「万相神宫」是官方原话",
    rel: ["lore-xinyinjing", "lore-xinyu", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852009（3.7版本）官方原文：「玄方城的控制中枢，亦被称为「万相神宫」，司掌着维持玄方城运转的底层秩序。」英文原名 Simulacrum Nexus of Mengzhou。"
  },
  {
    id: "lore-xinyinjing",
    t: "心钥井",
    lvl: ["官"],
    def: "梦枢天罗里通往各处心域的通道入口，要有对应的心域秘钥才能通过",
    ctx: "问「怎么进心域」「心钥井」时",
    tabu: "官方只说要有「心域秘钥」才能过；秘钥长什么样、谁拿着、能不能借，官方都没写",
    rel: ["lore-mengshu-tianluo", "lore-xinyu"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852010（3.7版本）官方原文：「「梦枢天罗」中连接各处心域的通道入口，唯有携带对应的心域秘钥，方可通过心钥井，抵达各心域内部。」英文原名 Inner Threshold。"
  },
  {
    id: "lore-jinmiaosuo",
    t: "锦妙锁",
    lvl: ["官"],
    def: "岁主心月狐为谛天鉴成员制作的信物，给携带者防护、指引与警示",
    ctx: "问「谛天鉴的信物」「锦妙锁」时",
    tabu: "官方说它给防护、指引、警示这三样，具体怎么生效、用几次、有没有代价官方都没写",
    rel: ["org-谛天鉴"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852011（3.7版本）官方原文：「岁主心月狐为谛天鉴成员制作的信物，能够给予携带者防护、指引与警示。」英文原名 Providence Lock。"
  },
  {
    id: "lore-xinyu",
    t: "心域",
    lvl: ["官"],
    def: "梦枢天罗的深层区域，存着玄方地界全部历史文化和岁主心月狐的记忆、推演与情感思绪",
    ctx: "问「玄方城的档案藏在哪」「心域里有什么」时",
    tabu: "官方说除岁主外只有持「宿镜」的人能进；「各心域显现风格迥异的状态」官方没解释是什么风格，别自己编",
    rel: ["lore-mengshu-tianluo", "lore-sujing", "lore-xinyinjing"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852012（3.7版本）官方原文：「「梦枢天罗」的深层区域，除岁主外，仅拥有「宿镜」之人可进入，当中存储着玄方地界的全部历史文化，以及岁主心月狐的记忆、推演与情感思绪。各心域会随着内部存储信息内容的不同，显现出风格迥异的状态。」英文原名 Heart Realm。"
  },
  {
    id: "lore-chaoyuehui",
    t: "朝月会",
    lvl: ["官"],
    def: "梦州的传统节日，一说起源于纪念神狐拯救梦州的传说，有沉月灯、观百戏、灯舆巡城等习俗",
    ctx: "问「梦州有什么节日」「朝月会」时",
    tabu: "官方明说「一说是起源于纪念神狐拯救梦州的传说」——只是说法之一，别当定论；具体在哪一天、办几天的官方没写",
    rel: ["world-mengzhou"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852014（3.7版本）官方原文：「梦州地区的传统节日，一说是起源于纪念神狐拯救梦州的传说，有沉月灯、观百戏、灯舆巡城等习俗。\n人们将月灯沉入水中，希望能吸引岁主心月狐到访，与人共享尘世喜乐。」英文原名 Waking Moon Festival。"
  },
  {
    id: "lore-tianluo-huying",
    t: "天罗狐影",
    lvl: ["官"],
    def: "岁主心月狐的法相之一，能代替她履行部分管理梦枢天罗的职责",
    ctx: "问「心月狐的法相」「谁在管梦枢天罗」时",
    tabu: "官方说只是「部分」职责、能代替多少没说；法相不止这一个（官方原话「法相之一」），别把别的法相也塞进来",
    rel: ["lore-mengshu-tianluo"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:852015（3.7版本）官方原文：「岁主心月狐的法相之一，可代替其履行部分管理「梦枢天罗」的职责。」英文原名 Nexus Fox Shadow。"
  },
  {
    id: "lore-jianshui-duo",
    t: "渐水舵",
    lvl: ["官"],
    def: "琢钧堂总舵下属分舵之一，与具曲舵、之江舵各管梦州落江以外的一条流域",
    ctx: "问「琢钧堂下面有哪些分舵」时",
    tabu: "官方只说三个分舵各管三大流域之一，没说哪条河对应哪舵；具曲舵、之江舵官方还没单独立词，别替官方补写",
    rel: ["org-琢钧堂", "world-mengzhou"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800056（3.6版本）官方原文：「琢钧堂总舵下属分舵之一。\n分舵除了渐水舵外，还有具曲舵、之江舵。三个分舵各自管理着梦州落江以外的三大流域。」英文原名 Jianshui Branch。"
  },
  {
    id: "lore-shannao-yao",
    t: "山猫妖",
    lvl: ["官"],
    def: "关在景燃命灯里的回音生物，与景燃之间存在着特殊的契约",
    ctx: "问「景燃的命灯里是什么」「山猫妖」时",
    tabu: "官方只说关在命灯里、与景燃有契约；契约具体是什么、它能不能出来、命灯是什么，官方都没写",
    rel: ["chars-景燃"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800054（3.6版本）官方原文：「关押在景燃命灯中的回音生物，与景燃之间存在着特殊的契约。」英文原名 Lynx Spirit。"
  },
  {
    id: "lore-lingkongzhan",
    t: "凌空栈",
    lvl: ["官"],
    def: "玄方城飞舟上下客货的登陆口与码头，通常在运输线路的起点和终点",
    ctx: "问「玄方城飞舟在哪儿上下客」「凌空栈」时",
    tabu: "官方只说它是登陆口与码头、在运输线路起终点；飞舟归谁运营、玄方城有几座、有没有别的用处，官方都没写",
    rel: ["world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800048（3.6版本）官方原文照抄：「供玄方城的飞舟上下客货用的登陆口与码头，通常位于运输线路的起点和终点。」官方英文名 Sky Pier。"
  },
  {
    id: "lore-huxuanping",
    t: "护玄屏",
    lvl: ["官"],
    def: "玄方城进入紧急状态才启用的机关防壁，大到能罩住整座城，先前机傀攻城时起过防护作用",
    ctx: "问「玄方城的防壁」「护玄屏」时",
    tabu: "官方只说紧急状态才启用、罩得住整座城、机傀攻城时起过作用；谁造的、怎么触发、现在还在不在，官方都没写",
    rel: ["world-xuanfang", "lore-xuantiangou"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800049（3.6版本）官方原文照抄：「在玄方城进入紧急状态时才会启用的机关防壁，大小足够笼罩整座城。\n在先前机傀攻城时，它曾发挥了重要的防护作用。」官方英文名 Xuan Shield。"
  },
  {
    id: "lore-xuanyuanjing",
    t: "玄元境",
    lvl: ["官"],
    def: "玄方城控制中枢内部的数据空间，存着玄方地界大量历史数据，分人境、地境、天境等层级",
    ctx: "问「玄方城的历史数据存在哪」「玄元境」时",
    tabu: "官方只说在中枢内部、存大量历史数据、分多层；每层具体存什么、谁能进、怎么进官方都没写；别把它跟「心域」混成一处",
    rel: ["lore-mengshu-tianluo", "world-xuanfang"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800051（3.6版本）官方原文照抄：「位于玄方城控制中枢内部的数据空间，存储着玄方地界的大量历史数据。 \n其内部存在多个代表不同数据区域的层级，如人境、地境、天境。」官方英文名 Xuanyuan Domain。"
  },
  {
    id: "lore-wenmingzhixia",
    t: "文明之匣",
    lvl: ["官"],
    def: "岁主所持有的珍贵之物，存有关于岁主与文明的重要底层数据",
    ctx: "问「岁主持的什么珍贵之物」「文明之匣」时",
    tabu: "官方只说岁主持有、存着关于岁主与文明的底层数据；谁造的、怎么用、现在在谁手里官方都没写；别跟「宿镜」「心域」混成一件东西",
    rel: ["term-suizhu", "lore-xinyu"],
    src: ["https://mc.yakitahome.com/api/terms", "source/yakitahome-terms.json"],
    note: "uid:800053（3.6版本）官方原文照抄：「岁主所持有的珍贵之物，存有关于岁主与文明的重要底层数据。」官方英文名 Civilization Capsule。"
  }
]
