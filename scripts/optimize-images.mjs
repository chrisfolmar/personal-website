#!/usr/bin/env node
/**
 * Generate WebP + AVIF derivatives (and resized JPEG variants) for the
 * handful of images we render through `<picture>` + srcset. Outputs land
 * next to the originals so the markup can reference them directly.
 *
 * Re-run after replacing a source image:
 *   node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const TARGETS = [
  {
    src: "client/public/assets/images/about.jpg",
    widths: [800, 1200],
    formats: ["jpg", "webp", "avif"],
    namePrefix: "about",
    outDir: "client/public/assets/images",
  },
  {
    src: "client/public/assets/images/about-work.jpg",
    widths: [800, 1200],
    formats: ["jpg", "webp", "avif"],
    namePrefix: "about-work",
    outDir: "client/public/assets/images",
  },
  {
    src: "client/public/images/blog/ai-web-development.png",
    widths: [800, 1200],
    formats: ["jpg", "webp", "avif"],
    namePrefix: "ai-web-development",
    outDir: "client/public/images/blog",
  },
  {
    src: "client/public/images/blog/ai-tools-guide.png",
    widths: [800, 1200],
    formats: ["jpg", "webp", "avif"],
    namePrefix: "ai-tools-guide",
    outDir: "client/public/images/blog",
  },
];

async function processOne(target) {
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const srcPath = path.join(root, target.src);
  const buf = await fs.readFile(srcPath);
  for (const w of target.widths) {
    for (const fmt of target.formats) {
      const ext = fmt;
      const outPath = path.join(root, target.outDir, `${target.namePrefix}-${w}.${ext}`);
      let pipe = sharp(buf).resize({ width: w, withoutEnlargement: true });
      if (fmt === "jpg") pipe = pipe.jpeg({ quality: 82, mozjpeg: true });
      else if (fmt === "webp") pipe = pipe.webp({ quality: 78 });
      else if (fmt === "avif") pipe = pipe.avif({ quality: 55 });
      await pipe.toFile(outPath);
      console.log("wrote", path.relative(root, outPath));
    }
  }
}

async function main() {
  for (const t of TARGETS) await processOne(t);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
