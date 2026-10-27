// events —— 活动与卡池：鸣潮历次限时活动、常驻玩法、联动、周年庆自选卡池
// 一手依据：鸣潮 wiki「版本」页（逐版角色池与活动列）、「Data:Schedule.tabx」（游戏内日程表）、「联动列表」、「活动任务/*」
// 版本上线时间线看 versions 页；这页只回答「活动叫什么、什么时候开、常驻还是限时、联动了什么」
export default [
  { id: "events-anniv", t: "周年庆版本", lvl: ["官"], def: "2.3 与 3.3 两版被 wiki 标为周年版本（上标 1st／2nd）", ctx: "被问「周年庆是哪个版本」时", tabu: "wiki 注释说周年庆是 5 月 23 日，版本表里却是 4 月 29 日和 4 月 30 日，别混着说", rel: ["ver-anniv", "ver-33"], src: ["wuwa.huijiwiki.com/w/index.php?title=版本"], note: "已核（wiki 版本页 raw）：2.3 行首 <sup>1st</sup>、3.3 行首 <sup>2nd</sup>。⚠️ 未核：注释与日期不一致，未另找官方公告校对。" },
  { id: "events-anniv-23-pool", t: "周年角色活动唤取", lvl: ["官"], def: "2.3 周年版的角色自选卡池，分上下两半各五名可选角色", ctx: "被问「周年卡池怎么挑」「自选池里有哪些人」时", tabu: "只有 2.3 有这一栏，3.3 的周年版没有，别当成每周年都有", rel: ["ver-33", "chars-忌炎", "chars-吟霖"], src: ["wuwa.huijiwiki.com/w/index.php?title=版本"], note: "已核（wiki 版本页 2.3 行）：上半忌炎、吟霖、折枝、相里要、菲比；下半今汐、长离、珂莱塔、洛可可、布兰特。" },
  { id: "events-role-memory", t: "角色忆旅唤取", lvl: ["官"], def: "3.5 版本新开的角色自选卡池，六名角色自选", ctx: "被问「忆旅唤取是什么」「3.5 的自选池」时", tabu: "它和周年唤取是两套机制，别混", rel: ["ver-35", "chars-忌炎"], src: ["wuwa.huijiwiki.com/w/index.php?title=版本"], note: "已核（wiki 版本页 3.5 行）：自选卡池为忌炎、吟霖、今汐、长离、折枝、相里要。日程表另记其起止 2026.07.10—08.19。" },
  { id: "events-banner-role", t: "角色活动唤取", lvl: ["官"], def: "常驻的角色卡池名目，每期池上只放一名新角色或复刻角色", ctx: "被问「角色卡池叫什么名字」「卡池上的是谁」时", tabu: "它和武器卡池、周年自选池是三套名字，别混", rel: ["roles-千咲", "roles-绯雪"], src: ["wuwa.huijiwiki.com/w/index.php?title=Data:Schedule.tabx"], note: "已核（wiki 日程表）：条目名形如「穗穗」角色活动唤取、「心」角色活动唤取-但愿长圆如此夜，含唤取标题。" },
  { id: "events-banner-weapon", t: "武器活动唤取", lvl: ["官"], def: "常驻的武器卡池名目，池上放的是当期武器", ctx: "被问「武器池叫什么」「武器池上的是哪把」时", tabu: "同名不同物，别和角色池混着说「哪个池」", rel: ["gear-danya-weapon"], src: ["wuwa.huijiwiki.com/w/index.php?title=Data:Schedule.tabx"], note: "已核（wiki 日程表）：条目形如「栖霞饮露」武器活动唤取、「云琅」武器活动唤取、「沉冥」武器活动唤取。" },
];
