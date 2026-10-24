// feixun —— 游戏内飞讯（聊天软件）里有哪些人、哪些群
// 原文出自官方接口 https://mc.yakitahome.com/api/feixun（实测 200，schemaVersion 2，kind feixun-manifest，
//   builtAt 2026-09-30T03:25:40+00:00，sourceVersion 3.7）；本地快照 source/yakitahome-feixun.json 是同一批，
//   会话全文在 source/yakitahome-feixun-full.json（289 段）
// 收录口径：官方联系人列表里有的号。群聊 8 个全收；机构号只收签名非空的；角色号只收签名带身份线索的。
//   签名空白的几十个号一律不收——那不是信息，只是没填。
// 签名和飞讯原文一律逐字抄，不改写、不加解读；官方没交代的（谁发的、什么时候发的、谁拉谁进群）不替它圆。
// 本页 id 形如 feixun-<英文短名>；t 撞全库已有条目时加「（飞讯）」后缀，并在 note 里写明是为免撞名。
// 页面渲染预算：硬上限 8192 码点，目标 6000（src / note 不计入渲染体积）
export default [
  {
    id: 'feixun-app',
    t: '飞讯',
    lvl: ['官'],
    def: '游戏里的聊天软件。官方接口给了联系人全量：114 个号，其中群聊 8 个、个人号 106 个',
    ctx: '问「飞讯是什么」「飞讯上有哪些人、哪些群」「谁在飞讯上发公告」时',
    tabu: '这页只记官方接口给的联系人和签名；飞讯里的话是游戏内文本，别当现实传闻；接口里没有的人官方没列，别替它添',
    rel: ['feixun-group-family', 'feixun-group-runes', 'feixun-org-spacetrek', 'feixun-char-lucilla'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: '接口 https://mc.yakitahome.com/api/feixun 实测 200、2707063 字节；schemaVersion 2、kind feixun-manifest、builtAt 2026-09-30T03:25:40+00:00、sourceVersion 3.7；本地快照 source/yakitahome-feixun.json 是同一批，会话全文在 source/yakitahome-feixun-full.json（289 段）。contacts 114 条：isGroupChat=true 8 条、false 106 条；stats 记 contactsRaw 121、conversations 289、messages 2607、shortMessages 290。★派单写的 /api/contacts 实测 404（返回 447 字节 HTML 错误页），库里 tools/yakitahome.mjs、tools/pull-feixun.mjs 记的也都是 /api/feixun，所以 src 用 /api/feixun。contactsRaw 121 与 contacts 114 差 7 条，官方没解释，当未知。',
    body: '接口 contacts 数组里每个号都带：id、name、desc（签名）、isGroupChat、peopleNum、conversationCount、messageCount。'
  },
  {
    id: 'feixun-group-family',
    t: '相亲相爱一家人',
    lvl: ['官'],
    def: '飞讯群聊，4 个人；官方系统提示写的是长离把漂泊者、今汐、散华拉进群',
    ctx: '问「飞讯上有什么群」「相亲相爱一家人是什么群」时',
    tabu: '官方没写这群归谁管、为什么叫「一家人」；名字听着像一家人聚会，别自己脑补成家族或队伍',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 1；isGroupChat=true；peopleNum 4；conversationCount 1、messageCount 15（会话 30001）；官方英文名 Happy Little Family；签名（desc）官方留空。系统提示逐字：「长离邀请漂泊者、今汐、散华加入群聊。」',
    body: '群里的第一句：「这次是想和大家一起聊聊追月节的事情。」'
  },
  {
    id: 'feixun-group-ops',
    t: '星炬学院讨论组-运营部门',
    lvl: ['官'],
    def: '飞讯群聊，3 个人；第一条在问「虚诞虫骑士」到没到现场',
    ctx: '问「星炬学院有什么讨论群」「运营部门那个群」时',
    tabu: '官方没写这三个人是谁、虚诞虫骑士是不是游戏内职级；有一条会话只剩一条 [图片]，别猜图里是什么',
    rel: ['org-星炬学院'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 31；isGroupChat=true；peopleNum 3；会话 30045 十条、30046 十一条；官方英文名 Everything Startorch - Operations Department；签名官方留空。系统提示逐字：「安切洛邀请漂泊者加入群聊。」',
    body: '第一条：「虚诞虫骑士，你已经到现场了吗！！」\n另一条会话里只有一句「谢谢你，给你添麻烦了。」和漂泊者问的一句「安切洛呢？」'
  },
  {
    id: 'feixun-group-trio',
    t: '漂泊者 、今汐、长离',
    lvl: ['官'],
    def: '飞讯群聊，3 个人；第一条在问该叫漂泊者「同路人、贵客、御者」里的哪个名号',
    ctx: '问「飞讯上有哪些群」「漂泊者今汐长离那个群」时',
    tabu: '官方名里逗号前后各有一个空格，逐字抄的；群里除这三个人还有谁，官方没交代',
    rel: [],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 41；isGroupChat=true；peopleNum 3；会话 30072 十七条；官方英文名 漂泊者, Jinhsi, Changli；官方中文名逗号前后各有一个空格（原文如此）；签名官方留空。系统提示逐字：「长离邀请漂泊者、今汐加入群聊。」',
    body: '第一条：「同路人、贵客、御者……这么多名号，该怎么称呼你好呢？」'
  },
  {
    id: 'feixun-group-dark',
    t: '星炬学院最黑暗的一面',
    lvl: ['官'],
    def: '飞讯群聊，3 个人；第一条在传幽灵巫女夜里出现在电影同好会教室的传闻',
    ctx: '问「星炬学院还有什么群」「幽灵巫女的传闻」时',
    tabu: '传闻是群里的话，不是官方事实；幽灵巫女指谁、传闻真假，群里没给答案，别替它圆',
    rel: ['org-星炬学院', 'doc-missing-shaman'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 68；isGroupChat=true；peopleNum 3；会话 32137 十六条；官方英文名 The Darkest Side of Startorch；签名官方留空。系统提示逐字：「超高校级心理委员邀请漂泊者加入群聊」',
    body: '第一条：「诶，大伙儿听说了吗？听说最近幽灵巫女夜晚11:00后又出现在电影同好会的教室里了。」\n后面还提到她看了电影《这个杀手有点儿冷》。'
  },
  {
    id: 'feixun-group-runes',
    t: '罗伊符文搜寻联络群',
    lvl: ['官'],
    def: '飞讯群聊，31 个人，是官方快照里人数最多的群；内容是罗伊符文搜集的调度通报',
    ctx: '问「罗伊族那个群」「谁在调度符文搜集」时',
    tabu: '通报只写进度和分区，没写指挥的是谁、小队是谁；「伤情通知」是转述，别当成伤亡名单',
    rel: ['org-罗伊族', 'world-roine', 'feixun-char-lucilla'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 70；isGroupChat=true；peopleNum 31；会话 33008 七条、33015 十三条、33016 两条、33017 十一条、33018 十二条；官方英文名 Royan Runes Search Group；签名官方留空。系统提示逐字：「洛瑟菈邀请漂泊者加入了群聊」',
    body: '五条会话都是调度通报，最后一条：「研究院区块、学院区块、浮光林区块搜集进度均已完成。」'
  },
  {
    id: 'feixun-group-mornye',
    t: '帮帮我，莫宁老师',
    lvl: ['官'],
    def: '飞讯群聊，3 个人；第一条是「你好呀喵。」',
    ctx: '问「飞讯上有什么群」「莫宁老师那个群」时',
    tabu: '「喵」是谁的口癖别乱安；群里这三个人是谁、这群和莫宁什么关系，官方没写',
    rel: ['chars-莫宁', 'nick-moning'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 80；isGroupChat=true；peopleNum 3；会话 34007 九条；官方英文名 Help me, Professor Mornye；签名官方留空。系统提示逐字：「漂泊者邀请莫宁、白色守门人加入群聊」',
    body: '第一条：「你好呀喵。」\n隔一条又是一个问号：「……喵？」'
  },
  {
    id: 'feixun-group-lunch',
    t: '今天午饭吃什么',
    lvl: ['官'],
    def: '飞讯群聊，4 个人；有成员说想念和秧秧、白芷、漂泊者一起去玄方城',
    ctx: '问「飞讯上有什么群」「午饭那个群」时',
    tabu: '快照里每条会话只留了开头，后面说了什么没有；别拿「啊——」当谜语解，也别把「出！院！了！」当成真出院',
    rel: ['world-xuanfang'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 92；isGroupChat=true；peopleNum 4；会话 35026 三十五条、35027 二十二条、35032 二十八条；官方英文名 What\u0027s for Lunch Today；签名官方留空。系统提示逐字：「炽霞邀请漂泊者加入群聊。」',
    body: '一句：「不行不行……一想到不能和秧秧、白芷还有漂泊者一起去玄方城，还是觉得有些可惜……」\n另一条只有三个字：「我，终于可以——出！院！了！」'
  },
  {
    id: 'feixun-group-crispy',
    t: '吃“酥”群',
    lvl: ['官'],
    def: '飞讯群聊，4 个人；第一条在问丹瑾和漂泊者顺不顺利',
    ctx: '问「飞讯上有什么群」「吃酥那个群」时',
    tabu: '「酥」指谁官方没写，别自己配；这四个人是谁也没写',
    rel: ['chars-丹瑾'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 101；isGroupChat=true；peopleNum 4；会话 35048 二十条；官方英文名 Crispy Trio；官方名里的引号是弯引号“酥”（原文如此）；签名官方留空；这个群没有官方系统提示。',
    body: '第一条：「噢！丹瑾！漂泊者！一切顺利吧？」\n后一句：「你们俩一起的话，我感觉什么困难都只能直接推平吧，发生什么了？」'
  },
  {
    id: 'feixun-org-spacetrek',
    t: '深空联合（飞讯）',
    lvl: ['官'],
    def: '飞讯上的深空联合官方号，签名「共赴深空的盗火者，须以自身为炬」',
    ctx: '问「深空联合在飞讯上叫什么」「谁在发深空联合的通知」时',
    tabu: '发信人官方没写；「盗火者」是签名原文，别自己配它的意思',
    rel: ['org-深空联合', 'term-deepspace'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 29；isGroupChat=false；签名（desc）原文「共赴深空的盗火者，须以自身为炬」；官方英文名 Spacetrek Collective；conversationCount 14、messageCount 69。★库内已有「深空联合」条目（org-深空联合、term-deepspace），这里只记它在飞讯上这个号，t 加「（飞讯）」后缀是为免撞名。',
    body: '发过三类东西：给漂泊者的回复（原文开头：致最尊敬的 漂泊者：根据你提供的线索，我们已顺利锁定并控制了多处流民据点……）、重建各条公路的致谢（原文：感谢您为重建深星公路做出的贡献！）、一则讣告（原文：历史上的首位机械「昭日者」阿尔塞尼，已于七小时前确认停机。）'
  },
  {
    id: 'feixun-org-academy-news',
    t: '学院快讯',
    lvl: ['官'],
    def: '飞讯上的学院快讯号，签名「记录发现，传递真相，连接未来」；发过案件通报和换日庆典通知',
    ctx: '问「学院公告在飞讯哪个号」「学院快讯发了什么」时',
    tabu: '它署名什么、谁审的，官方没写；里面每条都当学院正式声明也不妥',
    rel: ['org-星炬学院', 'term-astrum'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 34；isGroupChat=false；签名（desc）原文「记录发现，传递真相，连接未来」；官方英文名 Academy News；conversationCount 2、messageCount 2（会话 30048 一条、32002 一条）。',
    body: '案件通报原文：「今日清晨，联合安保部门于整流车站破获一起走私与袭击案件，涉案组织成员悉数被捕。」\n活动通知原文开头：「学院活动通知 嗨，同学，等你很久啦~ 换日庆典举办在即……」'
  },
  {
    id: 'feixun-org-lightborne',
    t: '光年视界',
    lvl: ['官'],
    def: '飞讯上的「光年视界」号，签名是第四届「寻光集」的招募；官方写它是星炬学院摄影同好会',
    ctx: '问「光年视界是什么」「寻光集在哪儿报名」时',
    tabu: '它是不是官方部门号，官方只说是摄影同好会；征稿规则官方没在飞讯里给全，别替它补',
    rel: ['org-星炬学院'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 32；isGroupChat=false；签名（desc）原文「定格今天，点亮未来！第四届「寻光集」活动火热招募中~」；官方英文名 Lightborne Horizons；conversationCount 2、messageCount 100（会话 30049、30050）。',
    body: '发过一段招募，开头原文：「寻光集」征稿活动现在开启啦！星炬学院摄影同好会「光年视界」正在寻找用镜头记录闪光瞬间的你。\n同一段末尾原文：活动报名地点：深空文献中心，每日12:00-14:00'
  },
  {
    id: 'feixun-char-shorekeeper',
    t: '守岸人（飞讯）',
    lvl: ['官'],
    def: '飞讯上守岸人的号，签名「黑海岸接口人，嗯……代行中」',
    ctx: '问「守岸人的签名是什么」「她对外自称什么」时',
    tabu: '「代行中」代行的是什么官方没解释；她是不是真的接口人，别替官方下结论',
    rel: ['chars-守岸人', 'org-黑海岸'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 42；isGroupChat=false；签名（desc）原文「黑海岸接口人，嗯……代行中」；官方英文名 Shorekeeper；conversationCount 1、messageCount 11（会话 30073）。★库内已有「守岸人」条目（chars-守岸人、roles-守岸人），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「或许，只通过这样冰冷的字符，无法传达阳光本身的温暖。」「请你继续去寻找能将这个世界连接在一起的星光吧。」'
  },
  {
    id: 'feixun-char-lucilla',
    t: '洛瑟菈（飞讯）',
    lvl: ['官'],
    def: '飞讯上洛瑟菈的号，签名「风格在言语之前表达。」；25 段会话，是全快照里往来最多的号',
    ctx: '问「洛瑟菈的签名」「洛瑟菈在飞讯上说什么」时',
    tabu: '签名原文别改；她话里的换日庆典、占卜师谜题是游戏内文本，别当现实新闻',
    rel: ['chars-洛瑟菈', 'nick-losuola', 'feixun-group-runes'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 3；isGroupChat=false；签名（desc）原文「风格在言语之前表达。」；官方英文名 Lucilla；conversationCount 25、messageCount 163，是全快照会话最多的联系人。★库内已有「洛瑟菈」条目（chars-洛瑟菈、nick-losuola），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「漂泊者，关于换日庆典，我有些事想和你细聊。」「我手上有两张电影票，不知你有没有兴趣？」「长话短说，我们发现了爱弥斯频率的痕迹。」「有两个坏消息，想先听哪个？」'
  },
  {
    id: 'feixun-char-yangyang',
    t: '秧秧（飞讯）',
    lvl: ['官'],
    def: '飞讯上秧秧有两个号：一个签名「睍睆苍翮，啾啾其鸣。」，另一个写「出差中，暂时不在今州」',
    ctx: '问「秧秧在飞讯上的签名」「秧秧去哪了」时',
    tabu: '官方把这两个号都叫「秧秧」，没解释是不是同一个人的两个号；别替官方合并，也别说成两个秧秧',
    rel: ['chars-秧秧', 'roles-秧秧', 'doc-yangyang-letter', 'org-谛天鉴'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: '两个 contact：22（签名「睍睆苍翮，啾啾其鸣。」，conversationCount 3、messageCount 34，会话 30027/30028/35039）与 114（签名「出差中，暂时不在今州。大家别担心，我一切安好。」，conversationCount 2、messageCount 26，会话 36000/37012）；两个号的官方英文名都是 Yangyang。★库内已有「秧秧」条目（chars-秧秧、roles-秧秧），t 加「（飞讯）」后缀是为免撞名。',
    body: '第二个号问：「漂泊者，现在有空吗？」\n又说：「听椋羽说，你已经和谛天鉴的那位州监进入了神宫……一切还好吗？」'
  },
  {
    id: 'feixun-char-augusta',
    t: '奥古斯塔（飞讯）',
    lvl: ['官'],
    def: '飞讯上奥古斯塔的号，签名「重建事务繁忙，留言漏回请催我，急事总督宫面谈。」',
    ctx: '问「奥古斯塔的签名」「今州那边怎么找她」时',
    tabu: '「总督宫」指哪座城官方没说；她是不是总督，飞讯里没交代',
    rel: ['chars-奥古斯塔', 'world-jinzhou'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 49；isGroupChat=false；签名（desc）原文「重建事务繁忙，留言漏回请催我，急事总督宫面谈。」；官方英文名 Augusta；conversationCount 1、messageCount 7（会话 30080）。★库内已有「奥古斯塔」条目（chars-奥古斯塔、roles-奥古斯塔），t 加「（飞讯）」后缀是为免撞名。',
    body: '发过：「挚友，有在狩猎营地的篝火旁好好享受属于我们的胜利吗？」'
  },
  {
    id: 'feixun-char-suoming',
    t: '锁暝',
    lvl: ['官'],
    def: '飞讯上锁暝的号，签名「祝看到此处的各位，心驭万全。」；她请御者去梦枢天罗见面详谈',
    ctx: '问「锁暝的签名」「梦枢天罗那件事」时',
    tabu: '「心驭」指什么官方没解释；她什么身份、归谁管官方也没写，别自己配',
    rel: ['lore-mengshu-tianluo', 'feixun-char-hsin'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 128；isGroupChat=false；签名（desc）原文「祝看到此处的各位，心驭万全。」；官方英文名 Suoming；conversationCount 1、messageCount 9（会话 37015）；库内没有讲锁暝这个人的条目，只有 lore-jinmiaosuo 提过「谛天鉴成员」。',
    body: '发过：「御者，打扰了，我有一事相求。」「心月狐希望我们到「梦枢天罗」里完成一项……任务，待御者有空闲时，见面详谈。」'
  },
  {
    id: 'feixun-char-hsin',
    t: '心（飞讯）',
    lvl: ['官'],
    def: '飞讯上「心」的号，签名「狐在听，狐在说」；漂泊者在这个号里说「我和锁暝在梦枢天罗了」',
    ctx: '问「心的签名」「狐在听狐在说是谁」时',
    tabu: '官方没在这个号里点明「心」就是岁主心月狐；她说的「她」指谁也没交代，别替它指认',
    rel: ['lore-mengshu-tianluo'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 129；isGroupChat=false；签名（desc）原文「狐在听，狐在说」（无句号，原文如此）；官方英文名 Hsin；conversationCount 2、messageCount 23（会话 37016/37017）；★库内只有「鉴心」没有「心」，但为免和心声、心域那几条混，t 仍加「（飞讯）」后缀。',
    body: '回漂泊者：「御者。那你们已经见到那些幻影了？」「我也收到她发来的消息，难得见她如此柔和的语气呢。」'
  },
  {
    id: 'feixun-char-sigma',
    t: 'S.I.G.M.A.',
    lvl: ['官'],
    def: '飞讯上 S.I.G.M.A. 的号，签名「秩序零妥协，生命零风险。」；它在学院里发路况和阻断器监测',
    ctx: '问「S.I.G.M.A. 是什么」「学院路况是谁在管」时',
    tabu: 'S.I.G.M.A. 是什么身份官方没写；「智造立方」是学院设施，别把这个号当成学院部门名',
    rel: ['org-星炬学院', 'term-astrum', 'doc-traffic-regulations'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 6；isGroupChat=false；签名（desc）原文「秩序零妥协，生命零风险。」；官方英文名 S.I.G.M.A.；conversationCount 4、messageCount 13（会话 30066/30067/30068/30095）；它提过学院交通安全管理条例和智造立方。',
    body: '发过：「漂泊者同学，学院监测到你完成了一处智造立方的阻断器复位。」「漂泊者同学，我们监测到出现了一处严重的道路阻塞。」「雾漫千万路，安全第一步。」'
  },
  {
    id: 'feixun-char-galbrena',
    t: '嘉贝莉娜',
    lvl: ['官'],
    def: '飞讯上嘉贝莉娜的号，签名「全职猎魔，在线接单」',
    ctx: '问「嘉贝莉娜的签名」「谁在飞讯上接猎魔委托」时',
    tabu: '她是不是真的接单官方没说；「猎魔」在游戏里具体指什么，别自己扩写',
    rel: ['org-黑海岸'],
    src: ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json'],
    note: 'contact id 50；isGroupChat=false；签名（desc）原文「全职猎魔，在线接单」；官方英文名 Galbrena；conversationCount 1、messageCount 4（会话 30082）。',
    body: '发过：「离开黑海岸后，我还是和以前那样，寻觅、追逐、狩猎……」「不过心境相较之前发生了一些变化……」'
  },
];
