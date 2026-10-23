// 知识库元数据：页面清单、检索路由、等级枚举
// 只有这个文件和 src/entries/*.js 需要手写，html 全由 build.mjs 生成

export const LEVELS = ['官', '官衍', '考', '社', '二创', '玩', '待']

export const LEVEL_DESC = {
  '官': '游戏内明示（文本/语音/物品/成就）',
  '官衍': '官方账号 / PV / 活动页',
  '考': '可验证考据，有一手可查',
  '社': '社区通行说法',
  '二创': '同人 / CP / 玩家创作',
  '玩': '玩笑梗、社区玩梗',
  '待': '未证实、待查',
}

// 页面清单。desc 是给她看的「什么时候翻这一页」
export const PAGES = [
  { file: 'person',     title: '她是谁',       desc: '达妮娅本人、履历、语气、意象、核心关系人' },
  { file: 'lines',      title: '她说了什么',   desc: '原作台词与语音，用来对语气形状，不是台词库' },
  { file: 'plotlines',  title: '她说过的重话', desc: '她在剧情里说过的关键句，带原文行号。问她「当时说了什么」抓这一页' },
  { file: 'plot',       title: '她的故事',     desc: '主线剧情逐章节拍，带原作行号' },
  { file: 'chars',      title: '别人是谁',     desc: '她主线里的人：星炬学院师生、残星会、直接打过照面的' },
  { file: 'chars-npc',  title: '别处的人',     desc: '其他地区的角色。问今州 / 瑝珑、黑海岸、明庭那边的人抓这里' },
  { file: 'world',      title: '地方',         desc: '城市、区域、地貌' },
  { file: 'world-extra', title: '别处的地方',  desc: '不是地点的地理条目（海蚀现象、查不到位置的「一带」）与黎那汐塔系' },
  { file: 'org',        title: '组织势力',     desc: '残星会 / 新联邦 / 星炬学院 / 深空联合等，她主线的骨架' },
  { file: 'factions',    title: '阵营名录',     desc: '各个商会、家族、军团。主线里不出现，被问名字时查这里' },
  { file: 'terms',      title: '机制术语',     desc: '共鸣、频率、虚质、鸣式等最容易说错的一批' },
  { file: 'titles',     title: '官方名号',     desc: '唤取标题、满链、成就、收藏品、服饰名、PV' },
  { file: 'items',      title: '东西',         desc: '她的道具、装置、随身物' },
  { file: 'jargon',     title: '玩家黑话',     desc: '抽卡、配队、养成、深塔这些群里天天在说的词' },
  { file: 'roles',      title: '角色属性',     desc: '谁是什么属性、拿什么武器、共鸣链是什么、队里什么定位。问「X 属性 / 武器是什么」抓这里' },
  { file: 'teams',      title: '配队',         desc: '她配谁、什么体系、怎么配。问「她和谁一起上」抓这里' },
  { file: 'combat',     title: '战斗',         desc: '战斗机制、变奏延奏、排轴合轴、她的技能机制' },
  { file: 'modes',      title: '玩法',         desc: '深塔、全息、海墟、矩阵这些高难挑战怎么打、有什么规则。问「矩阵是什么/深塔怎么玩」抓这里' },
  { file: 'memes',      title: '社区梗',       desc: '整个游戏社区在玩梗。她自己的梗在 memes-her', noSrc: true },
  { file: 'memes-her',  title: '关于她的梗',   desc: '别人玩达妮娅的梗。群里最容易接的一页，接之前先看禁忌', noSrc: true },
  { file: 'nicknames',  title: '昵称绰号',     desc: '各种叫法、爱称、谐称' },
  { file: 'ships',      title: '二创 CP',      desc: '玩家配对向，非官方', noSrc: true },
  { file: 'allusions',  title: '台词出处',     desc: '游戏台词致敬的外部作品与俗语。问「这句什么意思」抓这里', noSrc: true },
  { file: 'versions',   title: '时间线',       desc: '版本号 ↔ 剧情推进 ↔ 角色登场' },
]

// 检索路由：什么问题查哪页。index.html 顶部固定展示，抓一次就够定位
export const ROUTES = [
  ['她是谁 / 她的过去 / 体内那个声音', 'person'],
  ['她刚说了什么 / 某句话的语气', 'lines'],
  ['某段剧情发生了什么', 'plot'],
  ['别的人是谁 / 谁和谁什么关系', 'chars、chars-npc、org'],
  ['某个地方在哪', 'world、world-extra'],
  ['某个组织是干什么的', 'org'],
  ['某个商会、家族、军团是什么', 'factions'],
  ['共鸣、频率、虚质、鸣式这些词', 'terms'],
  ['她的称号、成就、收藏品', 'titles'],
  ['泡泡、相册、玩偶这类东西', 'items'],
  ['社区在玩什么梗 / 秧秧神秘写信女', 'memes'],
  ['椰果 / 藕粉椰果 这类查不到出处的词（条目会写明「不是游戏里的」）', 'jargon'],
  ['别人玩她的梗 / 娅娅鸭子坐邪恶水蜜桃', 'memes-her'],
  ['深塔、专拐、大保底、传家宝这些词', 'jargon'],
  ['谁是什么属性 / 拿的什么武器 / 共鸣链', 'roles'],
  ['她和谁配 / 什么队 / 怎么配', 'teams'],
  ['战斗机制 / 变奏延奏 / 排轴 / 她怎么打', 'combat'],
  ['矩阵 / 深塔 / 海墟 / 全息 怎么玩、有什么规则', 'modes'],
  ['这句台词是什么意思 / 致敬了什么', 'allusions'],
  ['谁怎么叫她 / 绰号', 'nicknames'],
  ['CP / 配对向', 'ships'],
  ['什么时候出的 / 版本对应剧情', 'versions'],
]

// 页面尺寸硬上限：工具结果裁剪器 thresholdChars，超过只留头 4096 + 尾 1024
export const PAGE_MAX = 8192
export const PAGE_TARGET = 6000