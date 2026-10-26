import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { PAGES } from "../src/meta.js";
const R = "C:/Users/28945/.dsh/dsh-onebot-qq/workspace/wuther-kb";
const NODE = "C:/Users/28945/.dsh/dsh-runtimes/dsh-plugin-desktop-primary-runtime/dependencies/node/bin/node.exe";
const NL = String.fromCharCode(10);
const dry = process.argv.includes("--dry");
const g = (args) => execFileSync("git", ["-C", R, ...args], { encoding: "utf8" });
const MSG = process.env.RELEASE_MSG ?? "feat: 2026-10-27 扩库";
console.log("=== build ===");
console.log(execFileSync(NODE, ["build.mjs"], { cwd: R, encoding: "utf8" }));
console.log("=== lint ===");
console.log(execFileSync(NODE, ["build.mjs", "--check"], { cwd: R, encoding: "utf8" }));
const gen = PAGES.flatMap((p) => [p.file + ".html", p.file + ".lite.html"]).filter((f) => existsSync(R + "/" + f));
const list = ["src", "tools", "reports", "source", "PLAN.md", "NEXT.md", "manifest.json", "sitemap.xml", "todo.json", ...gen, "index.html"].filter((f) => existsSync(R + "/" + f));
g(["add", ...list]);
const st = g(["status", "--short"]).trim();
console.log("=== status ===");
console.log(st);
const n = st.split(NL).filter((l) => l.trim()).length;
if (n === 0) { console.log("nothing to commit"); process.exit(0); }
if (dry) { console.log("DRY RUN, no commit"); process.exit(0); }
g(["commit", "-m", MSG]);
g(["push", "origin", "main"]);
console.log("=== PUSHED ===");
