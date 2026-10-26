import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";
import { PAGES } from "../src/meta.js";
const DIR = fileURLToPath(new URL("../src/entries/", import.meta.url));
const noSrc = new Set(PAGES.filter((p) => p.noSrc).map((p) => p.file));
const files = readdirSync(DIR).filter((f) => f.endsWith(".js")).sort();
const need = (e, page) => { const miss = ["id", "t", "def", "ctx", "lvl"].filter((k) => !e[k]); if (typeof e.tabu !== "string") miss.push("tabu"); const ex = (e.lvl ?? []).includes("待") 

 noSrc.has(page); if (!ex && !e.src) miss.push("src"); return miss; };
let total = 0;
for (const f of files) {
  try {
    const m = await import(pathToFileURL(join(DIR, f)).href);
    const L = Array.isArray(m.default) ? m.default : [];
    const page = f.replace(/\.js$/, "");
    let cp = 0;
    for (const e of L) cp += [e.t, (e.alias ?? []).join(""), e.def ?? "", e.ctx ?? "", e.tabu ?? "", (e.rel ?? []).join(""), e.body ?? ""].join("").length;
    const bad = L.filter((e) => need(e, page).length > 0);
    const pend = L.filter((e) => (e.lvl ?? []).includes("待")).length;
    console.log(f.padEnd(24), String(L.length).padStart(3) + " 条", String(cp).padStart(5) + " 码点", pend ? pend + " 待定" : "", bad ? " 缺字段 " + bad.map((e) => e.id + ":" + need(e, page).join("/")).join(" ") : "");
    total += L.length;
  } catch (e) {
    console.log(f.padEnd(24), "ERR", String(e.message).split(String.fromCharCode(10))[0]);
  }
}
console.log("TOTAL", total, "条", files.length, "个文件");
