/*
  Generates tiny base64 blur placeholders for every image under
  public/images/, written to data/blur-map.json (web path -> data URL).
  Run after adding images: `npm run blur`.
*/
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public", "images");
const OUT = path.resolve(process.cwd(), "data", "blur-map.json");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

const map = {};
let count = 0;
for await (const file of walk(ROOT)) {
  const buf = await sharp(file)
    .resize(12, 12, { fit: "inside" })
    .jpeg({ quality: 45 })
    .toBuffer();
  const webPath =
    "/" + path.relative(path.join(process.cwd(), "public"), file).replace(/\\/g, "/");
  map[webPath] = `data:image/jpeg;base64,${buf.toString("base64")}`;
  count++;
}

await writeFile(OUT, JSON.stringify(map));
console.log(`blur-map.json written: ${count} images`);
