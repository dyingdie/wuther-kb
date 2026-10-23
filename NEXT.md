# 知识库待办（交给下一棒）

> 这份是交接单。看 [`PLAN.md`](./PLAN.md) 知道「为什么这么建」，看这份知道「还欠什么」。
> 最后核对时间：2026-10-23。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

## 0. 一句话现状

20 页 / **275 条**（其中 4 条【待】不入正式页）/ lint 干净 / Pages 已上线。
**能用了，但有三处硬伤：两页快撑爆、主角自己那页最薄、编造防线只靠人盯。**

---

## 1. 怎么改（别搞错顺序）

```bash
cd C:/Users/28945/Documents/deepseek-harness/default-workspace/kb
node build.mjs            # 改完 src/entries/*.js 之后跑，生成全部 html + manifest.json
node build.mjs --check    # 只跑 lint 不写文件，提交前跑这个
git add -A && git commit -m "..." && git push    # push 后 Pages 自动部署
```

**改人设里的页清单要另外重投**（`personas\达妮娅.md` 第六节列了 20 个页名）：

```powershell
& "C:\Users\28945\.dsh\dsh-runtimes\dsh-plugin-desktop-primary-runtime\dependencies\node\bin\node.exe" `
  bin\dsh-onebot-qq.mjs persona use 达妮娅 --data-dir "C:\Users\28945\.dsh\dsh-onebot-qq"
```

数据在 `src/entries/*.js`，页面结构在 `src/meta.js`，模板在 `build.mjs`。
**永远不要手写 `*.html`** —— 那是生成物，下次 build 就被覆盖。

---

## 2. P0 —— 不修会出事

### 2.1 两页要撑爆了，先拆再扩

lint 现在已经在报警（阈值 `PAGE_MAX*0.8 = 6553` 码点）：

| 页 | 条数 | 码点 | 上限 |
|---|---|---|---|
| `chars` | 25 | **7726** | 8192 |
| `world` | 20 | **7705** | 8192 |

超过 8192 会被 DSH 的工具结果裁剪器**从中间截断**（只留头 4096 + 尾 1024），她抓回来就是半页废话。
建议拆法：

- `chars` → `chars`（拉海洛核心：达妮娅、西格莉卡、绯雪、娜斯塔霞、阿列夫一、弗洛洛、娜波摩、清宵、爱弥斯、千咲、莫宁、阿里曼托、艾莉亚）＋ `chars-npc`（其他地区的角���）
- `world` → `world`（地区：今州、拉海洛、罗伊冰原、黎那汐塔、穗波市、卡萨亚、黎那、悲鸣相关概念）＋ `world-extra`

拆的时候注意 `rel` 是**全库 id 引用**，拆完必须 `node build.mjs --check` 确认没有悬空。

### 2.2 编造防线现在是纯人盯的

已经翻过车三次，删掉了三条编造条目：

- `ships-wanghuang`（秧煌）—— 词源是我自己配的「秧＋皇＝漂泊者的黑海岸称号」，**真实称号是「调律者」**
- `term-yinyang-offering`（藕粉椰果）—— 这个词本身搜不到
- `org-悲鸣会` —— **我写 PLAN.md 时凭印象编的组织名**，原作只有「悲鸣」这个灾变现象

还手工批量复检过 34 个 `src` URL，查出 3 个编造/失效来源（gamersky 的两个 URL 是整段编的造物 wiki）。

**建议给 `build.mjs` 加一条 `--check-src`**：把所有 `src` 里的 http(s) 抽出来发 HEAD/GET，404/403 的报出来。
默认不跑（要联网、会慢），提交前手动跑一次。这条能省掉以后每次靠人肉抽查。

### 2.3 `person` 页最薄，而它是最该厚的

`person` 只有 **7 条 / 2420 码点**，讲的是她**自己**。而 `chars` 已经有 25 条讲别人。
按群里被问的概率，「她到底是谁/她经历过什么」远高于「珂莱塔是谁」。

要补的（素材在 `kb/source/`，已逐字存好、可回查）：

- `source/达妮娅_原文存档_v1.md` —— 角色故事五章《礼物》《荒芜》《明昼》《群魔》《谎言》＋ 93 条语音逐字底本
- `source/在熔解的夜空下.txt` —— 潮汐任务全章
- `source/影下不落的黄金.txt` —— 第三章第四幕

---

## 3. P1 —— 明显欠账

### 3.1 四条【待】（在 `todo.json`，`build.mjs` 自动汇总，不上线）

| id | 缺什么 | 怎么找 |
|---|---|---|
| `ver-early` | 1.x / 2.x 版本对应关系 | 鸣潮 官网更新公告 / wiki 版本页 |
| `lines-unknown` | 闲趣 1/2/3 语音原文（019 之外的两条） | wiki 语音页逐条翻；**抓不到就留着，别补全** |
| `combat-element-reaction` | 元素反应 / 效应系统 | 官方只承认「六种共鸣属性」，元素 Debuff 叠加目前只见于爆料 ⇒ 大概率永远该留在【待】 |
| `combat-support-role` | 协奏辅助 / 衍射辅助 | 同上，这是「查过、没查到」的占位，不是要她编 |

### 3.2 `chars` 缺一堆 NPC，`memes` 引用全是断的

`memes` / `jargon` / `allusions` 三页提到的角色，很多在 `chars` 里压根没有条目：
**吟霖、今汐、凌阳、忌炎、珂莱塔、仇远、卡卡罗、椿、丹瑾、千咲、长离、布兰特、露帕、维里奈、巴蒂尔、安可、达米安、穗波、葵、洛瑟菈、秧秧（已有）、炽霞、折枝、卡卡罗…**
（lint 查不出这种断链 —— `rel` 是 id 引用，梗页是正文里提名字。）

补的时候按地区分批，别一次全上，两页都撑爆了。

### 3.3 `terms` 缺最基础的三个术语

`悲鸣` / `鸣式` / `海蚀现象` —— 全书地基，**目前 terms 里 0 条**。
（定义：`鸣式`＝Threnodian；`悲鸣`＝索拉里斯一切灾变的统称；`海蚀现象`＝悲鸣导致的侵蚀，各地表现不同 —— 今州溯洄雨 / 黎那汐塔黑潮 / 穗波市虹光 / 拉海洛虚质磁暴。）

### 3.4 `ships` 是空页

只有 1 条 230 码点。要么补（**每条必须有 CP 依据**，不能自己凑），要么并进 `memes` 别单独占一页。

### 3.5 「熔解 / 溶解」还没归一

官方 wiki 写《在**溶**解的夜空下》，wuther.in 写《在**熔**解的夜空下》，两个二手源打架无法判定。
已定策略：**两种写法都认，别跟人争**。但 `src` 字段和 `def` 里还混着两派，需要时统一按 wiki 走并在注释里说明。

---

## 4. P2 —— 清理

- `kb/_org_raw.txt`、`kb/_fetch_orgs.ps1`、`.urls.txt` 是取材时留下的临时文件，清掉或挪 `kb/source/`
- `manifest.json` 改了没提交（`git status` 现在是 ` M manifest.json`）
- 没有 CI，`build.mjs --check` 只能手跑
- Pages 没做 sitemap

---

## 5. 素材通道（全部实测过，别重复踩）

| 通道 | 状态 | 注意 |
|---|---|---|
| `web_search` | ✅ 可用 | 早前报 `no API key for DEEPSEEK_API_KEY`，**现在好了** |
| `web_fetch` → `wuwa.huijiwiki.com/api.php` | ✅ **主力** | `prop=extracts&explaintext=1&exlimit=20&titles=A%7CB`（URL 编码）。**一次最多 4 个 titles，发 11 个会 403**；`exlimit` 被服务端强制降为 1 且模板参数被剥掉 |
| `web_fetch` → `wuwa.huijiwiki.com/w/index.php?title=X&action=raw` | ✅ 取全文 | **`/w/` 前缀必须带**，否则部分页 404 |
| `web_fetch` → `zh.moegirl.org.cn/api.php` | ✅ 一次一整页 | 只放行 `prop=extracts`；`action=parse`/`prop=revisions`/`sections`/`list=search` 全 `action-notallowed`；raw 页 / Special:Export / mobile 子站全 403 |
| `zh.wikipedia.org/w/api.php` | ✅ | 达妮娅是别名重定向，真实标题是**繁体 `達妮婭`**（pageid 9532233），查的时候带 `redirects=1` |
| `lite.duckduckgo.com/lite/?q=` | ✅ | 索引页也是客户端渲染，抓不到列表，得靠它搜具体 id |
| `read_page` | ❌ | firecrawl 免费层 429 |
| PowerShell `Invoke-WebRequest` 访问 huijiwiki | ❌ 一律 403 | **必须走 `web_fetch`** |
| `wuther.in/zh/main-story/<id>/` | ⚠️ 只能当背景 | 单页 **956 KB HTML**，工具裁剪只留头 4096 + 尾 1024，**中间恰好是正文** ⇒ 抓回来等于没抓 |
| `huggingface.co` | ❌ 超时 | |
| `baike.baidu.com` | ❌ 403 | |

---

## 6. 别做的事

1. **别自己编词源**。给一个词配「X＋Y＝Z」这种解释，最容易翻车（秧煌就是这么没的）。配不出来就标【待】。
2. **别把二手当一手**。剧情事实要一手游戏文本 + 二手社区转述各一；只有二手就在条目里写「仅二手」。
3. **别用 PowerShell `-replace` 改 JS 源码** —— 替换串里的 `` ` `` 和 `$1` 会被吃掉，已经因此抹掉过一整段 `body`。用 node 脚本改。
4. **别在 `src/entries/*.js` 的 `rel` 里写页面名**（比如 `'lines'`），lint 会当 id 查然后报悬空。
5. **`t`（标题）参与全库别称冲突检查** —— 多个页面的「用法」条目不能都叫同一个标题。
6. **单页别超 8192 码点**（`PAGE_MAX`），目标 6000。
7. `memes` / `ships` 整块在 `meta.js` 里标了 `noSrc:true`，代价是 `ctx`/`tabu` 硬必填、`lvl` 固定 `['玩']` —— 改的时候别把这两个字段漏了。

---

## 7. 自动补库（已在跑）

两个定时任务，**Asia/Shanghai 12:45 与 21:15**：
扫 `C:\Users\28945\.dsh\dsh-onebot-qq\logs\qq_chat\*.jsonl` 里她说了「我不记得了 / 忘了 / 差不多吧」之类的话
→ 取前一条当待补问题 → `web_search` → 写进 `src/entries/` 或记进 `todo.json` → `build` → `push`。

限制：**只在有会话开着的时候跑**（`schedule_list` 能看到当前状态）。
想立刻补，直接在群里问她那个问题，然后口头让我扫。

---

## 8. 她那边的验收标准

改完库之后，**在群里 @她 问一句**，看日志 `logs\qq_chat\*.jsonl` 里她的回答是不是变了。

已知三个她答错过的真实例子（`node scan-gaps.mjs` 能复扫）：

| 时间 | 群里问的 | 她答的 | 根因 |
|---|---|---|---|
| 10-22 15:40 | 娅娅，秧秧是谁 | 「我不记得了」 | `chars` 里没有秧秧（10-23 已补） |
| 10-22 13:03 | 西西听说你在虚质空间，她很伤心 | 「哈，找不到的」 | `plotlines` 里没有这条关系线 |
| 10-23 14:43 | 爱达千是什么 | 「我没玩过这游戏…」 | **半编造**，`teams` 页当时还没有 |

补完一处的标准是：**她下一次被问同样问题时，不再出现「我不记得了 / 找不到了」**。