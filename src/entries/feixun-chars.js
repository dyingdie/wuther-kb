// feixun-chars —— 飞讯上那些有签名的角色号：每个人在飞讯签名栏里写下的原话
// 原文出自官方接口 https://mc.yakitahome.com/api/feixun（实测 200，schemaVersion 2，kind feixun-manifest，
//   builtAt 2026-09-30T03:25:40+00:00，sourceVersion 3.7）；本地快照 source/yakitahome-feixun.json 是同一批，
//   会话全文在 source/yakitahome-feixun-full.json（289 段）
// 收录口径：官方联系人里签名（desc）非空的号，共 21 条。角色号 20 个；「无音消除」宣传员是活动宣传号
//   （官方英文名 Echo Erase Promoter），按机构号性质收在最后一条，t 照官方名带「」。
//   签名空白的几十个号不收（秋鸿、知远、阿里曼等）——那不是信息，只是没填。
// def 就是官方签名原文，逐字抄、不改写、不加解读；官方没交代的（谁写的、什么意思、是不是角色本人在说）不替它圆。
// t 一律带「（飞讯）」后缀：全库已有同名的角色条目（chars / chars-npc / roles / nicknames 那几页），
//   加后缀是为免撞名，note 里逐条写明撞的是哪几个 id。
// 页面渲染预算：硬上限 8192 码点，目标 6000（src / note 不计入渲染体积）
export default [
  {
    id: 'feixun-char-iuno',
    t: '尤诺（飞讯）',
    lvl: ['官'],
    def: '没印象的话就重新认识吧，尤诺……这次要记好咯。',
    ctx: '问「尤诺在飞讯上写的签名是什么」时',
    tabu: '签名原文别改写；「没印象」指谁没印象、为什么让你记好，官方都没解释',
    rel: ['chars-尤诺', 'roles-尤诺'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 2；isGroupChat=false；peopleNum 0（个人号，官方记 0）；签名（desc）原文「没印象的话就重新认识吧，尤诺……这次要记好咯。」；官方英文名 Iuno；conversationCount 3、messageCount 21（会话 30081＝2.8版本「在象征荣耀和凯旋的玫瑰花雨中喝的蜜酒，是我喝过最甜的了。」；35047＝3.5版本「测试短信语音1」；35052＝3.5版本「测试短信1」——这两段标题本身就是「测试」，别当剧情）。★库内已有「尤诺」条目（chars-尤诺、roles-尤诺），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「在象征荣耀和凯旋的玫瑰花雨中喝的蜜酒，是我喝过最甜的了。」'
  },
  {
    id: 'feixun-char-lynae',
    t: '琳奈（飞讯）',
    lvl: ['官'],
    def: '请支持科考摩托百日训练ε=ε=ε=ε=┌( *｀ω´)┘',
    ctx: '问「琳奈的飞讯签名」「科考摩托是什么」时',
    tabu: '签名原文里的颜文字和符号别改；「科考摩托」官方没解释是什么，别自己编车型',
    rel: ['chars-琳奈', 'ships-linnai'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 7；isGroupChat=false；peopleNum 0；签名（desc）原文「请支持科考摩托百日训练ε=ε=ε=ε=┌( *｀ω´)┘」；官方英文名 Lynae；conversationCount 15、messageCount 199（会话 30008/30010/30011/30012/30091/30092＝3.0版本，32120~32124＝3.2版本，33009/33013/33021＝3.3版本，35005＝3.5版本）。★库内已有「琳奈」条目（chars-琳奈），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「刚才的合照！」「被留在宿舍不让出去了(´-ι_-｀)」'
  },
  {
    id: 'feixun-char-chisa',
    t: '千咲（飞讯）',
    lvl: ['官'],
    def: '普通学生（复课版）',
    ctx: '问「千咲在飞讯上的签名」「普通学生复课版是什么意思」时',
    tabu: '「复课版」指休学复课还是别的，官方没写；签名原文别改',
    rel: ['chars-千咲', 'roles-千咲'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 8；isGroupChat=false；peopleNum 0；签名（desc）原文「普通学生（复课版）」；官方英文名 Chisa；conversationCount 8、messageCount 105（会话 30007/30096/30100＝3.0版本，30085＝2.8版本，32136＝3.2版本，33010/33023＝3.3版本，35002＝3.5版本）。★库内已有「千咲」条目（chars-千咲、roles-千咲），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「漂泊者。」「我已经到星炬学院了！但抵达的坐标有点……不稳定，造成了一些小骚动……」'
  },
  {
    id: 'feixun-char-mornye',
    t: '莫宁（飞讯）',
    lvl: ['官'],
    def: '消息都会回复的，未回请稍等。',
    ctx: '问「莫宁的飞讯签名」「莫宁的消息怎么回」时',
    tabu: '签名是官方原文；她话里提的深空联合、星图、海维夏探测器是游戏内文本，别当现实新闻',
    rel: ['chars-莫宁', 'nick-moning', 'feixun-group-mornye'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 18；isGroupChat=false；peopleNum 0；签名（desc）原文「消息都会回复的，未回请稍等。」；官方英文名 Mornye；conversationCount 21、messageCount 225（会话 30023/30041/30042/30043/30044/30090/30099＝3.0版本，32100~32104＝3.2版本，32138/33007/33020/33028/33029/33030/33032＝3.3版本，34004＝3.4版本，35007＝3.5版本）。★库内已有「莫宁」条目（chars-莫宁、nick-moning），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「不知道你有没有察觉到今夜的星空有些特别的地方？」'
  },
  {
    id: 'feixun-char-ronan',
    t: '罗南（飞讯）',
    alias: ['罗南'],
    lvl: ['官'],
    def: '任何时间，任何地点，隧群侦探，闪亮出现！',
    ctx: '问「罗南在飞讯上的签名」「隧群侦探是谁」时',
    tabu: '签名里的「隧群」「神迹一号」官方在这儿都没解释，别自己编设定',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 19；isGroupChat=false；peopleNum 0；签名（desc）原文「任何时间，任何地点，隧群侦探，闪亮出现！」；官方英文名 Ronan；conversationCount 2、messageCount 30（会话 30024、30025，均为 3.0版本）。库内没有讲罗南这个人的条目，所以 alias 才敢用「罗南」原名。',
    body: '发过：「快来快来！神迹一号的移动轨迹刚刷新了！」「这速度根本不是跳，是在冲刺！它绝对是超进化了！」'
  },
  {
    id: 'feixun-char-kuraji',
    t: '库拉吉（飞讯）',
    alias: ['库拉吉'],
    lvl: ['官'],
    def: '库库库，今天有什么可以帮到你？',
    ctx: '问「库拉吉的签名」「谁从黑海岸来支援拉海洛」时',
    tabu: '「执花」是什么官方没解释；她自称支援拉海洛是游戏内说法，别当现实任职',
    rel: ['org-黑海岸', 'doc-survey-platform'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 23；isGroupChat=false；peopleNum 0；签名（desc）原文「库库库，今天有什么可以帮到你？」；官方英文名 KU-Raji；conversationCount 2、messageCount 16（会话 30029、30033，均为 3.0版本）；她在会话里自称「负责从黑海岸支援你在拉海洛的部分工作」，并提过深空测界台重建完成。库内没有讲库拉吉这个人的条目。',
    body: '发过：「漂泊者！初次见面，我是库拉吉！负责从黑海岸支援你在拉海洛的部分工作！」'
  },
  {
    id: 'feixun-char-trevor',
    t: '特雷弗（飞讯）',
    alias: ['特雷弗'],
    lvl: ['官'],
    def: '影像，是时间的切片。',
    ctx: '问「特雷弗的签名」「谁在拍虚质磁暴」时',
    tabu: '「影像」指照片还是别的东西官方没写；「智造立方」是学院设施，别把这段对话当官方说明',
    rel: ['term-astrum'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 35；isGroupChat=false；peopleNum 0；签名（desc）原文「影像，是时间的切片。」；官方英文名 Trevor；conversationCount 1、messageCount 8（会话 30052，3.0版本；官方 flowStateKey 记作「剧情_3_0_支线_不只是装饰而已」）。★注意：会话 id 30052 是按号分配的，特雷弗和尤诺名下各有一个 30052，别混。库内没有讲特雷弗这个人的条目。',
    body: '发过：「是漂泊者吗？您竟然来拉海洛了！」「拉古那的斐林先生寄给我的明信片里，提到过您。」'
  },
  {
    id: 'feixun-char-jiyan',
    t: '忌炎（飞讯）',
    lvl: ['官'],
    def: '岂曰无衣，与子同袍。',
    ctx: '问「忌炎在飞讯上的签名」「岂曰无衣是什么意思」时',
    tabu: '「岂曰无衣，与子同袍」是《诗经》原句，官方没说是讲给谁；「归来之人」指谁官方也没点明',
    rel: ['chars-忌炎', 'roles-忌炎'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 40；isGroupChat=false；peopleNum 0；签名（desc）原文「岂曰无衣，与子同袍。」；官方英文名 Jiyan；conversationCount 1、messageCount 5（会话 30071，2.8版本）。★库内已有「忌炎」条目（chars-忌炎、roles-忌炎），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「月相完满之时，漂泊之人归来……」「你的确就是那位“归来之人”，而我们也真的一起消灭了那头怪物，穿越长夜，胜利归来。」'
  },
  {
    id: 'feixun-char-carlotta',
    t: '珂莱塔（飞讯）',
    lvl: ['官'],
    def: '谈生意，还是交朋友……以莫塔里的名义，合作愉快。',
    ctx: '问「珂莱塔的签名」「莫塔里是谁」时',
    tabu: '「莫塔里」官方没解释是谁；签名里说「谈生意」是游戏内台词，别当成真实商务往来',
    rel: ['chars-珂莱塔', 'roles-珂莱塔'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 45；isGroupChat=false；peopleNum 0；签名（desc）原文「谈生意，还是交朋友……以莫塔里的名义，合作愉快。」；官方英文名 Carlotta；conversationCount 1、messageCount 8（会话 30076，2.8版本）。★库内已有「珂莱塔」条目（chars-珂莱塔、roles-珂莱塔），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「狂欢节上，我们完成了一场相当完美的共演。」'
  },
  {
    id: 'feixun-char-cantarella',
    t: '坎特蕾拉（飞讯）',
    lvl: ['官'],
    def: '特效药批发',
    ctx: '问「坎特蕾拉的签名」「谁在卖特效药」时',
    tabu: '「特效药」指游戏里的什么官方没写；她是不是真在卖药，别当现实生意',
    rel: ['chars-坎特蕾拉', 'roles-坎特蕾拉'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 46；isGroupChat=false；peopleNum 0；签名（desc）原文「特效药批发」；官方英文名 Cantarella；conversationCount 1、messageCount 5（会话 30077，2.8版本）；会话里提到卡提希娅与翡萨烈。★库内已有「坎特蕾拉」条目（chars-坎特蕾拉、roles-坎特蕾拉），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「卡提希娅寻回了自己，翡萨烈也获得了自由。」「这一切都要归功于你呢，漂泊者。」'
  },
  {
    id: 'feixun-char-arsenio',
    t: '阿尔塞尼（飞讯）',
    alias: ['阿尔塞尼'],
    lvl: ['官'],
    def: '我们同在炉芯的照耀之下。',
    ctx: '问「阿尔塞尼的签名」「炉芯是什么」时',
    tabu: '「炉芯」「隧者」官方在这儿都没解释；签名原文别改写',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 54；isGroupChat=false；peopleNum 0；签名（desc）原文「我们同在炉芯的照耀之下。」；官方英文名 Arsenio；conversationCount 2、messageCount 21（会话 30089、30094，均为 3.0版本）。库内没有讲阿尔塞尼这个人的条目，所以 alias 才敢用原名。',
    body: '发过：「炉芯闪耀，在浓雾中照亮大地。」「我的灯光闪烁，照亮了周围的雾。」'
  },
  {
    id: 'feixun-char-aalto',
    t: '秋水（飞讯）',
    lvl: ['官'],
    def: 'AAA信息咨询服务。',
    ctx: '问「秋水的飞讯签名」「AAA 是什么服务」时',
    tabu: '「AAA」指什么官方没写；签名看着像广告，别当成现实公司',
    rel: ['chars-秋水', 'roles-秋水'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 55；isGroupChat=false；peopleNum 0；签名（desc）原文「AAA信息咨询服务。」；官方英文名 Aalto；conversationCount 1、messageCount 8（会话 34008，3.4版本），内容是约八点碰头同步情报。★库内已有「秋水」条目（chars-秋水、roles-秋水），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「八点在刚刚路过的那个广场附近碰头，跟你同步下情报。」'
  },
  {
    id: 'feixun-char-sigrika',
    t: '西格莉卡（飞讯）',
    lvl: ['官'],
    def: '嘤嘤鹦真的不是雪衫帝小时候！',
    ctx: '问「西格莉卡在飞讯上的签名」「嘤嘤鹦是什么」时',
    tabu: '「嘤嘤鹦」「雪衫帝」官方没解释；签名是游戏内玩梗，别当设定考据',
    rel: ['rel-svigirl', 'roles-西格莉卡', 'nick-xixi'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 62；isGroupChat=false；peopleNum 0；签名（desc）原文「嘤嘤鹦真的不是雪衫帝小时候！」；官方英文名 Sigrika；conversationCount 9、messageCount 72（会话 32005/32006/32009＝3.2版本，33003/33024/33035/33039/33052＝3.3版本，35001＝3.5版本）；她在飞讯里管漂泊者叫「前辈」。★库内已有「西格莉卡」条目（rel-svigirl、roles-西格莉卡、nick-xixi），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「对不起，前辈，让你们担心了。」「前辈，有空吗？」「想不想试试彩虹豆豆跳跳糖？」'
  },
  {
    id: 'feixun-char-aemeath',
    t: '爱弥斯（飞讯）',
    lvl: ['官'],
    def: '学位证锐意补办中……Ow<',
    ctx: '问「爱弥斯的飞讯签名」「学位证怎么了」时',
    tabu: '「Ow<」是表情，别删；她为什么补办学位证官方没解释',
    rel: ['chars-爱弥斯', 'roles-爱弥斯', 'lines-about-teachers'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 74；isGroupChat=false；peopleNum 0；签名（desc）原文「学位证锐意补办中……Ow<」；官方英文名 Aemeath；conversationCount 1、messageCount 21（会话 35004，3.5版本，标题「毕业快乐~」）。★库内已有「爱弥斯」条目（chars-爱弥斯、roles-爱弥斯），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「毕业快乐~」「哎，没想到能有和你说这句话的一天呢。只论这次时间的话，你说不定是星炬学院毕业速度最快的人哦？」'
  },
  {
    id: 'feixun-char-jiuwu',
    t: '久梧（飞讯）',
    alias: ['久梧'],
    lvl: ['官'],
    def: '凡事尽心，于己无愧，于人无咎。',
    ctx: '问「久梧的飞讯签名」「久梧是谁」时',
    tabu: '「天工箓」官方在这儿没解释是什么；久梧什么身份官方也没写，别自己配',
    rel: ['org-军策府'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 90；isGroupChat=false；peopleNum 0；签名（desc）原文「凡事尽心，于己无愧，于人无咎。」；官方英文名 Jiuwu；conversationCount 1、messageCount 3（会话 35024，3.5版本，标题「漂泊者……你去天工箓了吗？」）；索尼娅的会话里自称是久梧的朋友，说久梧留在军策府配合调查。库内没有讲久梧这个人的条目。',
    body: '发过：「漂泊者……你去天工箓了吗？」「我有话对你说，方便的话，来这里找我吧。」'
  },
  {
    id: 'feixun-char-sonija',
    t: '索尼娅（飞讯）',
    alias: ['索尼娅'],
    lvl: ['官'],
    def: '欢迎交流梦州话和维修工艺，不吃热海皇梨披萨。',
    ctx: '问「索尼娅的飞讯签名」「梦州话是什么」时',
    tabu: '「梦州话」官方在这儿没解释；「绘寰」「江苇」「天工箓专员」是游戏内文本，别当现实机构',
    rel: ['world-mengzhou', 'org-军策府'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 91；isGroupChat=false；peopleNum 0；签名（desc）原文「欢迎交流梦州话和维修工艺，不吃热海皇梨披萨。」；官方英文名 Sonija；conversationCount 1、messageCount 5（会话 35025，3.5版本）；她说自己是久梧的朋友，久梧留在军策府配合调查，因为久梧提供的名单和销毁程式，绘寰、江苇和「天工箓」专员的工作得以立刻整合。库内没有讲索尼娅这个人的条目。',
    body: '发过：「漂泊者，我是索尼娅，久梧的朋友……那天的事，我想向你道谢。」'
  },
  {
    id: 'feixun-char-baizhi',
    t: '白芷（飞讯）',
    lvl: ['官'],
    def: '勤耕不辍，方见真章。',
    ctx: '问「白芷在飞讯上的签名」时',
    tabu: '「勤耕不辍，方见真章」是成语，官方没说是写给她谁的；签名原文别改',
    rel: ['chars-白芷', 'roles-白芷', 'world-jinzhou'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 93；isGroupChat=false；peopleNum 0；签名（desc）原文「勤耕不辍，方见真章。」；官方英文名 Baizhi；conversationCount 2、messageCount 19（会话 35028、35031，均为 3.5版本），会话里她说的是「准备回今州了」。★库内已有「白芷」条目（chars-白芷、roles-白芷），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「准备回今州了，今天。」「下次……但愿不会这么匆忙，多给大家留一些彼此相处的时间。」'
  },
  {
    id: 'feixun-char-xuanqing',
    t: '璇情（飞讯）',
    alias: ['璇情'],
    lvl: ['官'],
    def: '心情不好就来份粘糕吧！',
    ctx: '问「璇情的飞讯签名」「情匣是什么」时',
    tabu: '「情匣」「粘糕」官方在这儿都没解释；签名原文别改写',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 107；isGroupChat=false；peopleNum 0；签名（desc）原文「心情不好就来份粘糕吧！」；官方英文名 Xuanqing；conversationCount 1、messageCount 3（会话 37002，3.7版本），标题「「情匣」的两份碎片都收集完毕了。」；官方快照里另有一个未知联系人 137 的签名跟这条一模一样。库内没有讲璇情这个人的条目。',
    body: '回漂泊者：「呀，收集得很快呢！」'
  },
  {
    id: 'feixun-char-jingran',
    t: '景燃（飞讯）',
    lvl: ['官'],
    def: '人不在，《寻幽记》相关可咨询责编守词。',
    ctx: '问「景燃的签名」「《寻幽记》是什么」时',
    tabu: '「寻幽记」官方在这儿没解释是什么；「责编」是游戏内职务，别当现实出版',
    rel: ['chars-景燃', 'roles-景燃'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 116；isGroupChat=false；peopleNum 0；签名（desc）原文「人不在，《寻幽记》相关可咨询责编守词。」；官方英文名 Jingran；conversationCount 2、messageCount 8（会话 36010、36011，均为 3.6版本）。★库内已有「景燃」条目（chars-景燃、roles-景燃），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「人找到了。」「我发现了个有意思的事儿，之前那件残损的东西的确和我有点因缘。」'
  },
  {
    id: 'feixun-char-jadie',
    t: '小玉（飞讯）',
    alias: ['小玉'],
    lvl: ['官'],
    def: '你好哦，有事小玉来帮忙~ ＼(◉Θ◉)／',
    ctx: '问「小玉在飞讯上的签名」「岁主大人的安排是什么」时',
    tabu: '「岁主大人」指谁官方没写；「玄元境」官方在这儿也没解释',
    rel: ['lore-xuanyuanjing', 'term-suizhu'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 119；isGroupChat=false；peopleNum 0；签名（desc）原文「你好哦，有事小玉来帮忙~ ＼(◉Θ◉)／」；官方英文名 Jadie；conversationCount 3、messageCount 29（会话 36005、36006、36008，均为 3.6版本）；她说自己按岁主大人之前的安排在玄元境做善后。库内没有讲小玉这个人的条目，所以 alias 才敢用原名。',
    body: '发过：「嗨，漂泊者！」「我正按岁主大人之前的安排，在玄元境里做善后工作。」'
  },
  {
    id: 'feixun-org-echo-erase',
    t: '「无音消除」宣传员（飞讯）',
    alias: ['无音消除宣传员'],
    lvl: ['官'],
    def: '玩一把「无音消除」吧，就一把！',
    ctx: '问「无音消除是什么」「飞讯上那个喊消除的宣传号」时',
    tabu: '这是官方活动宣传号不是角色，别把它的口气当某个人格；「第二索拉」官方在这儿没解释',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 126；isGroupChat=false；peopleNum 0；签名（desc）原文「玩一把「无音消除」吧，就一把！」；官方英文名 Echo Erase Promoter（Promoter＝宣传号）；conversationCount 1、messageCount 7（会话 37019，3.7版本）。★它按活动宣传号收录，id 用 feixun-org- 开头，不当角色号。库内没有「无音消除」条目。',
    body: '发过：「消除！消除！消除！漂泊者，来体验手指点点消除声骸棋子的乐趣吧」「第二索拉最新出品旗舰项目，为你量身打造轻松消除声骸棋子的快感」'
  }
];
