# 瑝览类书（鸣潮官方文本检索站）API 勘察报告

站点：`https://mc.yakitahome.com`（首页是 SPA，没有可抓的 HTML 正文）
勘察日期：2026-10-23　工具：`kb/tools/yakitahome.mjs` 的 `api-meta` / `api-terms` / `api-search` 三条命令
本文里每个数字都是当天实跑出来的，没跑到的写「没调通」，不猜。

## 1. 一句话结论

- **官方术语（/api/terms）能用，而且是全库最值钱的一块**：288 条，每条都带官方版本标注和 8 语种对照。
- **中文正文检索调不通**。/api/search 只索引了 192 个文件里的 1 个（`multi_text/MultiText.json`），且那一个里翻出来的多是歌曲名和歌词。角色名、地名大面积 0 命中。**0 命中不等于游戏里没有，别当证据用。**
- 想查正文、对话、档案、物品，走结构化端点（/api/info、/api/feixun、/api/items），别指望 search。

## 2. 端点一览（当天全部 200）

| 端点 | 方法 | 体积 | 干什么 |
|---|---|---|---|
| `/api/meta` | GET | 7 KB | 192 个 json 文件清单、语种、版本差 |
| `/api/terms` | GET | 516 KB | **288 条官方术语**，带版本号 + 8 语种 |
| `/api/search` | **POST** | — | 全文模糊检索，**参数名是 `query`** |
| `/api/feixun` | GET | 1.9 MB | 飞讯：联系人、会话、表情、附件 |
| `/api/info` | GET | 804 KB | 角色/档案条目（entries + versions） |
| `/api/items` | GET | 2.5 MB | 物品表 |
| `/api/info/detail?id=<id>` | GET | — | 单条档案全文（旧工具 pull 用的就是它） |
| `/api/feixun/conversation/<id>` | GET | — | 单个会话逐条消息（旧工具 pull-conv 用的） |

试过但 **404** 的：`/data/…`、`/json/…`、`/files/…`、`/api/files`、`/api/file/…`、`/api/meta/…`、`/api`（无参）、`/index_data/search_v3_docs.jsonl.gz`、`/multi_text/MultiText.json`。
→ 原始 json 文件**拿不到**，只有上表这些端点。首页 HTML 里 grep 不到任何 api 路径。

## 3. 三个主端点的形状

### GET /api/meta
```
{ languages: [de,en,es,fr,ja,ko,zh-Hans,zh-Hant]      // 8 语
  files: [ …192 个相对路径字符串… ]
  totalFiles: 192, totalEntries: 277408
  indexMode: "experiment-sharded", searchAvailable: true, dataVersion: "3.7"
  storyProgressVersions: [{value:"1.0"},…,{value:"3.7"}]   // 1.0-1.4 / 2.0-2.8 / 3.0-3.7
  versionDiffs: { latestVersion:"3.7", previousVersion:"3.6", addedCount:15568, changedCount:2349 } }
```

### GET /api/terms（最有用）
```
{ schemaVersion, kind:"term-archive", builtAt:"2026-09-30T17:17:20+00:00", sourceVersion:"3.7",
  languages: [8 语], languageNames: {…},
  terms: [ { uid:"term:800001", debugId:"800001", version:"2.3版本",
             title, description,                    // 简体中文
             i18n: { title:{8 语}, description:{8 语} } } ],   // 共 288 条
  versions: {…}, stats: {…} }
```
- `version` 是官方标注的**首次出现版本**，格式就是「2.3版本」这种，直接可写进 versions 页标 ['官']。
- `?lang=en` 这类 query 参数**被忽略**，返回和不带一样。语种是在本地按 `i18n` 挑的。
- 日文/西语里带 `<ano=…>` 标记（关键词条），本地显示时没剥，看着有点脏，知道就行。

### POST /api/search
**参数名是 `query`。** `q`、`keyword`、`term`、`text`、`searchText`、`kw`、`s`、`words`、`content`、`phrase` 全试过，`total` 一律 0 —— 别再试了。
GET /api/search 是 404，必须 POST，body 是 JSON：`{ query, pageSize, page }`。

返回：
```
{ results: [ { f, id, anchorId, p, c, speaker, stateKey, versionTag:{firstSeen,hasChanges}, score } ],
  total, highlightTerms, page, pageSize, totalPages, mode:"fuzzy", dedupe,
  storyProgressVersion, textVersionStart, textVersionEnd }
```

## 4. 返回字段，实测含义

| 字段 | 是什么（实测） |
|---|---|
| `f` | **就是 `meta.files` 的下标**。已验证：f=128 → `multi_text/MultiText.json` |
| `id` | 条目 id，形如 `LyricsText_850064_Original`、`MusicName_12000032_Text`（多文本条目会把每个语种拼成一个 id） |
| `c` | 正文。**语言键不可信**：所有命中的 `c` 只有 `"en"` 一个键，里面装的却是中文（漂泊者 → `c:{en:"<i>好梦悠长，泊往心乡。</i>"}`）。要指定语种取不到就退到唯一那个键，并提示 —— 工具现在就是这么做的 |
| `anchorId` / `p` | 恒等（273406 / 50724 / 11882…），像是分片内位置，不是页码 |
| `speaker` / `stateKey` | 基本是 null，别指望 |
| `versionTag.firstSeen` | **有用**：这条文本最早出现在哪个版本（实测 3.5 / 3.7 / 2.7 都有） |
| `score` | **不可比**：同一次查询里出现过 0.573 / 0.809 / 1.156 / 41.261，排序别当质量分 |

## 5. 中文正文检索：未调通（重要，别再花时间试）

- **所有命中都是 `f=128`**，192 个文件里只索引了这一个。
- 抽出来翻到的 id 主要是 `LyricsText_*`（歌词）、`MusicName_*`（歌曲名）—— 也就是说多文本这块基本是曲库，不是剧情正文。
- 召回（当天实跑）：
  - 有命中：黑海岸 9、逆境深塔 3、终焉矩阵 4、残星会 9、星炬学院 4、黎那汐塔 6、共鸣者 2、你好 12、对不起 14、「的」15、「我」10、「你」10
  - **0 命中**：瑝珑、稷廷、达妮娅、丹瑾、椿
  - 1 条但明显不是正文：索诺拉（适龄提示）、华胥研究院（歌词）、虚质（适龄提示）
  - 英文反而能召回：Rover 1147、Tacet 1769、sword 1124、black coast 1457，但 `f` 仍然是 128；「a」「the」0 条，「e」139 条（匹配逻辑很怪）
- 试过但**完全无效**的参数（total 一动不动）：`mode`(exact/all)、`dedupe`、`language`/`lang`/`locale`/`targetLanguage`/`textLanguage`、`scope`、`kind`、`files`/`f`/`file`、`shard`/`index`/`shardIndex`/`shards`、`storyProgressVersion`
- `pageSize` ≤100 可以（回显 pageSize=100）；给 500 对方返回的不是 JSON。

**所以：正文、剧情、角色设定，别用 search，去 /api/info 和 /api/feixun 按 id 查。**

## 6. 192 个文件里哪些对库有用

按前缀统计（当天实跑的前 20 类，括号是文件数）：handbook 12、cook 6、advice 5、detection 5、favor 5、skillTree 5、guide_new 4、item 4、mail 4、once_tower_challenge4、payshop 4、phantom 4、skill 4、achievement 3、bag 3、calabash 3、chat 3、cycle_tower 3、generic_tips 3、menu 3。后面 172 个没逐个统计。

跟鸣潮设定知识库对得上的：
- **handbook**（12） handbook 应该是官方图鉴文字 → 角色/世界观的第一手来源
- **chat**（3）、**mail**（4）→ 飞讯与邮件原文
- **skill / skillTree**（4+5）→ 官方技能文本，本库 combat 页的机制细节该引这里
- **advice / detection / favor / generic_tips / guide_new** → 系统提示文案，可查战斗/抽卡/养成口径
- **cycle_tower / once_tower_challenge4** → 爬塔类玩法配置，可用来对照 deep tower（逆境深塔）
- **item / payshop** → 商城与道具
这些只是从文件名猜的用途，**内容没逐个打开看过**，要用得先自己抓一条确认。

## 7. 官方术语表能直接用的部分（288 条，带版本号）

抽出来对库有用的（版本号取自 term.version，均为官方标注）：
- **2.3 版本**：蜃境、黄金之歌、《金枝记》、安魂乐园、天马座
- **2.4 版本**：瑝珑、黑海岸、华胥研究院、今州、治安署、令尹、波蒂维诺堡、黎那汐塔、拉古那、隐海修会、莫塔里、贝币、英白拉多、泰缇斯、调律者、岁主「角」、玄渺真人、狮子舞、风仪拳、梦州、铜镜
- **2.5 版本**：黑潮、桑古伊斯狩原
- **2.6 版本**：狩猎
- **2.7 版本**：谛天鉴、本兵、明庭、军策府、兰台、镇抚司
- **3.5 版本**：云渊之役

**反证一条**：**逆境深塔、终焉矩阵、冥歌海墟、全息战略，四条都不在 288 条官方术语里。** 跟 wiki 上这四个词条是红链对得上 —— 反过来支持本库把这四条标【待】或 ['社']，别当官方名写。

现成的官方定义可引（原文摘录，简体）：
- 瑝珑：「位于大陆边缘，东部临海，疆域辽阔，属地共一庭六州。」
- 蜃境：「瑝珑文化中，人们将各类亦真亦假的幻境统称作"蜃境"。」
- 令尹：「令尹为瑝珑的地方行政长官，统管州内事务。」
- 今州：「瑝珑的边塞重城，其北部是直面残象潮灾害的腹地…属地共一庭六州。」
- 铜镜：「在瑝珑的传说中，镜子是能映照出真实之物。」
- 云渊之役：「当年曾在云陵谷与渊城同时爆发了规模空前的战役。经云陵谷一役，今州才终于建立了起来。」

## 8. 怎么用

```
node tools/yakitahome.mjs api-meta                 # 文件清单、版本差、语种
node tools/yakitahome.mjs api-terms 瑝珑 --lang all   # 官方术语，支持 8 语种对照
node tools/yakitahome.mjs api-terms --full          # 全 288 条
node tools/yakitahome.mjs api-search 漂泊者 --limit 5  # POST 检索，参数名 query
node tools/yakitahome.mjs pull 28050004            # 旧命令：单条档案全文
node tools/yakitahome.mjs pull-conv 32000          # 旧命令：会话逐条消息
```
常用开关：`--lang zh-Hant|ja|en|all`、`--limit N`、`--full`、`--timeout 毫秒`（默认 15000）。
联网三条并发上限 3，超时/404/非 JSON 都只打中文提示、不抛栈。

## 9. 已知坑

1. **search 参数名是 `query`**，其余名字一律 0 命中。
2. **`c` 的语言键是错的**：只有 `"en"` 一个键且装的是中文。术语表的 `i18n` 才是正常多语。
3. **只索引了 files[128]**：命中数为 0 不能当「游戏里没有」的证据。
4. **GET /api/search 是 404**，必须 POST。
5. **快速连打会被限流**：偶尔返回非 JSON，隔一两秒重试就好（工具会提示「返回的不是 JSON（多半是被限流挡了，隔两秒再试）」）。
6. **`pageSize` 别超 100**，超了对方不给 JSON。
7. **`score` 不可比**，别拿来排序或判质量。
8. **`/api/terms?lang=en` 里的 lang 被忽略**，语种要在本地按 `i18n` 挑。
9. 原始 json 文件路径全 404，想批量下原文没门，只能走这几个端点。
10. **老 bug（2026-10-23 顺手修）**：`looksZhHans()` 里写的是 `s.match(CJK_G)`，而文件里定义的常量叫 `CJK`（kb/tools/yakitahome.mjs:104）。凡是走到这个函数的离线命令（`search`、`msg`）都会 `ReferenceError: CJK_G is not defined` 直接崩。已改成 `CJK`，老命令恢复正常。
