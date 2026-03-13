import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const nextDir = path.join(rootDir, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");

const sources = [
  {
    label: "static assets",
    from: path.join(nextDir, "static"),
    to: path.join(standaloneNextDir, "static"),
  },
  {
    label: "public assets",
    from: path.join(rootDir, "public"),
    to: path.join(standaloneDir, "public"),
  },
];

if (!existsSync(standaloneDir)) {
  throw new Error(
    "Standalone build output was not found. Run `next build` before preparing the standalone bundle.",
  );
}

mkdirSync(standaloneNextDir, { recursive: true });

for (const { label, from, to } of sources) {
  if (!existsSync(from)) {
    throw new Error(`Missing ${label} at ${from}`);
  }

  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`Copied ${label} -> ${path.relative(rootDir, to)}`);
}
