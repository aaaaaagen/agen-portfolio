#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "client", "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");
const mediaBase = "https://raw.githubusercontent.com/aaaaaagen/agen-portfolio-media/main/assets/";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : target;
  }));
  return files.flat();
}

async function externalizeMedia(clientDirectory) {
  const files = await walk(clientDirectory);
  const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg"]);
  await Promise.all(files.filter((file) => textExtensions.has(path.extname(file))).map(async (file) => {
    const source = await readFile(file, "utf8");
    const updated = source.replace(/(?<!raw\.githubusercontent\.com)\/assets\/(?!index-[^/]+\.(?:js|css)\b)/gi, mediaBase);
    if (updated !== source) await writeFile(file, updated);
  }));

  const bundledDirectory = path.join(clientDirectory, "assets");
  const bundledFiles = await walk(bundledDirectory);
  await Promise.all(bundledFiles.filter((file) => !/^index-[^/]+\.(?:js|css)$/i.test(path.basename(file))).map((file) => rm(file)));

  console.log("Externalized original media assets for Sites.");
}

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

await externalizeMedia(path.join(dist, "client"));

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
