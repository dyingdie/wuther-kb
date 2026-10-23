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
  { file: 'plot',       title: '她的故事',     desc: '主线剧情逐章节拍，带原作行号' },
  { file: 'chars',      title: '别人是谁',     desc: '其他角色。群里被问最多的其实是别人' },
  { file: 'world',      title: '地方',         desc: '城市、区域、地貌' },
  { file: 'org',        title: '组织势力',     desc: '残星会 / 新联邦 / 星炬学院 / 深空联合等' },
  { file: 'terms',      title: '机制术语',     desc: '共鸣、频率、虚质、鸣式等最容易说错的一批' },
  { file: 'titles',     title: '官方名号',     desc: '唤取标题、满链、成就、收藏品、服饰名、PV' },
  { file: 'items',      title: '东西',         desc: '她的道具、装置、随身物' },
  { file: 'memes',      title: '社区梗',       desc: '社区玩梗。接之前先看语境和禁忌', noSrc: true },
  { file: 'nicknames',  title: '昵称绰号',     desc: '各种叫法、爱称、谐称' },
  { file: 'ships',      title: '二创 CP',      desc: '玩家配对向，非官方', noSrc: true },
  { file: 'versions',   title: '时间线',       desc: '版本号 ↔ 剧情推进 ↔ 角色登场' },
]

// 检索路由：什么问题查哪页。index.html 顶部固定展示，抓一次就够定位
export const ROUTES = [
  ['她是谁 / 她的过去 / 体内那个声音', 'person'],
  ['她刚说了什么 / 某句话的语气', 'lines'],
  ['某段剧情发生了什么', 'plot'],
  ['别的人是谁 / 谁和谁什么关系', 'chars、org'],
  ['某个地方在哪', 'world'],
  ['某个组织是干什么的', 'org'],
  ['共鸣、频率、虚质、鸣式这些词', 'terms'],
  ['她的称号、成就、收藏品', 'titles'],
  ['泡泡、相册、玩偶这类东西', 'items'],
  ['社区在玩什么梗 / 秧秧神秘写信女', 'memes'],
  ['谁怎么叫她 / 绰号', 'nicknames'],
  ['CP / 配对向', 'ships'],
  ['什么时候出的 / 版本对应剧情', 'versions'],
]

// 页面尺寸硬上限：工具结果裁剪器 thresholdChars，超过只留头 4096 + 尾 1024
export const PAGE_MAX = 8192
export const PAGE_TARGET = 6000