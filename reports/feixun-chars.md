# feixun-chars —— 飞讯上那些有签名的角色号（建页报告）

来源：kb/source/yakitahome-feixun.json（官方飞讯接口快照，contacts 114 条，builtAt 2026-09-30T03:25:40+00:00，sourceVersion 3.7）
会话全文：kb/source/yakitahome-feixun-full.json（289 段）
接口：https://mc.yakitahome.com/api/feixun（实测 200，2707063 字节，schemaVersion 2，kind feixun-manifest）
落地文件：kb/src/entries/feixun-chars.js（21 条，default 导出）

## 收录口径

只收官方联系人里签名（desc）非空的号。角色号 20 个；「无音消除」宣传员（官方英文名 Echo Erase Promoter）
是活动宣传号，按机构号性质收在最后一条，id 用 feixun-org- 前缀。
签名空白的一律不收（秋鸿 113、知远 124、阿里曼 67、N.A.N.A. 59、绯雪 71、仇远 52 等几十个号）——那不是信息，只是没填。
def 就是官方签名原文，逐字抄、不改写、不加解读；官方没交代的（谁写的、什么意思、是不是角色本人在说）不替它圆。
lvl 一律 ['官']；src 一律 ['https://mc.yakitahome.com/api/feixun', 'source/yakitahome-feixun.json']。
页登记还没做——meta.js 由 lead 管，建议加：
  { file: 'feixun-chars', title: '飞讯签名', desc: '飞讯上那些有签名的角色号：他们在签名栏里写的原话。问「X 的飞讯签名是什么」抓这里' }

## 条目清单（contact id｜官方英文名｜中文 t｜库内 id｜签名原文）

- 2｜Iuno｜尤诺（飞讯）｜feixun-char-iuno｜没印象的话就重新认识吧，尤诺……这次要记好咯。
- 7｜Lynae｜琳奈（飞讯）｜feixun-char-lynae｜请支持科考摩托百日训练ε=ε=ε=ε=┌( *｀ω´)┘
- 8｜Chisa｜千咲（飞讯）｜feixun-char-chisa｜普通学生（复课版）
- 18｜Mornye｜莫宁（飞讯）｜feixun-char-mornye｜消息都会回复的，未回请稍等。
- 19｜Ronan｜罗南（飞讯）｜feixun-char-ronan｜任何时间，任何地点，隧群侦探，闪亮出现！
- 23｜KU-Raji｜库拉吉（飞讯）｜feixun-char-kuraji｜库库库，今天有什么可以帮到你？
- 35｜Trevor｜特雷弗（飞讯）｜feixun-char-trevor｜影像，是时间的切片。
- 40｜Jiyan｜忌炎（飞讯）｜feixun-char-jiyan｜岂曰无衣，与子同袍。
- 45｜Carlotta｜珂莱塔（飞讯）｜feixun-char-carlotta｜谈生意，还是交朋友……以莫塔里的名义，合作愉快。
- 46｜Cantarella｜坎特蕾拉（飞讯）｜feixun-char-cantarella｜特效药批发
- 54｜Arsenio｜阿尔塞尼（飞讯）｜feixun-char-arsenio｜我们在炉芯的照耀之下。
- 55｜Aalto｜秋水（飞讯）｜feixun-char-aalto｜AAA信息咨询服务。
- 62｜Sigrika｜西格莉卡（飞讯）｜feixun-char-sigrika｜嘤嘤鹦真的不是雪衫帝小时候！
- 74｜Aemeath｜爱弥斯（飞讯）｜feixun-char-aemeath｜学位证锐意补办中……Ow<
- 90｜Jiuwu｜久梧（飞讯）｜feixun-char-jiuwu｜凡事尽心，于己无愧，于人无咎。
- 91｜Sonija｜索尼娅（飞讯）｜feixun-char-sonija｜欢迎交流梦州话和维修工艺，不吃热海皇梨披萨。
- 93｜Baizhi｜白芷（飞讯）｜feixun-char-baizhi｜勤耕不辍，方见真章。
- 107｜Xuanqing｜璇情（飞讯）｜feixun-char-xuanqing｜心情不好就来份粘糕吧！
- 116｜Jingran｜景燃（飞讯）｜feixun-char-jingran｜人不在，《寻幽记》相关可咨询责编守词。
- 119｜Jadie｜小玉（飞讯）｜feixun-char-jadie｜你好哦，有事小玉来帮忙~ ＼(◉Θ◉)／
- 126｜Echo Erase Promoter｜「无音消除」宣传员（飞讯）｜feixun-org-echo-erase｜玩一把「无音消除」吧，就一把！

没收录的签名空白号（官方有号但没写签名，只列一部分）：星炬学院 / 学院教务系统 / 今州 / 黑海岸 / 黎那汐塔 /
深空联合预警中心 / 拉海洛路网管理局 / 极地科考站 / 外事府 / 军策府 / 梦州·玄方城 / 玄方·天工部 /
秋鸿 113 / 知远 124 / 阿里曼 67 / 仇远 52 / N.A.N.A. 59 / I.R.I.S. 60 / 绯雪 71 / 格雷厄姆 73 / 琳妮娅 75 /
泽纳斯 79 / 不明发信人 81 / 雷纳托 83 / 未知联系人 85、95、103、105、136 / 未知发信人 110、121 /
祁奚平 115 / 贝托尔特 117 / 瓦莲京娜 118 / 离纱 122 / 烛枫 123 / 落京 127 / 卫宁 106 / 维扬 108 /
约兰 111 / 洛倾 86 / 明慎台 84 / 枕流 99 / 甲大王 100 / 米莎 14 / 米洛 20 / 德莉珐 24 / 拉科萨 25 /
多蕾 26 / 基恩 27 / 哈丽雅特 33 / 白色守门人 36 / 卡提希娅 47 / 赞妮 48 / 灯灯 56 / 真夜 57 /
陆·赫斯 58 / 斯卡维兹 61 / 敏娜 65 / 穗穗 66 / 清宵 67 / 厄姆 72 / 娜碧 73 / 皮尔斯 74 / 矜 76 /
莫特斐 78 / 丹瑾 79。
（秧秧有两个号 22 / 114，都不在本页；22 收录在 feixun.js。）

## 撞名表

t 一律带「（飞讯）」后缀，为免跟已有条目撞名。库内已有同名条目的 12 个：

| 本页 t | 撞的库内 id |
| --- | --- |
| 尤诺（飞讯） | chars-尤诺、roles-尤诺 |
| 琳奈（飞讯） | chars-琳奈 |
| 千咲（飞讯） | chars-千咲、roles-千咲 |
| 莫宁（飞讯） | chars-莫宁、nick-moning |
| 忌炎（飞讯） | chars-忌炎、roles-忌炎 |
| 珂莱塔（飞讯） | chars-珂莱塔、roles-珂莱塔 |
| 坎特蕾拉（飞讯） | chars-坎特蕾拉、roles-坎特蕾拉 |
| 秋水（飞讯） | chars-秋水、roles-秋水 |
| 西格莉卡（飞讯） | rel-svigirl、roles-西格莉卡、nick-xixi |
| 爱弥斯（飞讯） | chars-爱弥斯、roles-爱弥斯 |
| 白芷（飞讯） | chars-白芷、roles-白芷 |
| 景燃（飞讯） | chars-景燃、roles-景燃 |

「心」库内没有同名条目（只有「鉴心」），但为免和心声、心域那类词混，t 写作「心（飞讯）」，note 里说明了。

## alias 说明

只给库内确实没有这个人/这个号的 9 个加了 alias：罗南、库拉吉、特雷弗、阿尔塞尼、久梧、索尼娅、璇情、小玉、无音消除宣传员。
其余 12 个不加 alias（加了就会触发跨页近名提示）；「（飞讯）」后缀本身不触发提示。

## rel 清单

chars-尤诺 / roles-尤诺；chars-琳奈 / ships-linnai；chars-千咲 / roles-千咲；chars-莫宁 / nick-moning / feixun-group-mornye；
chars-忌炎 / roles-忌炎；chars-珂莱塔 / roles-珂莱塔；chars-坎特蕾拉 / roles-坎特蕾拉；chars-秋水 / roles-秋水；
rel-svigirl / roles-西格莉卡 / nick-xixi；chars-爱弥斯 / roles-爱弥斯 / lines-about-teachers；org-黑海岸 / doc-survey-platform；
term-astrum；org-军策府；world-mengzhou；chars-白芷 / roles-白芷 / world-jinzhou；chars-景燃 / roles-景燃；
lore-xuanyuanjing / term-suizhu。
罗南、库拉吉、特雷弗、阿尔塞尼、久梧、索尼娅、璇情、小玉、无音消除宣传员：库内没有对应条目，rel 留空。

## 码点与 lint

- 本页 21 条，渲染 3663 码点（精简 1741），目标 ≤6000、硬顶 8192
- 真库 `node build.mjs --check` → EXIT=0，0 error（本页未在 meta.js 登记，条目不进 lint）
- 在 TEMP 副本里给 meta.js 补登记后复跑 → EXIT=0，0 error，本页 0 条新 ⚠
- 最长 def 28 码点

## 没圆的地方

- def 直接就是官方签名原文，没加「飞讯上 X 的号，签名「…」」那层包装（与 feixun.js 的写法不一致，要不要统一听 lead 的）
- 官方没交代签名是谁写的、什么场合用的，note 里只记事实（contact id、isGroupChat、peopleNum、官方英文名、
  conversationCount / messageCount、会话 id 与官方版本标签），不补解读
- 官方快照里未知联系人 137 的签名跟璇情 107 一模一样，官方没说 137 是谁，别当成「璇情的另一个号」
- 个人号的 peopleNum 官方记的是 0（不是 1）
- 会话 id 按号分配：尤诺和特雷弗名下各有一个 30052，别混
