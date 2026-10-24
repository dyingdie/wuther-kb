// lore-jinzhou —— 瑝珑与今州的旧制度与民俗（官方术语档案原文，一词一条）
//
// 收录口径：
//   只收 kb/source/yakitahome-terms.json（yakitahome 官方术语 API 快照，288 条可见词）里
//   uid 属于本页清单的官方词条，description 逐字抄进 note，不做发挥。
//   官方没写的（谁的辖区、现在还在不在、具体有几支），note 里写「官方没写」，答题时也不许自己圆。
//
// 本页 25 条（派单 25 个官方词条、跳过 1 条；另补贝币 term:850104）：
//   term:850086「夜归」——官方原文写明「夜归是今州军策府统辖的军队。夜归军下设有踏白、破阵和伏波三部」，
//   与 factions 页已有的 org-夜归军（夜归军）是同一个东西，故本页不重复建条目，
//   该 uid 记在 kb/reports/lore-jinzhou.md 里待 lead 回填。
//
// 与别的页的关系：
//   factions 收「夜归军」，org 收「军策府」「治安署」，world 收「瑝珑」，chars 收今汐、长离、丹瑾、忌炎，
//   terms 收「岁主」。本页讲的是今州一地的官制、军队编制、货币与民俗，
//   近名的地方（岁主「角」/岁主、巡尉/今巡尉、令尹/今令尹）都在 note 里写清区别。
//
// 撞名：t 与全库所有 t/alias 比对过（含近似名），25 条全库唯一；alias 一条没加（「岁主」会撞 terms 的 term-suizhu）。
//
// 渲染预算：整页 ≤6000 码点，硬顶 8192（src 与 note 不计入渲染体积）。
//   def ≤80 码点，ctx 写「什么情况下会问」，tabu 写「最容易说错的地方」。
//
// 来源：https://mc.yakitahome.com/api/terms （本地快照 source/yakitahome-terms.json）

export default [
  {
    id: 'lore-jinzhou-lingyin',
    t: '令尹',
    lvl: ['官'],
    def: '瑝珑的地方行政长官，统管州内事务',
    ctx: '问「今州的令尹是什么」「瑝珑的官制」时',
    tabu: '令尹是官职不是人名；今州这一任是今汐，别把官职和具体的人混成一条',
    rel: ['chars-今汐', 'lore-jinzhou-jinzhou-canshi'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850084（2.4版本）官方原文：「令尹为瑝珑的地方行政长官，统管州内事务。」英文原名 Magistrate。全库无同名条目。旁证：term:850128 说参事「在今汐继任前」教她理政，指的就是今州令尹这个位子。'
  },
  {
    id: 'lore-jinzhou-tiangong',
    t: '天工',
    lvl: ['官'],
    def: '瑝珑受众事台管辖、主司工程建设的民事机关，下设军武科、防事科、基建科',
    ctx: '问「瑝珑的工部」「天工部是干什么的」时',
    tabu: '天工是机关不是某个人；官方说它受「众事台」管辖，别把它当成独立一州的衙门',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850085（2.4版本）官方原文：「天工部受众事台管辖，是主司工程建设的民事机关。\n下设有军工方向的军武科、防事科，以及主要负责基础建设的基建科。」英文原名 Ministry of Development。官方没写它设在哪个州、归哪一级管。'
  },
  {
    id: 'lore-jinzhou-xunwei',
    t: '巡尉',
    lvl: ['官'],
    def: '隶属于治安署的工作人员，主要负责辖区内的治安事宜',
    ctx: '问「瑝珑的巡尉是干什么的」时',
    tabu: '巡尉是人（治安署的工作人员），巡宁所是机构；今州一州的巡尉另称「今巡尉」',
    rel: ['org-治安署', 'lore-jinzhou-jinxunwei'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850087（2.4版本）官方原文：「隶属于治安署的工作人员，主要负责辖区内的治安事宜。」英文原名 Patroller。与 term:850112「今巡尉」是两条不同的官方词条，后者特指今州地方。'
  },
  {
    id: 'lore-jinzhou-xunningsuo',
    t: '巡宁所',
    lvl: ['官'],
    def: '治安署下辖机构，负责辖区内的一般治安事务',
    ctx: '问「治安署下面有哪些机构」时',
    tabu: '「巡宁所」是治安署的派出机构，不是地名；别当成今州某条街',
    rel: ['org-治安署', 'lore-jinzhou-xunwei'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850089（2.4版本）官方原文：「治安署下辖机构，主要负责辖区内的一般治安事务。」英文原名 Patrol Station。官方没写它设在哪些地方、归谁。'
  },
  {
    id: 'lore-jinzhou-beibi',
    t: '贝币',
    lvl: ['官'],
    def: '瑝珑发行、被各大地区官方认可的通用货币；贝型外观，祖先以海贝为货币',
    ctx: '问「瑝珑的货币是什么」时',
    tabu: '官方只说了通用和外观，没给换算；别自己编汇率、物价或跟别处货币怎么折',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850104（2.4版本）官方原文：「由瑝珑发行，被各大地区的官方认可的通用货币。\n在亘古以前，瑝珑的祖先便开始使用海贝作为货币。\n随着时间推移，它的制造的工艺几经更迭，但贝型的外观却始终如一。」英文原名 Shell Credit。'
  },
  {
    id: 'lore-jinzhou-jinxunwei',
    t: '今巡尉',
    lvl: ['官'],
    def: '今州地方的巡尉，被称为「今巡尉」',
    ctx: '问「今州治安的人叫什么」时',
    tabu: '这是今州一州巡尉的叫法，跟泛称「巡尉」（治安署工作人员）不是同一条',
    rel: ['org-治安署', 'lore-jinzhou-xunwei'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850112（2.4版本）官方原文：「今州地方的巡尉，被称为“今巡尉”。」英文原名 Jinzhou Patroller。与 term:850087「巡尉」（Patroller）分列两条官方词条。'
  },
  {
    id: 'lore-jinzhou-feiyan',
    t: '飞檐',
    lvl: ['官'],
    def: '考验体力和耐力的竞技运动，在全世界范围内都很流行',
    ctx: '问「飞檐是什么」时',
    tabu: '官方只说全世界流行，没说属于哪一州、规则如何；别自己安来历',
    rel: [],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850113（2.4版本）官方原文：「飞檐是一项考验体力和耐力的竞技运动，在全世界范围内都十分流行。」英文原名 Overdash。官方没写它在瑝珑的归属和玩法细则。'
  },
  {
    id: 'lore-jinzhou-leihuangquan',
    t: '雷煌拳',
    lvl: ['官'],
    def: '渊武的独家拳术，拳风刚猛狠戾，同时讲求收放自如',
    ctx: '问「瑝珑还有什么拳法」时',
    tabu: '雷煌拳出自渊武，跟瑝珑本土的「风仪拳」不是同一家；别混',
    rel: [],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850114（2.4版本）官方原文：「渊武的独家拳术，拳风刚猛狠戾，但若想打得长久，又讲求收放自如。」英文原名 Leihuangquan。官方没写渊武在哪个州、也没写传人是谁。'
  },
  {
    id: 'lore-jinzhou-longxusu',
    t: '龙须酥',
    lvl: ['官'],
    def: '丹瑾最爱吃的甜点，因为与龙有关，被认为有吉祥祈福的寓意',
    ctx: '问「丹瑾喜欢吃什么」时',
    tabu: '它是点心，不是铺子名；「与龙有关」的由来官方没讲，别自己编',
    rel: ['chars-丹瑾', 'roles-丹瑾'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850115（2.4版本）官方原文：「丹瑾最爱吃的甜点，因为与龙有关，被认为有吉祥祈福的寓意。」英文原名 Loong Whiskers Crisp。'
  },
  {
    id: 'lore-jinzhou-suzhu-jiao',
    t: '岁主「角」',
    lvl: ['官'],
    def: '瑝珑岁主之一，今州文明的引导者；手握时序之能，岁月于祂不过泥沼浅滩',
    ctx: '问「瑝珑的岁主」「岁主「角」是谁」时',
    tabu: '官方字面是「岁主「角」」，别简化成「角」；他是瑝珑的岁主，跟英白拉多（另一位岁主）别混',
    rel: ['term-suizhu', 'world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850116（2.4版本）官方原文：「瑝珑岁主之其一，今州文明的引导者。\n威严而不容质疑的“神祇”，通晓着今州的过去、现在与将来。\n「角」手握时序之能，时流常伴其身，岁月瀚海于祂而言不过是泥沼浅滩，一朝乘云而去，只消一瞬，天地间便已日月更替，星移斗转。\n「四时有序，万物有常，是为天之道。」」英文原名 Sentinel Jué。全库已有「岁主」（terms 的 term-suizhu，泛指岁主），所以 alias 不写「岁主」；t 照官方字面抄作「岁主「角」」。'
  },
  {
    id: 'lore-jinzhou-lingyin-jinwei',
    t: '令尹近卫',
    lvl: ['官'],
    def: '保护令尹的近身侍卫人员，同时也承担部分秘书的职能',
    ctx: '问「令尹身边的近卫是干什么的」时',
    tabu: '不光是保镖，还兼秘书的活；别把他们说成普通守卫或暗部',
    rel: ['lore-jinzhou-lingyin'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850124（2.4版本）官方原文：「负责保护令尹的近身侍卫人员，同时也承担部分秘书的职能。」英文原名 Magistrate\'s Bodyguard。官方没写人数、编制与归属机构。'
  },
  {
    id: 'lore-jinzhou-beitianyuan',
    t: '悲田院',
    lvl: ['官'],
    def: '长离在明庭主持建立的慈善机构，受中央庭统一管辖，收容流民与孤儿',
    ctx: '问「长离建的什么机构」时',
    tabu: '悲田院是收容救济的慈善院，不是佛院；官方说它归「中央庭」管，别当成今州衙署',
    rel: ['chars-长离', 'lore-jinzhou-mingting'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850126（2.4版本）官方原文：「长离在明庭时主持建立的慈善机构，受中央庭统一管辖，多用来收容疫病、饥荒、残象潮中失所的流民与孤儿。」英文原名 Shelter Home。官方没写它现在还开在明庭哪里。'
  },
  {
    id: 'lore-jinzhou-xuanmiao',
    t: '玄渺真人',
    lvl: ['官'],
    def: '长离的师父，瑝珑有名的隐士大家，精通纵横捭阖，常年游历四方传道受业',
    ctx: '问「长离的师父是谁」时',
    tabu: '官方只说他是隐士与师父，没说他在哪一州、如今在哪；别替他补履历',
    rel: ['chars-长离', 'world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850127（2.4版本）官方原文：「长离的师父，瑝珑有名的隐士大家，精通纵横捭阖，常年游历四方，传道受业。」英文原名 Master Xuanmiao。'
  },
  {
    id: 'lore-jinzhou-jinzhou-canshi',
    t: '今州参事',
    lvl: ['官'],
    def: '今州令尹的策士，为令尹进言献策；在今汐继任前做她的老师，传她理政之能',
    ctx: '问「今州令尹身边有谁出主意」时',
    tabu: '参事是策士不是令尹；「在今汐继任前」指她还没当令尹的时候，别倒过来讲',
    rel: ['chars-今汐', 'lore-jinzhou-lingyin'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850128（2.4版本）官方原文：「今州令尹的策士，为令尹进言献策。在今汐继任前作为今汐的老师，为她传授理政之能。」英文原名 Jinzhou Counselor。官方没写这位参事叫什么、后来由谁担任。'
  },
  {
    id: 'lore-jinzhou-jingduhui',
    t: '竞渡会',
    lvl: ['官'],
    def: '起于夜归军内部的小范围赛事，如今是今州全民参与的军民运动竞技活动',
    ctx: '问「今州有什么全民运动」时',
    tabu: '竞渡会是赛事不是节日；官方说它起源于夜归军内部，不是祭典',
    rel: ['org-夜归军', 'world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850129（2.4版本）官方原文：「“竞渡会”一名源于今州人对“渡过鸣潮危机”的强烈信念与期盼。\n原是第一次残象潮战争胜利后，夜归军内放松心情、培养战友默契举办的小范围赛事。\n如今已成为今州全民参与的军民运动竞技活动，旨在鼓励民众强健体魄，增进军民情谊，共克时艰。」英文原名 Riverside Games。'
  },
  {
    id: 'lore-jinzhou-ruishituan',
    t: '瑞狮团',
    lvl: ['官'],
    def: '专门负责狮舞表演的游行剧团，靠接今州剧场或民间的演出邀约赚酬劳当盘缠',
    ctx: '问「今州想看狮舞找谁」时',
    tabu: '瑞狮团是受雇演出的民间剧团，不是官方机构；别和「狮子舞」那条民俗混',
    rel: ['lore-jinzhou-shiziwu'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850130（2.4版本）官方原文：「专门负责狮舞表演的游行剧团，通过接取来自今州剧场或是民间的演出邀约赚取酬劳，而这些酬劳又成了行路的盘缠。」英文原名 Liondance Troupe。官方没写它在今州城里还是四处流动。'
  },
  {
    id: 'lore-jinzhou-shiziwu',
    t: '狮子舞',
    lvl: ['官'],
    def: '寓武于舞的民俗艺术，步法与架势多以瑝珑传统拳风武术为基础',
    ctx: '问「今州有什么民俗表演」时',
    tabu: '狮子舞是舞不是拳法；它借的是瑝珑拳风，别直接说它就是「风仪拳」',
    rel: ['lore-jinzhou-fengyiquan', 'world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850131（2.4版本）官方原文：「狮子舞寓武于舞，其步法与架势多以瑝珑传统的拳风与武术为基础，是今州极具代表性的民俗艺术。」英文原名 Liondance。'
  },
  {
    id: 'lore-jinzhou-shishou',
    t: '狮首',
    lvl: ['官'],
    def: '狮子舞的一种形式，「巧首」又称「狮首」',
    ctx: '问「狮舞怎么分形式」时',
    tabu: '官方原文把「巧首」列了两次（单兵出阵与双人成行各一次），像官方自己写岔了；我只照抄，不替它圆',
    rel: ['lore-jinzhou-shiziwu'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850132（2.4版本）官方原文：「狮子舞的形式多样，既有单兵出阵「巧首」，也有双人成行的「巧首」与「磐尾」。\n「巧首」又称「狮首」。」英文原名 Lion Head。★存疑：原文里「巧首」出现两次，看着像官方文本自己写岔了，我没有替它理顺。'
  },
  {
    id: 'lore-jinzhou-xingxinghua',
    t: '星星花',
    lvl: ['官'],
    def: '代表爱和勇气的星星状花朵；「这些地上的星星总有一天会开满原野」',
    ctx: '问「瑝珑有什么代表爱和勇气的花」时',
    tabu: '官方没写它长在哪、送给谁；别编成爱情信物或某个节令的花',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850133（2.4版本）官方原文：「代表爱和勇气的星星状花朵。这些地上的星星总有一天会开满原野。」英文原名 Starflower。官方没写产地、送给谁。'
  },
  {
    id: 'lore-jinzhou-fengyiquan',
    t: '风仪拳',
    lvl: ['官'],
    def: '融合道馆核心思想、结合自然万物变化形成的瑝珑拳术，内外兼修、刚柔相济',
    ctx: '问「瑝珑的拳术有哪些」时',
    tabu: '风仪拳出自道馆一脉；跟渊武的「雷煌拳」不是同一家，别混',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850134（2.4版本）官方原文：「融合道馆核心思想，结合自然万物之变化所形成的一种内外兼修、刚柔相济的瑝珑拳术。」英文原名 Fengyiquan。官方没写是哪一州的道馆、也没写传人。'
  },
  {
    id: 'lore-jinzhou-tabai',
    t: '踏白',
    lvl: ['官'],
    def: '夜归军下设的三部之一，承担斥候职能',
    ctx: '问「今州军队里有哪些部队」时',
    tabu: '踏白是夜归军军制上的三部之一、担斥候，别把它说成独立军队或某个地名',
    rel: ['org-夜归军', 'org-军策府', 'chars-忌炎'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850139（2.4版本）官方原文：「夜归军下设有踏白、破阵和伏波三部，分别承担斥候，前锋及后卫的职能，统一由今州夜归将军忌炎统率。」英文原名 Outrider。★存疑：这段描述与 term:850086「夜归」逐字相同（官方两处用了同一段），踏白单独的介绍官方没写。三部职能按原文顺序：踏白＝斥候、破阵＝前锋、伏波＝后卫。'
  },
  {
    id: 'lore-jinzhou-benbing',
    t: '本兵',
    lvl: ['官'],
    def: '瑝珑军策府最高行政长官，总管六州军务；正式官职名「军策尚书」，本兵是雅称',
    ctx: '问「瑝珑军务最高的长官是谁」时',
    tabu: '「本兵」是雅称，正式官职是「军策尚书」；别说成两个官位',
    rel: ['org-军策府'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:260008（2.7版本）官方原文：「瑝珑军策府最高行政长官，总管瑝珑六州军务，正式官职名为“军策尚书”，“本兵”是其雅称，以表述其位高权重。」英文原名 Grand Marshal。官方没写现任是谁。'
  },
  {
    id: 'lore-jinzhou-mingting',
    t: '明庭',
    lvl: ['官'],
    def: '瑝珑都城，政治经济文化中心',
    ctx: '问「瑝珑的首都在哪」时',
    tabu: '明庭是都城；「中央庭」是悲田院的上级机构，两个名字别混',
    rel: ['world-huanglong', 'lore-jinzhou-beitianyuan'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:260009（2.7版本）官方原文：「瑝珑都城，政治经济文化中心。」英文原名 Mingting。官方没写它在瑝珑的地理方位。'
  },
  {
    id: 'lore-jinzhou-lantai',
    t: '兰台',
    lvl: ['官'],
    def: '瑝珑三法司之一，有重大案件联合审理权和监察权；官员称御史，在六州流动或常驻的称监察史',
    ctx: '问「瑝珑的监察官叫什么」时',
    tabu: '兰台是机构（三法司之一），御史、监察史是官衔；别把兰台当成某个人',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:260011（2.7版本）官方原文：「瑝珑三法司之一，除了享有重大案件的联合审理权之外，还享有监察权，即所谓“纠察邪佞，肃正纲纪”。一般兰台之中大小官员皆称御史，在六州流动或常驻的监察官员则称为六州监察史。」英文原名 Censorate。官方没写另外两司是哪两个。'
  },
  {
    id: 'lore-jinzhou-beibi',
    t: '贝币',
    lvl: ['官'],
    def: '瑝珑发行、各地区官方认可的通用货币；远古时瑝珑的祖先拿海贝当钱，工艺几经更迭，贝型外观始终如一',
    ctx: '问「瑝珑用什么钱」「这游戏的货币是什么」时',
    tabu: '贝币是货币，不是护符或道具；官方只说它是通用货币，没说现在各地还通不通、怎么结算',
    rel: ['world-huanglong'],
    src: ['https://mc.yakitahome.com/api/terms', 'source/yakitahome-terms.json'],
    note: 'uid:term:850104（2.4版本）官方原文照抄：「由瑝珑发行，被各大地区的官方认可的通用货币。在亘古以前，瑝珑的祖先便开始使用海贝作为货币。随着时间推移，它的制造的工艺几经更迭，但贝型的外观却始终如一。」英文原名 Shell Credit。',
  }
]
