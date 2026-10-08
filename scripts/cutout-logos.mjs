// One-off: give the white-background logos a transparent background.
// Usage: node scripts/cutout-logos.mjs
import sharp from "sharp";

const DIR = "public/images/brand";

async function load(file) {
  const { data, info } = await sharp(`${DIR}/${file}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

const isWhite = (d, i, t = 225) => d[i] > t && d[i + 1] > t && d[i + 2] > t;

async function save({ data, w, h }, out) {
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(`${DIR}/${out}`);
  console.log("wrote", out);
}

// Arm logo: a round badge, so mask to the circle (1px soft edge).
{
  const img = await load("arm-logo.jpg");
  const { data, w, h } = img;
  const cy = Math.floor(h / 2);
  let left = 0;
  while (left < w && isWhite(data, (cy * w + left) * 4)) left++;
  let right = w - 1;
  while (right > 0 && isWhite(data, (cy * w + right) * 4)) right--;
  const cx = (left + right) / 2;
  const r = (right - left) / 2;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      const a = Math.max(0, Math.min(1, r - dist + 0.5));
      data[(y * w + x) * 4 + 3] = Math.round(a * 255);
    }
  await save(img, "arm-logo-cutout.png");
}

// Pinhead mark: flood-fill near-white from the edges so interior whites survive.
{
  const img = await load("pinhead-logo.jpg");
  const { data, w, h } = img;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p] || !isWhite(data, p * 4, 215)) continue;
    seen[p] = 1;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  for (let p = 0; p < w * h; p++) if (seen[p]) data[p * 4 + 3] = 0;
  // Soften the fringe: edge pixels next to background get partial alpha.
  for (let p = 0; p < w * h; p++) {
    if (seen[p]) continue;
    const x = p % w;
    const near =
      (x > 0 && seen[p - 1]) || (x < w - 1 && seen[p + 1]) ||
      (p >= w && seen[p - w]) || (p < w * (h - 1) && seen[p + w]);
    if (near) {
      const lum = (data[p * 4] + data[p * 4 + 1] + data[p * 4 + 2]) / 3;
      data[p * 4 + 3] = Math.round(255 * Math.min(1, (255 - lum) / 80 + 0.25));
    }
  }
  await save(img, "pinhead-logo-cutout.png");
}
