# 知识库待办（交给下一棒）

> 这份是交接单。看 [`PLAN.md`](./PLAN.md) 知道「为什么这么建」，看这份知道「还欠什么」。
>
> 🚨 **2026-10-23 补：渲染层改过之后最容易犯的错——防误读的信息必须落在 `def` / `ctx` / `tabu` 里，写进 `note` 等于没写。**
> `src` 和 `note` 已经不上页面了，她抓页只会看到 `t`/`alias`/`lvl`/`def`/`ctx`/`tabu`/`body`（精简版只有 `t`/`alias`/`lvl`/`def`/`tabu`）。
> 所以：**同词两义、版本先后、别跟哪个搞混**——这类东西一律进 `tabu`；**她能直接说出口的那句**进 `def`/`ctx`。`note` 只写给维护的人看（出处 uid、检索式、负向记录、⚠️ 未核）。
> 实例：`term-jianyi-effect` 的「震谐」既是负面状态名、又是偏谐路线，originally 只写在 note 里，页面上完全看不见。
> 🚨 **2026-10-23 晚新增铁律：`edit` 的 `old_string` 必须是完整整行**（含缩进与结尾逗号）。拿半行尾巴当锚点、替换时没把要保留的内容包进去，那段会被吃掉，后面跟着的 `'` 和 `` ` `` 一起散架。
> 症状是 `SyntaxError: Unexpected end of input`。**写完任何 .js 立刻 `read` 回来核对行数——行数比预期少就是吃字，当场停。** 当天 `versions.js` 因此连炸两次、整个库停工十几分钟。
> 反例的正确写法见 `versions.js` 里 `ver-30`…`ver-anniv` 那六条：一条一 edit、整行 anchor、每次核对 +11 行。
> 最后核对时间：2026-10-23 晚。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

> 🚨 **2026-10-23 深夜：huijiwiki 一直能抓——以前说的「一律 403」是入口选错了。**
> 正确姿势：`web_fetch` 打 `https://wuwa.huijiwiki.com/w/index.php?title=<标题URL编码>&action=raw`，**返回 200**，拿得到全文 wikitext。
> 三条要记死的：
> 1. **必须带 `/w/` 前缀**。`/wiki/X` 直链 404，`/w/index.php?title=X&action=raw` 才对。
> 2. **node fetch 那条路对 huijiwiki / 萌娘百科 / 百度百科仍然全 403**（带 Chrome UA 也一样）。所以 `build.mjs --check-src` 在本机只剩 404 信号，**但这不代表页面抓不到**——别再拿 403 当「拿不到 wiki」的结论，那会白白欠一堆人工核。
> 3. **重定向词条照样有用**：wiki 里「巴德尔」「隧者」两个词条正文只写 `#重定向 [[「拉海洛」]]`，照样能证明这两个词指向同一个页面。
> 教训记在这：**本机某条路 403 ≠ 那个源不存在**。下回再遇到「取不到」，先换 `web_fetch` 试一遍再下结论。
> 最后核对时间：2026-10-23 深夜。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

> 📌 **收全某一类东西，别用关键词搜索，用分类页。**
> splitter 实例：搜「军团」返回的 `不归孤军` / `骇行` / `钧天正音` **全是武器**，差点当军团收进 factions 页。
> 正解是拉 wiki 的 `分类:组织`（33 条全量）再逐条筛。`分类:星炬学院的社团与同好会` 22 个社团同理——薄，但至少全。
> **关键词搜索会把同字异物的条目混进来，分类页不会。** 所有「把某类东西一次收全」的活都照这个路子。
> 顺带一条：`rel` 的 id **一律带页面前缀**（`world-huanglong`、`org-残星会`），裸 id 不存在。写之前 grep 一次比记清单可靠。

> 🚨 **2026-10-24 凌晨：pagecheck 真验收查出的结论——瓶颈是内容不是排序。**
> 拿 QQ 日志里 29 条真实提问跑 `tools/pagecheck.mjs`，干净命中率只有 **63%**。srccheck 改了排序规则（句首称呼摘掉、问题类型优先于人名、降权有豁免），命中率升到 **77%**，⚠️ 8→5。
> 但剩下 4 条**排序救不了**：「这个就是达妮娅的属性吧」「西格莉卡提升怎么样」这类问句，**库里压根没有任何页面能命中**——没有属性表、没有养成数值。**调权重变不出一个不存在的答案。**
> 因此 2026-10-24 新开 **`roles` 角色属性页**（一人一条：属性+武器+队里定位）。报告在 [`reports/pagecheck-accuracy.md`](./reports/pagecheck-accuracy.md)。
> 最后核对时间：2026-10-24 凌晨。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

> 🚨 **2026-10-24：`.github/workflows/ci.yml` 推不上去，别用 `git add -A`。**
> push 被拒，原话：`refusing to allow a Personal Access Token to create or update workflow '.github/workflows/ci.yml' without workflow scope`。
> **本机 git 用的 PAT 没有 `workflow` 权限**。CI 文件在磁盘上、没进版本库；那一版内容 commit 已经绕开它推上去了（`27a7960`）。
> **要发版时只 `git add` 具体文件，绝不用 `git add -A`** —— 一把把 `ci.yml` 重新捞进去，push 就又炸。
> 想让 CI 真正上线只有一条路：**换一个有 `workflow` scope 的 PAT**（GitHub → Settings → Developer settings → Personal access tokens → 勾 workflow），换完再单独提交那一个文件。
> CI 本身只跑 `build.mjs --check`（不跑 `--check-src`，因为出口 IP 对 wiki 全 403 会误报一片）。

> 🚨🚨 **2026-10-24 中午：P0 —— 群里那个 bot 读的是一份过期克隆，库改了它也看不见。**
> `kb-local` 插件的库目录**不是** `default-workspace\kb`，而是 `C:\Users\28945\.dsh\dsh-onebot-qq\workspace\wuther-kb`（一个 git clone）。
> 实测：库里建了 `feixun` 等 13 个新页，`mcp__qq__kb_read({page:'feixun'})` 仍返回「库里没有 feixun 这一页」——它只有 24 页、`src/entries` 只有 24 个 .js、HEAD 停在 `2219dbe`（10-23 21:33）。
> **所以「库里写了」≠「她能答上」。每轮发版后必须多一步：把 clone 拉上来。**
> ```
> git -C "C:\Users\28945\.dsh\dsh-onebot-qq\workspace\wuther-kb" fetch origin
> git -C "C:\Users\28945\.dsh\dsh-onebot-qq\workspace\wuther-kb" merge --ff-only origin/main
> ```
> 🚨 **2026-10-24 晚更正：不是 TTL 的问题，真凶是 ESM 缓存。**
> 插件用 `await import()` 读 `src/meta.js` 与 `src/entries/*.js`，Node 的 ESM 模块缓存按 URL 走 —— **改过的 .js 她永远读不到，只有新建的文件能进来**。已改 `plugins/kb-local/kb-core.js` 两处，import 时带 `?v=<mtimeMs>` 破缓存（源文件与运行副本是同一个 inode，改一处两处都生效）。**但跑着的 bot 进程内存里还是旧模块，要重启 bot/插件进程才生效**；DSH 桌面端没找到 reload 入口。目录在 bot 启动时固定，别指望改配置热加载。
> 🚨 **2026-10-24 晚 21:15 补库轮次：只补上一条真缺口。**
> 扫 7 个日志文件 7143 行，她说了「我不记得 / 忘了 / 差不多吧 / 查不到」共 9 条，逐条看下来**只有一条是真设定缺口**：
> · 「真的亲人吗？」（2026-10-23 04:04 群里问的是**娜波摩算不算亲人**）→ 她答「…差不多吧…谁说得准呢…」。查证：`source/在熔解的夜空下.txt`、`source/影下不落的黄金.txt` 全文「亲人」**0 次**；`source/yakitahome-info-full.json` 里 5 次全是无关文书（矿场安全守则「不要相信亲人的呼唤声」、流浪猫公告）；官方文本里娜波摩只以**导师/监护**姿态出现（「娜波摩……她说得对，小家伙……也许你的确还有转机」「你必须学会接受它，融入祂」），西格莉卡说「唯一一张合照，还是娜波摩拉着你拍的」。**「亲人」这一层只来自人设 `AGENT.md`**。
> → `person/rel-nabomo` 的 def 改成「她认的亲人——」，tabu 写死「**「亲人」这一层是她自己认的**，底本和 wiki 都没写亲属关系，照实说「我认的亲人」就行，别说成官方写明」。她下次被问能答「我认的亲人」，而不是「差不多吧」。
> 顺手校了 `rel-feixue` 的关系定性：她来自**深空联合特别对策组**，底本里**站在对面**（一直监视她），{PlayerName} 说「绯雪只是在履行自己的职责。而且，她是个很温柔的人」——问她跟绯雪什么关系，按底本说「对面的人、也是当初救过她的人」，别顺口说成一家人。
> 其余 8 条不是缺口：「娅娅，秧秧是谁」（已补 `chars-npc/秧秧`）、「为什么不能叫你娅娅」（人设「叫我达妮娅」）、「藕粉椰果」（词条早删了）、「这期有五万八」（矩阵分数口径打架，tabu 已写死别断言满分）、「现在还在学吗」「不知道怎么还回复这么久」「区是什么意思」（元话题）、矩阵是什么（她答了，`modes` 页现在更准）。
> 🧹 **同轮还瘦身了 `person` 页**：`person-exit-procedure`（官方档案 28050004《达妮娅的生日行程》）整条搬到 `docs-2`，id 改 `doc-exit-procedure`（**它是文书，不是「她是谁」**），`items.js` / `plotlines.js` 四处 rel 同步改名。**person 17 条 / 5595 码点，docs-2 24 条 / 5765 码点——现在全库没有一页超 6553 警戒线**（最大是 `roles` 6354）。
> 插件的 `index.js` 工具描述**硬写着「24 页」和旧页名清单**（源：`default-workspace\plugins\dsh-onebot-qq-main\plugins\kb-local\`；运行副本：`C:\Users\28945\.dsh\profiles\desktop\node_modules\dsh-onebot-qq\plugins\kb-local\`）——**两处都要改**。
> 最后核对时间：2026-10-24 中午。库在 `https://dyingdie.github.io/wuther-kb/index.html`。
>
> ✅ **同日 12:10 已修完**：①`git merge --ff-only origin/main` 同步了那份 clone（24 页 → 37 页，`src/entries` 37 个 .js），实测 `mcp__qq__kb_read({page:'feixun'})` 已能读出 8 个飞讯群；②插件的 `kb_search` / `kb_read` 工具描述改成**现算**页数与页名（`availablePages(dir)`），不再写死「24 页」，改完不用再手改；③人设两份（`达妮娅.md` / `AGENT.md`）都改成 37 页并补了新页路由，已重投人设；④两条定时任务的 prompt 里加了这三步：逐文件 `git add`、push 后同步 clone、别再往 `terms` / `chars-npc` 塞条目。
>> 🚨 **2026-10-23 深夜：玩法页 `modes` 上线（矩阵/深塔/海墟/全息），群里最常问的那块补上了。**
> 来源全在 [`source/modes-research-2026-10-23.md`](./source/modes-research-2026-10-23.md)，四份报告在 `reports/modes-page.md`、`reports/modes-jargon.md`、`reports/matrix-jargon.md`、`reports/modes-versions.md`。
> **一、四个玩法的正式名，wiki 上根本没有词条**——`srsearch` 查「终焉矩阵 / 稳态协议 / 奇点扩张 / 冥歌海墟 / 全息战略」全部无命中；搜「矩阵」只命中两把 1.0 三星音感仪（暗夜矩阵·暝光、远行者矩阵·探幽）。
> **全库唯一出处＝wiki「梗/黑话」页副本关卡段那一行**：矩阵＝终焉矩阵、深塔＝逆境深塔、海墟＝冥歌海墟、全息＝全息战略。只有这一层敢标 `['官']`。
> **`逆境深塔` 是两义词，tabu 已写死**：wiki 上那个词条是**世界观**——瑝珑正在开发的人工蜃境战力演算项目、实验场由华胥研究院稷廷遗址改建，跟爬塔玩法毫无关系。反证收在 `ver-tower-lore`（`['官']`，抄了 wiki raw 原文）。
>
> **二、等级口径**（这一块最容易翻车）：
> - `['考']`＝wuthering.gg 正文逐字：稳态协议最多三队、奇点扩张无上限且敌人按列表顺序循环并增强、**积分按对敌伤害量结算**、深塔四大区/疲劳值/深境干扰/实验周期/深境记录与深塔兑换所。
> - `['社']`＝TapTap UP 秦白叶那篇 + 233乐园转载标题：海墟分层与信物、400 星声/8 BOSS、1680 星声、逃课/凹分/车皮/一穿五/S1S2/大改。
> - **官方公告原文零**——3.0 首发、3.2 第一阶段、3.5「第二挑战周期·险境强袭」全是媒体转述公众号，标 `['社']` 且 note 点名。
>
> **三、矩阵积分满分查不到，三个数差一个量级**：5000 / 7025 / 77755（另有 10200、10672、13000、16134、5.8 万…），**跨赛季跨阶段（稳态 vs 奇点）不可换算**。wuthering.gg 只说「按对敌伤害量结算」，官方上限一条没查到。**tabu 已写死「别编满分、别换算」**——上一轮「聚爆」就是标 `['官']` 翻的车，别再犯。
> **四、「挑战周期」≠ 社区「S1/S2」**：官方（17173 转述）叫「第二挑战周期·险境强袭」，玩家叫 S2，两边被当同一件事用，一边公告用语一边社区分期，**别画等号**。
>
> **五、这轮明确没做、也不许替她补的**：
> 1. `modes-hologram-rules`（全息战略规则）留 **【待】**——只确认五个分关卡页存在（速攻·飞檐·致爆·竞雪·刀伶之舞），正文没取到。
> 2. `j-diedao` 垫刀查不到（wiki `insource` 0 命中、梗/黑话页 raw 没有），留 **【待】** 占位。
> 3. **海墟「2.1」不跟**：素材 §3:160 把「2.1 的钳形激战衍生」列成硬事实，但秦白叶原文里 2.1 一次都没出现，只写「钳形激战衍生」。
> 4. **深塔没有无尽层的证据**——只查到海墟有，深塔那边零材料，`j-wujin` 单边记录。
> 5. 英文名 Endstate Matrix / Stability Accords / Singularity Expansion 只有英文攻略站有，**没写进任何条目**。
> 6. 角色黑话 `01忌炎`/`5R`/`8r`/`10喷5r`/`一穿五` 一个权威解释都没查到，没建条目。
>
> **六、没抓到 ≠ 不存在**（老教训，本轮再验一次）：贴吧跳百度安全验证、米游社、Hoyolab 本轮**零证据**；B 站 `api.bilibili.com/.../search/type` 返回 0 条；enjoygm（Nuxt 正文没渲染）+ 两个 TapTap 帖只到标题摘要。引用它们时只当标题，别当逐字正文。
> wiki `srsearch=终焉矩阵` 命中里有条「终焉沉落」**没取正文**，无法判断是否相关。
> 最后核对时间：2026-10-23 深夜。库在 `https://dyingdie.github.io/wuther-kb/index.html`。
>
> 🚨 **2026-10-24 凌晨：官方术语源上线（mc.yakitahome.com），新增 5 页，全部是官方文本逐字，不是社区整理。**
> 用户原话：给了 `https://mc.yakitahome.com/terms`（瑝览类书），要「丰富知识库」。
> **新增 5 页**（`meta.js` 已登记，共 29 页）：
> - `terms-official` 官方机制词（四型共鸣者、超频、拉贝尔检测法、二次共鸣、虚质防壁、炉芯…）
> - `terms-story` 官方剧情专有名词（剧本、彼世、归源之仪、隧群、换日仪式…）
> - `lore-terms` 官方新世界观名词（3.5/3.6/3.7 三版：咎笼、偃师、宿镜、心钥井、朝月会、玄方地界…）
> - `battle-terms` 官方战斗与状态术语（震谐、集谐/集谱、光噪、电磁、异常、增益、吸血、反伤…）
> - `docs` 官方档案文书（条例、日志、信件、纸条、鉴定报告：星炬学院新闻报、暗面调查报告、西格莉卡的日记、秧秧的信、深空测界台）
>
> **这轮立下的规矩**：
> 1. **官方 API 现在能用，可以做逐字核对**——`/api/info` 能取档案全文，官方词条可回填 uid。
> 2. **中文正文检索没调通**，接口参数不是 `q`；**`/api/search` 有严格限流：连打 16 次后 429，间隔必须 ≥2.5 秒**。
> 3. **官方术语真实缺口 104 条**（总表 288 条，uid 级引用 84 条）——别以为「官方源」就是「全收完了」。
> 4. **`hidden` 那 343 条拿不到**（要登录/权限），别在报告里写它们的内容。
> 5. **飞讯有 104 个联系人**（人物 vs 群/组织混在一起，要分家另立页）。
> 6. **`N.A.N.A.` 是官方文本里的代号，且官方文本把 N.A.N.A. 与达妮娅写成两个**——一手证据 `source/在熔解的夜空下.txt:163-166`（说话者字段写着 N.A.N.A.）、`:230`「连N.A.N.A.都觉得无从下手」、`:1140` 阿里曼「N.A.N.A.正在对达妮娅进行检查」、`source/影下不落的黄金.txt:1422` 达妮娅自己「受伤了的话请呼叫N.A.N.A.」。**所以库里的口径是「代号」，不是「达妮娅的代号」——`nicknames` 页已按这个改。
> 7. **渲染页不吃 `src`/`note`，所以 `note` 不占码点预算**——重要出处往 `note` 塞，省体积。
>
> **这轮踩的坑**：远端有**定时补库任务**会自动推进 `main`（`2219dbe`「补『英白拉多』『岁主』两条设定条目」、`65217ff`「auto: 补 2 条＋加厚 rel-floro」）。push 会被拒（fetch first）。
> **正解：`git pull --rebase origin main`，冲突只会出现在生成物 `index.html` / `manifest.json`——生成物冲突直接 `git checkout --theirs` 再重新 `node build.mjs` 覆盖，**别手改生成物**。src/entries/*.js 会自动合并成功。
> 合并后条数 693 → **695**，chars-npc 41→42 条 / 7241→**7565 码点**，terms 6512→**6720 码点**（两条都过 6553 提示线，仍在 8192 硬顶下）。
> **push 还可能被远端 Internal Server Error 拒一次，重试即可。**
>
> 📌 **Pages 部署有延迟**：push 成功后新页可能 404 好几分钟（`terms-official.html` 等 5 个全 404，而线上 index 已是旧版新内容）。**别急着改配置——等几分钟重测（加 `?v=N` 绕缓存）**。2026-10-24 凌晨实测延迟约 3~5 分钟，之后 5 个新页全部 200。
> 最后核对时间：2026-10-24 凌晨。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

> 🚨 **2026-10-24 晚 22:13：wiki 的「角色 / 技能详情」页能抓官方机制词——新角色机制的正规出处。**
> `web_fetch` 打 `https://wuwa.huijiwiki.com/w/index.php?title=心/技能详情&action=raw` → 200，拿到**全套官方技能文本**（霆心域、共鸣模态·同奏/·电磁、电磁爆发与电磁效应、应世相/照世相、敛华障、灯同辉…）。
> 本轮据此把 3.7 的心从「只有名字」补成有官方机制词的条目（`battle-terms` 新增 3 条，lvl 用 `['官']`），社区叫法「心配队」记进 `jargon`（`['社']`，wiki 无此词）。
> 两条踩坑：①**同一 URL 连抓会撞 Cloudflare 挑战页**（返回 HTML 不是 wikitext），本轮重试到第 3 次才干净 → **抓完必须断言关键词在正文里**（用「霆心域」+「__NOREC__」判定），别把挑战页当正文存进 `source/`。
> ②官方 `source/yakitahome-terms.json`（288 条）与 `source/yakitahome-info-full.json`（722 条文书）里**都没有**这些词 → **官方术语表 ≠ 官方机制词全收完**；官方机制词要去 wiki 技能详情页找。
> ⚠️ **2026-10-24 晚 22:30：`github.com:443` 连不上**（三次 `Failed to connect to github.com:443 after 21077 ms`），而 Pages `dyingdie.github.io` 正常 200 → **只有 github.com 不通，别的网没事**。
> **GitHub 挂掉时的绕法（走本地路径，不用网络）**：`git -C "C:\Users\28945\.dsh\dsh-onebot-qq\workspace\wuther-kb" fetch "C:\Users\28945\Documents\deepseek-harness\default-workspace\kb" main` 再 `merge --ff-only FETCH_HEAD` → QQ 机器人那份克隆照样能更新（本轮已验证）。
> 最后核对时间：2026-10-24 晚 22:30。库在 `https://dyingdie.github.io/wuther-kb/index.html`。

> ---

## 0. 一句话现状

**42 页 / 917 条**（其中 9 条【待】不入正式页）/ lint 干净（**10 条 ⚠，全是跨页别称撞名；没有码点软警戒了，全库最大页 `roles` 6354 码点**）/ **2026-10-24 晚 22:13 又加 4 条**（3.7 心的官方机制词 3 条：霆心域 / 电磁爆发与电磁效应 / 共鸣模态·同奏与·电磁；社区叫法「心配队」1 条，commit `7196755`）——⚠️ **写这批时 github.com:443 连不上，push 没推上去，线上还是旧的**；clone 已用本地路径 fetch 同步到 7196755。⚠️ **她读不读得到改动是另一回事**——ESM 缓存的坑见文首 P0，这轮改的是已存在的 .js（jargon/battle-terms/roles-2），**要重启 bot 进程**。
官方术语 288 条已全部收进库：新建 `feixun` / `feixun-chars` / `old-lore` / `lore-jinzhou` / `lore-laguna` / `lore-qiqiu` / `lore-blacktide` / `lore-late` 八页，只剩 5 条没建（猎犬/海蚀/夜归＝库内已有条目只差 uid 回填；`星星`、`类别` 是字段名不建）。（猎犬/海蚀/夜归＝库内已有条目只差 uid 回填；`星星`、`类别` 是字段名不建）。
上一版的三个硬伤（两页撑爆、主角那页最薄、编造防线只靠人盯）**都已修完**，见第 2 节。

**新增 5 页（瑝览类书官方源）**：`terms-official`（官方机制词）/`terms-story`（官方剧情专有名词）/`lore-terms`（官方新世界观名词）/`battle-terms`（官方战斗与状态术语）/`docs`（官方档案文书），见文首「瑝览类书官方源上线」。
**2026-10-24 下午又加 5 页**：`chars-npc-2`（飞讯里冒出来、别处查不到的 20 人）、`chars-archive`（官方档案里只露过一面的 8 人）、`roles-2`（16 人属性武器，连 `roles` 共 53 人）、`docs-2`（官方文书 23 条）、`terms-disaster`（灾变与侵蚀 21 条，从 `terms` 拆出）。同轮还瘦身了 `chars-npc`（44→34 条 / 7557→5280 码点）与 `terms`（47→26 条 / 7206→3417），并把 `roles.js` 里 21 处「本库 N 个」计数按 53 人口径重算。
再往前一轮新增第 24 页 `modes`（矩阵/深塔/海墟/全息）——群里天天聊矩阵，这轮按 wiki 梗/黑话页那行正式名 + wuthering.gg 机制 + 社区攻略补齐，见文首「玩法页 modes 上线」。

**当前最实在的欠账**：①群里扫 71 条真实提问，10 条没命中——逐条分类后**只有一条是真缺口**（「鸣潮群里椰果是什么意思」，已补），其余是抱怨、玩梗、问别的游戏、或有意不指页；②`chars` / `chars-npc` 还有没立条目的主线人物；③官方术语里还有 **8 条 uid 级引用没回填**（见第 4 节）。
其余的（CI 上线）卡在一个只有人能点的 PAT 上，见第 6 节。


---

## 1. 【2026-10-23 大改】渲染层：出处和备注不再上页面

用户原话：「我审核只关注内容……这个知识库主要目的是让 ai 知道这些信息和知识，不需要考虑我审核这个方面，可以优化很多内容，提高效率。」

改动都在 `build.mjs` 的渲染段：

1. **词条不再输出 `src` 和 `note`**，只渲染 `t / alias / lvl / def / ctx / tabu / rel / body`。
   改动前 src+note 占渲染页 **57%** 体积，而她答话一个字用不上——那是给维护者的凭据，源码和 git 历史里一直都在。
2. **每页多生成一份 `<页名>.lite.html`**：只留 `t / alias / lvl / def / tabu`，去掉 ctx/rel/body。全站精简版合计 38157 码点，是知识页的 59%。
3. **撞名检查分级**：同页内两个词条同名 = **err**（重复条目）；跨页同名 = **warn**（terms 讲「星炬学院」这个术语、org 讲这个组织，本来就该都有）。
   ⚠️ **跨页 warn 一律不用消。** 2026-10-24 有人提议把 `teams.js` 里 4 条 `attr-*` 删掉（内容已在新出的 `roles` 页），被我否了：两个角度不是重复（teams 讲「她在队里是什么」、roles 讲「这人本身什么属性」），删的收益只是消 warn，成本是改 rel + 以后两处同步。**只有同页内同名才是错。**

> 🚨 **2026-10-24：查重、找锚点，一律先用不带缩进的 grep。**
> 今天三个 agent 在同一类地方栽跟头：gloasser 拿两条一模一样的 `  tabu: '...'` 当 old_string（匹配 2 次报错）、biographer 丢了一个闭合反引号、splitter 丢了一行 `  },`。**缩进敏感的行当锚点最危险。**
> 正确顺序：**先 grep 不带锚点确认唯一 → 再决定用不用整行当 old_string**。glosser 也因为用四空格缩进锚点查重，漏掉 factions 页已有的两条条目，改用无锚点重扫才发现。

**效果**：单页最大从 7726（贴着 8192 上限，随时会被裁剪器从中间截断）降到 4954，全站 64934 码点。

⚠️ **没删的机制，一个都没删**：`--check-src` 死链检查、本地底本行号校验、别称冲突、rel 悬空——全都在读**源码字段**，跟渲染层无关。

### 🚨 由此推出一条：什么才占页面体积

**渲染层改过之后，页面上真正占码点的只有六个字段：`t` / `alias` / `lvl` / `def` / `ctx` / `tabu` / `rel` / `body`。**
`src` 和 `note` **写多长都不占页面**——哪怕全删光，页码点一个数都不动。
（实测：`plot.js` 5876 码点，把 `src` 全删仍是 5876。biographer 复刻 `build.mjs:116-127` 验的。）
**所以要压码点，只能动 `def` / `ctx` / `tabu` / `body`——而这三个正是最不该砍的。** 这条推论改变了压码点的全部讨论：默认为「不压」，真要压必须先问「为什么」。

### 🚨 新铁律（最容易踩的一条）

**页面上没有出处了，不等于不用写 `src`。**

`src` 字段在 `src/entries/*.js` 里**照写不误**：本地文件行号校验要它、`--check-src` 死链检查要它、出处可追溯要它。少写等于把防线拆了，只是不再渲染给人看而已。

同理 `note` 可以写短，但 ⚠️ 未核标记、否定性记录（「物品表里没这个名字」这类）**要留着**——那是知识本身。

**不要再为了压码点去砍 def / ctx / tabu**。CODE 上限内的空间现在翻倍了，目标是「一条顶一句能直接说出口的话」，不是「一条塞最多信息」。

---

## 2. 上一版的三个硬伤（已修）

### 2.1 两页撑爆 → 已拆 ✅
`chars` → `chars` + `chars-npc`，`world` → `world` + `world-extra`。人设里的页清单同步改成了 22 页并重投过。

### 2.2 编造防线 → 已加 `--check-src` ✅
`build.mjs --check --check-src`：抽所有 src 里的 http(s) 发 HEAD（不行退 GET），分桶报 404/410、403、网络错。
- 403 **单列并标「本机被挡，非死链」**，不进失败合计（本机 huijiwiki / moegirl / 百度百科对 node fetch 一律 403）
- 漏协议的按 `https://` 归一后查，合并去重，分「【显式 http(s)】/【裸域名补全】」两组打印
- `--check-src-strict` 才把 404/410 算进 errs
- 断网时打「网络不可用，跳了」并 exit 0，**不能崩 build**
- ⚠️ CI 里不跑它（GitHub Actions 出口 IP 全 403，报出来全是噪音）

另外还加了**本地 src 校验**（无条件执行、零网络）：指到仓库外的路径（带 `..` 的）直接 err——本机有那个目录不代表别人机器上有。
判据：含 `source/` 前缀 / 以 `底本:` 开头 / 以 `../` 开头 / 带 `.txt` `.md` 扩展名。**裸域名不算**（归 `--check-src` 那组）；描述性文字（检索式、出处说明）是有意写的，别当缺文件。

### 2.3 person 页最薄 → 已加厚 ✅
7 条 → **16 条**，按 `kb/source/` 三份逐字底本补齐。

---

## 3. 新素材源：yakitahome（2026-10-23 起的主要输入）

<https://mc.yakitahome.com> ——「瑝览类书·鸣潮文本检索」。**它不是网页是数据接口站**，HTML 全 SPA 渲染，抓 HTML 无用。

| 接口 | 内容 | 量 | 落地位置 |
|---|---|---|---|
| `/api/terms` | 官方术语，8 语言，sourceVersion 3.7 | 288 条 | `kb/source/yakitahome-terms.json`（在仓库里） |
| `/api/feixun` | 游戏内「飞讯」私信 | **104 联系人** / 289 段 / 2607 条 | `kb/source/yakitahome-feixun.json`（在仓库里） |
| `/api/info` | 游戏内文本档案，**preview 是截断的** | 772 条（其中 **hidden 343 条拿不到**，要登录/权限） | `kb/cache/`（没进仓库） |
| `/api/items` | 物品表，**没有 description** | 2136 条 | `kb/cache/`（没进仓库） |

**2026-10-24 更新（官方源这一轮）**：
- **`/api/info` 已全量落盘**：772 条全拉 → 产物 **722 条 / 198383 字**（5 条空文本），默认 `--all`，**别重新发明门槛、别再跑一次筛选**。
- **`/api/search` 有限流**：连打 **16 次后 429**，请求间隔必须 **≥2.5 秒**。
- **中文正文检索没调通**——接口参数不是 `q`。
- **官方术语真实缺口 104 条**（总表 288 条，其中 uid 级引用 84 条）。
- **官方 API 现在可用，可以做逐字核对**，官方词条能回填 uid。
- **`hidden` 343 条拿不到**，报告里别写它们的内容。
- **飞讯 104 个联系人混了人物和群/组织**，要分家另立页（见 4.6）。
- **渲染页不吃 `src`/`note`，所以 `note` 不占码点预算**——重要出处往 `note` 塞，省体积。

- 这个站**不挡下载**，用 `Invoke-WebRequest` 直接拖下来（和 huijiwiki 不一样）
- HEAD 一律 501，只能 GET
- 查本地副本用 `node tools/yakitahome.mjs search 词` / `term 词` / `msg 联系人`
- ⚠️ json 里 uid 形如 `'term:800033'`，**不带前缀 find 不到**
- ⚠️ i18n 字段是翻译＝二手，别用；只看 `description`

**由此拿到的关键结论**：
- 「**调律者**」有官方释义了（之前秧煌那个称号编错被删的坑不会再踩）
- 「**飞讯里她一条自己的消息都没发过**」——114 联系人 / 289 段全量核查结论，289 段正文只有 5 段提到她，全是别人转述。玩家问「她在游戏里给谁发过消息」，正确答案是**没有**。这条比补十条都管用
- 阿里曼 conv 33004「说明蛋糕的事情」是完整官方对话：橘子蛋糕 + 彩虹豆豆跳跳糖、匍炬松松子、喀拉喀拉
- ⚠️ 飞讯和档案里「相机」「方块」都**不是她的道具**（#33011014 是别人的诊断记录、光年视界 conv 30049 是摄影社活动、特雷弗 conv 32010 是方块式打印设施）

**取舍原则**：飞讯 2607 条大部分是寒暄表情，能进库的只有几十条；术语 288 条也不可能全收。
**宁可 40 条每条能直接说出口，不要 200 条要她在里面翻。**

---

## 4. 还欠什么

### 4.1 六条【待】（在 `todo.json`，`build.mjs` 自动汇总，不上线）

| id | 缺什么 | 状态 |
|---|---|---|
| `ver-early` | 1.x / 2.x 版本对应关系 | 仍在找 |
| `lines-voice-gap` | 战斗语音 160-162 的类目 | 底本只有编号没有类目，**大概率永远该留【待】** |
| `combat-support-role` | 协奏辅助 / 衍射辅助 | 社区口头约定，官方 wiki 无此页面，**已确认查不到** |
| `plot-pending` 等 | 剧情缺口清单 | 见文件内 note |

已转正：`combat-element-reaction`（口径卡在 wiki 上——战斗系统小节只列闪避反击、协奏能量与延奏变奏、声骸调谐、3.0 偏谐，没有「元素反应」这一项，不写「官方说不存在」）；`lines-unknown`（转成正式条目存闲趣三句原文）。

### 4.2 `chars-npc` 现状
**34 条 / 5280 码点**（2026-10-24 下午瘦身完，原 44 条 / 7557；一条没删，只压 ctx/tabu 措辞，见 [`reports/slim-chars-npc.md`](./reports/slim-chars-npc.md)）。names: 卡卡罗/椿/忌炎/桃祈/坎特蕾拉/吟霖/今汐/凌阳/长离/炽霞/折枝/珂莱塔/布兰特/露帕/维里奈/安可/仇远/穗穗/守岸人/洛可可/秋水/散华/白芷/鉴心/灯灯/尤诺/景燃/卡提希娅/奥古斯塔/莉莉，加 5 条次级接触人员（波西亚/班鲁/埃尔斯卡/梅森/科斯莫）+ 2 条无名线索。
✅ 瘦身完成（`task-37` 已交账，id/def 一字未动，只压 ctx/tabu），现在 5280 码点、在 6000 线以下。**`chars-npc-2` 也已开**：20 条飞讯里冒出来、别处查不到的人（米莎、多蕾、赞妮、格雷厄姆、莫特斐…），见 [`reports/chars-npc-2.md`](./reports/chars-npc-2.md)；另有 `chars-archive` 8 条（官方档案里只露过一次的次级人物：波西亚/班鲁/埃尔斯卡/梅森/科斯莫/冰刀白衣女子/洛塔/红衣女人），见 [`reports/chars-archive.md`](./reports/chars-archive.md)。
**「葵」不建**：info 772 条 / terms 288 条 / wiki 三处全 0 命中。「穗波、葵」指的是已有的穗穗。
飞讯 114 联系人里的次级人物**口径改过两次**：先记「主动不收」，后改成 **「能查到可靠资料就建」**——`task-39` 已交账，20 条建成 `chars-npc-2`；查不到资料的一个都没靠名字猜。
巴蒂尔、达米安：huijiwiki / moegirl / moegirl api 全部查不到，保留【待】。
✅ 软警戒已解除（现在 5280）。硬限是 8192（超了抓回来被从中间截断），**盯到 7800 再喊拆页。**

### 4.3 `terms` 页面已满
**已瘦身并拆页**：原 47 条 / 7206 → 先瘦到 26 条 / **3417 码点**（`task-38`，id/t/alias/lvl/def/rel 一字未动，只压 ctx/tabu；见 [`reports/slim-terms.md`](./reports/slim-terms.md)），再把「灾变与侵蚀」那 21 条整条搬去新页 **`terms-disaster`（21 条 / 2940 码点）**（`task-44`，id 一个字没改，脚本逐块比对过字节一致；见 [`reports/split-terms.md`](./reports/split-terms.md)）。
官方术语已另开 **5** 页分流（`terms-official` / `terms-story` / `lore-terms` / `battle-terms` / `terms-disaster`），`terms` 页只留通用消歧（共鸣、声痕、调律者、隧者、岁主）。

### 4.4 ⚠️ 内容缺口：库里没有「属性 / 养成数值 / 客户端操作」

**2026-10-24 pagecheck 真验收查出来的**：30 条真实提问里 ⚠️5 条，4 条同一个病——
「这个就是达妮娅的属性吧」「西格莉卡提升怎么样」「尤诺提升怎么样」「声骸融合自动锁胚子」。

**查实了：不是排序问题是内容问题。** person 页降权确实生效了（`person-danya` 全文没有「属性」，`rel-svigirl` 连 body 都没有），但**库里压根没有任何机制页条目能命中这些问句**——没有属性表、没有养成数值、没有客户端操作说明。降权之后 person 仍是唯一候选。

**调权重变不出一个不存在的答案。** ✅ **属性／武器这半边已经补上了**：2026-10-24 下午新开 `roles`（37 人，属性＋武器＋队里定位）与 `roles-2`（16 人，共 53 人），`roles.js` 里 21 处「本库 N 个」计数也按 53 人口径重算完（[`reports/fix-roles-counts.md`](./reports/fix-roles-counts.md)）。❌ **养成数值、客户端操作（融合、锁胚子）这半边仍然缺**，官方没有角色数据接口（`/api/roles` 等全 404），这条暂时做不了，等主人定。
在补上之前，这类问题她按人设第六节走退场三句含糊过去，别硬答。

### 4.5 已定的两个优化
1. ✅ **人设切成优先抓 `.lite.html`**（2026-10-24 主人点头）。两种都已生成；精简版体积约 59%，只留 `t`/`alias`/`lvl`/`def`/`tabu`，去掉 `ctx`/`rel`/`body`/`src`/`note`。要出处才翻同名 `.html`。**已落地并重投人设**（人设页清单已改成 29 页 + 5 条新路由）。
2. ❓ `titles`（41 条 5168 码点）/ `nicknames`（13 条 1967）/ `versions`（11 条 3033）三个碎片页要不要合成一页「称呼、绰号、名号、时间线」——合了路由少三个岔口。**主人没表态，先不动。**

### 4.6 官方 uid 回填清单（8 条）—— ✅ **已全部做完**（2026-10-24 中午，commit 550e444）

下表是当时的待办，现在都已按官方逐字回填：**禁锁十契**（lvl 考→官，**错字一并改对：华庭→华亭、恶憩→恶瘴、锁衿→锁暝**）、浮光林（不受虚质磁暴侵扰）、引日殿（隧者零件，不是隧群部件）、苇原（官方完整描述）、归魂互助会（已覆灭）、定玄卫（玄方地界守城士兵）、诺维尔再生医药（新联邦／日髓）、岐路司（uid 852007）。另加两条同批回填：**猎犬**（uid 800008，= `org-幽灵猎犬`）、**夜归**（uid 850086，= `org-夜归军`）。原表：

| 条目 | 现在写的 | 官方逐字应该是 |
|---|---|---|
| `term-jin-lock`（禁锁十契） | 「华亭／恶瘴／锁暝」，lvl `考` | 官方词条名就是这三个，**lvl 改 `官`** |
| `world-浮光林` | 缺「炉芯光辉」 | 官方：炉芯光辉**不受磁暴侵扰** |
| `world-引日殿` | 写「隧者零件」 | 官方另有更准的定性 |
| `world-苇原` | 描述不全 | 官方有更全的描述 |
| `org-归魂互助会` | 缺状态 | 官方：**已覆灭** |
| `org-定玄卫` | 缺身份 | 官方：**玄方地界守城士兵** |
| `chars-诺维尔` | 缺所属 | 官方：**新联邦／日髓** |
| `org-岐路司` | 缺出处 | 官方有 **uid**，补上 |

### 4.7 剩下的几摊

1. ✅ **飞讯联系人页已做**：`feixun`（20 条：8 个群聊＋机构号＋总条）与 `feixun-chars`（21 条角色签名原话）两页，2026-10-24 中午上线。
2. ✅ **`old-lore` 已做**：17 条（2.3~2.8 早期世界观词）。

3. ✅ **`chars-npc` 拆页已完成**：瘦身到 34 条 / 5280 码点；新开 `chars-npc-2`（20 条飞讯角色）与 `chars-archive`（8 条官方档案次级人物）。

4. ✅ **`docs-2` 官方档案页已做**：23 条（研究备忘录、勘察日志、家书、日记、调查笔录、记录单），见 [`reports/docs-2.md`](./reports/docs-2.md)。

5. ✅ **`roles-2` 属性页已做**：16 人（相里要、釉瑚、菲比、赞妮、夏空、弗洛洛、嘉贝莉娜、琳奈、莫宁、陆·赫斯、洛瑟菈、清宵、心、锁暝、露西、丽贝卡），见 [`reports/roles-2.md`](./reports/roles-2.md)。
6. ✅ **`terms-disaster` 已做**：21 条灾变与侵蚀术语（悲鸣、鸣式、海蚀现象、虚质空间、隧群、频率…），见 [`reports/split-terms.md`](./reports/split-terms.md)。
7. ❌ **养成数值 / 客户端操作**：官方没有角色数据接口（`/api/roles` 等全 404），这条暂时做不了，等主人定。（**属性／武器那半边已由 `roles` + `roles-2` 解决**，见 4.4）

---

## 5. 素材通道（全部实测过，别重复踩）

| 通道 | 状态 | 注意 |
|---|---|---|
| `web_search` | ✅ 可用 | 早前报 `no API key`，**现在好了** |
| `web_fetch` → `wuwa.huijiwiki.com/api.php` | ⚠️ 能用 | `prop=extracts&explaintext=1&exlimit=20&titles=A%7CB`。**一次最多 4 个 titles，发 11 个会 403** |
| `web_fetch` → `wuwa.huijiwiki.com/w/index.php?title=X&action=raw` | ✅ 取全文 | **`/w/` 前缀必须带**；`/wiki/X` 直链**不跟随重定向**，实测 `/wiki/秧秧` 直接 404，全库已统一改成 `/w/index.php?title=X` |
| `mc.yakitahome.com/api/*` | ✅ **现成一手** | 见第 3 节，不用再爬 |
| `zh.moegirl.org.cn/api.php` | ✅ 一次一整页 | 只放行 `prop=extracts` |
| `zh.wikipedia.org/w/api.php` | ✅ | 达妮娅真实标题是**繁体 `達妮婭`**（pageid 9532233），带 `redirects=1` |
| `read_page` | ❌ | firecrawl 免费层 429 |
| PowerShell `Invoke-WebRequest` 访问 huijiwiki | ❌ 一律 403 | 必须走 `web_fetch`；但 **yakitahome 用它能下** |
| `wuther.in/zh/main-story/<id>/` | ⚠️ 只能当背景 | 单页 956 KB HTML，裁剪后中间正文全丢 |
| `huggingface.co` / `baike.baidu.com` | ❌ 超时 / 403 | |

⚠️ **wiki 全站对 node fetch 403**（带 Chrome124 UA 也不行）。查 wiki 只能走 `web_fetch`，`build.mjs` 里的死链检查本机拿不到 wiki 的真实状态。

---

## 6. 别做的事

1. **别自己编词源**。给一个词配「X＋Y＝Z」这种解释，最容易翻车（秧煌就是这么没的）。配不出来就标【待】。
2. **别把二手当一手**。剧情事实要一手游戏文本 + 二手社区转述各一；只有二手就在条目里写「仅二手」。
3. **别用 PowerShell `-replace` 改 JS 源码**——替换串里的 ` ` 和 `$1` 会被吃掉，已经因此抹掉过一整段 `body`。用 node 脚本改。
4. **别用 shell 管道重写整个 `.js` 文件**——已经因此写残过 4 个文件。只用 write/edit 工具。
5. **别在 `src/entries/*.js` 的 `rel` 里写页面名**（比如 `'lines'`），lint 会当 id 查然后报悬空。
6. **单页别超 `PAGE_MAX`（8192），目标 6000。** 超了会被裁剪器**从中间截断**，她抓回来就是半页废话。
7. `memes` / `ships` 在 `meta.js` 里标了 `noSrc:true`，代价是 `ctx`/`tabu` 硬必填、`lvl` 固定 `['玩']`——改的时候别把这两个字段漏了。
8. **复算码点别漏 `body`**——已经因此报错两轮（`body` 从 `body: \`` 吃到以 \`\` ,\` 结尾的行；切块后先去掉字段行缩进再匹配）。
9. **`write` 工具整块多行会被压成一行**（每条塌成 `{, id: …,, t: …`，`node` 报 `Unexpected token ','`）。整文件重写要用 line 数组分段写，或按双逗号切；**写完必须 `read` 复核行数与 id 重复**。
10. **并行派活要看清"谁先谁后"**。2026-10-23 踩过：排第二棒的人 `read` 的是上一棒**改之前**的文件，看到 "biographer 在改 plot.js" 就以为已经派别人了，结果那处**白转一道手**没人做。要么在派单里点名「这处现在归你」，要么让人**不要读别人正在改的文件**。
11. **拆分网络任务别派两个 agent 同时拉**——会重复请求、可能撞车。要么合并给一个，要么指定「档案给 A、飞讯给 B」互不重叠。
12. **贴给别人（或贴进网页编辑器）的 YAML，先自己校验一遍**。2026-10-23 贴 ci.yml 时把 `pull_request:` 写成 **1 个空格**、上面 `push:` 是 2 个 —— 同一个父节点下键的缩进必须一致，那压根不是合法 YAML。GitHub 报 `Invalid workflow file: ci.yml#L3`，而且**一个 job 都没启动**（`total_count: 0`，别误判成「跑失败了」，那是「压根没跑起来」）。白让主人点了一次。

---

## 7. 已做的基建（P2 全清）

- ✅ 清掉 `_org_raw.txt` / `_fetch_orgs.ps1`，`.urls.txt` 挪成 `source/urls-manual-check.txt`
- ✅ `sitemap.xml` 由 `build.mjs` 生成，只列**真写出来的**那几页（空页压根没生成 html，列进去等于送死链）
- ✅ `.github/workflows/ci.yml`：checkout + setup-node 22，只跑 lint。**2026-10-23 深夜已上线并在跑绿**（从 commit `84d900f` 起 CI 全绿）
  ⚠️ 这文件是主人在 GitHub 网页上加的 —— 本地那个 PAT 没有 `workflow` scope，`git push` 和 GitHub API 都会被 403 挡回来。**以后改 CI 只能走网页**。
- ✅ `.gitignore` 只留 `.DS_Store` / `Thumbs.db`
- ✅ 本地查询工具 `kb/tools/`：`yakitahome.mjs`（查飞讯/术语）、`pagecheck.mjs`（问一句 → 告诉你该翻哪页、库里有没有答案）

⚠️ **html 保持 git 跟踪，别动**。站点靠仓库里已跟踪的 html 直接出 Pages（Settings → Pages 源是 `main` 分支 `/root`）。
将来若要去掉 html 跟踪，**必须先由人去 Settings 里把 Pages 源切成 GitHub Actions**，再加 deploy job + `git rm --cached`，顺序反了线上直接空白。

---

## 8. 自动补库

两个定时任务，**Asia/Shanghai 12:45 与 21:15**：
扫 `C:\Users\28945\.dsh\dsh-onebot-qq\logs\qq_chat\*.jsonl` 里她说了「我不记得了 / 忘了 / 差不多吧」之类的话
→ 取前一条当待补问题 → `web_search` → 写进 `src/entries/` 或记进 `todo.json` → `build` → `push`。

限制：**只在有会话开着的时候跑**。想立刻补，直接在群里问她那个问题，然后口头让我扫。

⚠️ **2026-10-24 晚：关键词法有盲区——她「答不出来」不等于「说了不记得」。** 本轮关键词法（「我不记得了/忘了/差不多吧/查不到」）命中 0 条新缺口，但翻最近 45 条对话发现一条真缺口：10-24 10:45 群里问「鸣潮角色心配队是什么」，她两条回复**正文是空的**（压根没答上）。**下回扫日志要把 out 正文为空的也算命中**，光看关键词会漏。

---

## 9. 她那边的验收标准

改完库之后，**在群里 @她 问一句**，看日志 `logs\qq_chat\*.jsonl` 里她的回答是不是变了。

补完一处的标准是：**她下一次被问同样问题时，不再出现「我不记得了 / 找不到了」**。

验收工具：`node kb/tools/pagecheck.mjs "秧秧是谁"` —— 本地 10 秒告诉你该翻哪页、库里有没有答案，比去线上抓 html 快得多。

已知她答错过的真实例子（`node scan-gaps.mjs` 能复扫）：

| 时间 | 群里问的 | 她答的 | 根因 | 状态 |
|---|---|---|---|---|
| 10-22 15:40 | 娅娅，秧秧是谁 | 「我不记得了」 | `chars` 里没有秧秧 | ✅ 已补 |
| 10-22 13:03 | 西西听说你在虚质空间，她很伤心 | 「哈，找不到的」 | `plotlines` 里没有这条关系线 | ✅ 已补 |
| 10-23 14:43 | 爱达千是什么 | 「我没玩过这游戏…」 | 半编造，`teams` 页当时还没有 | ✅ 已补 |

---

## 10. 【2026-10-23 晚】素材已落地，别再重拉

yakitahome 的档案与飞讯**已经全量拉完躺在 `kb/source/` 里**，直接读本地，别再联网：

| 文件 | 内容 | 怎么用 |
|---|---|---|
| `yakitahome-info-full.json` | 档案全文 **66 条 / 16392 字**，0 失败 | `src` 写 `https://mc.yakitahome.com/api/info/detail?id=<id>` |
| `yakitahome-feixun-full.json` | 飞讯 **289 段全量** | `src` 写 `https://mc.yakitahome.com/api/feixun`，note 写 conversation id |
| `yakitahome-info-full-index.md` | 74 行清单（id\|标题\|版本\|命中词\|字数\|概要） | 挑素材先看这个 |
| `kb/tools/info-diff.mjs` | 专挑「preview 里没有的干货」 | `node tools/info-diff.mjs` |
| `kb/tools/yakitahome.mjs` | 离线查 ＋ `pull`/`pull-conv` 联网补拉 | 别手搓 HTTP |

**⚠ 站点有并发限流（重踩过一次）**：首轮并发 3 跑飞讯，289 段里 59 段失败，报错 `Unexpected token '<'`——站点返回 HTML 挡人页不是 JSON。补拉用 `--conc 1 --gap 1500`，59/59 成功、90.9 秒。**爬得慢不是 bug，是限流，别为了快把并发往上加。**

**筛选口径**：命中 CORE（37 词，达妮娅圈）直接收；只命中 WIDE（48 词，组织/机制/地名）还要版本 ≥ 3.2。772 → 66（8.5%）。瑝珑残象 3.6-3.7、黑海岸 2.8 混进来了是**已知范围，别收紧**；要重筛用 `--kw`，不用重拉。

**preview 只有 90 字**，这 66 条里有 64 条是 preview 的加长版、2 条不是前缀。最要紧的是 **28050004**（1006 字 vs 90 字），见 `person.js` 的 `person-exit-procedure`。

---

## 11. 已知的跨页矛盾（有人查，别各说各话）

| 词 | 矛盾 | 状态 |
|---|---|---|
| **会长** | 残星会会长斯瓦茨洛（wiki/韩媒转述；底本 732 只写「会长」）vs 达妮娅叫的「娜波摩」 | 已在 `versions.js:ver-early` tabu 钉死；`nicknames.js:nick-president` 也写了一句。**别在时间线叙述里混用** |
| **黑咩之手** | wiki 记 owner 是安可；`chars-npc.js` 里秋水被写成安可的「搭档」，顺着读容易误成秋水的 | glosser 在摆三个出处，**结论未出前 `meme-mie` 与 `chars-npc` 都别动** |
| **震谐** | 官方 3.7 术语里「震谐」是四种负面状态名；teams/combat 页的震谐＝集谐＝集谱＝偏谐路线 | 两边都不假，已各自在 tabu 写死正反向 |
| **残象 ≠ 折影** | 底本 1739-1744 千咲那段官方把两者分开问 | 已在 terms 写死 |

## 12. 并行派活的两条硬规矩

1. **要么点名归属，要么明说「别读别人正在改的文件」。** 派活时我漏了点名，一个改动白转一道手没人做，是 glosser 主动问「有没有人动过」才暴露的。
2. **别派两个 agent 同时拉同一批网络任务。** 档案给 srccheck、飞讯我本来就派了别人，结果 srccheck 早就拉完了——重复劳动，且差点让两个人同时写同一个文件。

## 13. 没解决的两件事

1. **`.lite.html` 到底切不切路由**——人设里已经写了「一律先抓 lite」（`C:\Users\28945\.dsh\dsh-onebot-qq\personas\达妮娅.md` 与 `C:\Users\28945\.dsh\AGENT.md` 两处都改了），但**这一刀还没真正落地**：要让 DSH 检索层只在没命中时才回退全版。上面那两处人设只是告诉她「优先抓 lite」，不是检索层强制。
2. **群里 @她 的实测验收**——主人 10-23 晚口头过了一句「没什么问题」，但**没有留日志证据**。真要复核就拿 `C:\Users\28945\.dsh\dsh-onebot-qq\logs\qq_chat\` 的真实提问跑 pagecheck，报告在 `kb/reports/pagecheck-accuracy.md`。
3. **commit `7196755` 还没推上 GitHub**（22:13 那批：霆心域 / 电磁爆发与电磁效应 / 共鸣模态 / 心配队）——写的时候 `github.com:443` 连不上。恢复后：`git push origin main` → `git -C <clone> fetch origin && merge --ff-only origin/main` → 线上验 `jargon.html` / `battle-terms.html` 含新词。

## 14. 【10-23 深夜】pagecheck 喂数据的坑：`q.txt` 是三行一块

`qq-log-scan.mjs --out q.txt` 写的是**表头 / 问句 / `命中词：…`** 三行一块，**不是一行一句**。当成一行一句读，71 条候选会摊成 213 道题——其中 71 道是表头（垃圾）、**71 道是「命中词」行，也就是把扫描器自己算好的答案当成了考题**，必中、分数虚高而排序一点没变好。
`pagecheck.mjs` 的 `parseStdin()` 现在认这两种喂法（见到 `· [` 开头的行就进块模式），走 stderr 报「共 N 道」。**但别再手写 `Get-Content q.txt | pagecheck.mjs` 之外的花样喂法**——30 条基准是逐条灌的，喂法一变，数字就不可比。
另记一条踩坑：**PowerShell 的 `>` 重定向写 UTF-16LE**，node 按 utf8 读会得到乱码、`split` 全 0 块，看着像「工具没输出」。读这类文件先看 BOM（`0xff 0xfe` → `buf.slice(2).toString('utf16le')`）。ts/pagecheck-accuracy.md`。

> 🚨 **2026-10-27：本轮新增 22 个页面。发版后 bot 侧必须做三件事：** ① `git fetch origin && git merge --ff-only origin/main` 同步克隆；② **重启 bot 进程**（ESM 缓存，改过的 .js 不重启读不到）；③ 用 `mcp__qq__kb_read` 读一页新页（如 memes-web）验证新页真的可读。
> 本轮在 src/meta.js 的 PAGES 新登记的页面名：memes-web、memes-web-game、memes-web-media、memes-web-new、memes-web-words、adult-terms、adult-scale、adult-memes、adult-talk、area-reports、area-reports-2、area-reports-3、ver-early、lines-voice-gap、combat-support-role、growth、enemies、enemies-2、enemies-3、enemies-4、enemy-rules、echoes、echoes-2、echoes-3、weapons、weapons-2。
> **新增工具 `tools/check-pages.mjs`**：只读自检，逐个 import 所有 src/entries 板块文件，打印条目数、码点、缺字段数，语法错标 ERR。补上 build.mjs --check 的盲区（--check 只查已登记的板块）。跑法 `node tools/check-pages.mjs`。
> **本轮踩到的坑（流程上都已修掉，照抄即可）**：
> ① `[System.IO.File]::WriteAllLines(相对路径, ...)` **静默失败**——.NET 的 CurrentDirectory 和 PowerShell 的当前位置不是同一个，文件写到别处去了，本地 Test-Path 返回 False 且不报错。必须用绝对路径。
> ② PowerShell 5.1 传给原生程序（node -e）时会**吃掉参数里的双引号**：正确写法是外层用 PS 双引号、JS 内部一律用单引号。
> ③ 终端命令文本里出现真换行会把 PSReadLine 弄进续行态。写文件用**分隔符法**最稳：`
` 当换行、`@` 当占位符、JS 字符串一律双引号；内容里不能出现 `
` 字符。
> ④ 写完 .js 忘了收尾 `];` → 整个 build 崩（SyntaxError: Unexpected end of input）。用 tools/check-pages.mjs 一眼看出哪个文件 ERR。
>

> 🚨 **2026-10-27 夜：本轮扩库完成并已推送（commit 6dce2fc 及后续）。发版后 bot 侧不需要重启就能读到新页。**
> 实测：`mcp__qq__kb_read({page: "memes-web", lite: true})` 直接返回了 37 条新内容（2897 字符）。说明插件是**动态读 src/entries 与 manifest** 的，**只有改插件自身代码才需要重启 bot**；改条目文件不需要。
> 本轮结束时的库规模：**68 个板块 / 1856 条**（其中 20 条标【待】不进正式页），lint 0 错误。
> 本轮新增板块（每条都有出处，跨页撞名都是设计使然）：
> · 全网热梗：`memes-web`(37)、`memes-web-game`(28)、`memes-web-media`(39)、`memes-web-new`(29)、`memes-web-words`(39) ＋ 成人相关：`adult-terms`(31)、`adult-scale`(15)、`adult-memes`(20)、`adult-talk`(11) ＋ 鸣潮：`enemies`(20)、`enemies-2`(33)、`enemies-3`(51)、`enemies-4`(31)、`enemy-rules`(10)、`echoes`(61)、`echoes-2`(62)、`echoes-3`(64)、`echo-sets`(37)、`weapons`(50)、`weapons-2`(74)、`area-reports`(15)、`area-reports-2`(19)、`area-reports-3`(41)、`ver-early`(28)、`lines-voice-gap`(24)、`combat-support-role`(26)、`growth`(32) ＋ 扩写既有页：`jargon`(42)、`nicknames`(25)、`allusions`(38)、`battle-terms`(30)。
> **两个必须记住的坑**：
> ① **mc.yakitahome.com 整站当前 525**（源站 SSL 握手失败，node / curl / read_page 三条路都试过）。area-reports 的内容改用**鸣潮 wiki 的「探索报告」总表页**（`https://wuwa.huijiwiki.com/w/index.php?title=探索报告&action=raw`）及各地区子表，数据是同一批。站点恢复后可再抓 yakitahome 做交叉核对。
> ② **wiki 用 node fetch 会撞 Cloudflare 挑战页**（返回「请稍候…」HTML），只有 `read_page` 工具能过。wiki 的 `api.php`（allpages / revisions）用 read_page 也通。
> **官方用字是「瑝珑」和「黯原」**（见 source/yakitahome-terms.json 官方 288 条术语），库里的写法是对的；wiki 的页面标题用同字，不要被编码问题带偏。
> **PLAN.md 第十节已订正**：原先拿「隧者／巴德尔」当编造的例子是错的——官方术语 uid:700008 就是「隧者」，罗伊《三纪神话》里祂名为「巴德尔」。**正确口径：wiki 查不到 ≠ 编造，要同时查官方术语档案。**
> 新增工具：`tools/check-pages.mjs`（只读自检，逐个 import 所有板块，打印条目数/码点/缺字段，语法错标 ERR）与 `tools/release-kb.mjs`（build → lint → 逐文件 git add → commit → push 一条龙）。
>
