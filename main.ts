import { mkdirSync, writeFileSync } from "node:fs";

// The Most Boring Object, Reviewed in One Line.
// One fixed, hand-written review. No input, no clock, no random,
// no network: the same bytes come out on every run, in any sandbox.
const LINE =
  "The dustpan has one job \u2014 catch the dirt \u2014 and it leaves a thin grey line behind every single time.";

// Gate, mirrored from the bounty rules: UTF-8 text of 1 to 200
// characters, a single line, not only white space. Count Unicode
// code points, not UTF-16 units, so the gate matches the server's
// character count even for characters outside the BMP.
const text = LINE.trim();
const chars = [...text].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry line is ${chars} characters, gate needs 1-200`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry line must stay on one line");
}
if (text.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}

// Cwd-relative on purpose: the grading sandbox mounts the repo
// read-only, so writing beside the script's own folder fails there
// with EROFS. "output/entry.txt" is where the harness collects it.
mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", text, "utf8");
