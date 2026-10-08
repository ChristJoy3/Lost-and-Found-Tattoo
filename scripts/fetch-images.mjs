// One-off: mirror the original site's images into public/images.
// Usage: node scripts/fetch-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE = "http://www.lostandfoundtattoo.net/";
const OUT = join(process.cwd(), "public/images");

const MANIFEST = {
  "brand/arm-logo.jpg": "arm_logo.jpg",
  "brand/rubberized-logo.jpg": "rubberized_logo.jpg",
  "brand/pinhead-logo.jpg": "pinhead_logo.jpg",
  "shop/hero.jpg": "publishImages/index~~element71.jpg",
  "shop/about-1.jpg": "10505542_10153116398376936_7554611582676721416_n.jpg",
  "shop/about-2.jpg": "11863461_10207377591828347_2104784042188153851_n.jpg",
  "artists/pinhead-1.jpg": "publishImages/Pinhead~~element114.jpg",
  "artists/pinhead-2.jpg": "IMG_0944.JPG",
  "artists/hotsauce-1.jpg": "13600244_10153847919166936_7005626925858288450_n.jpg",
  "artists/hotsauce-2.jpg": "11866424_10153168807071936_3791807678414780685_n.jpg",
  "artists/james-smith-1.jpg": "publishImages/James-Smith~~element38.jpg",
  "artists/james-smith-2.jpg": "publishImages/James-Smith~~element41.jpg",
  "artists/jay-1.jpg": "IMG_6073.JPG",
  "events/friday-the-13th.jpg": "friday_the_13th_new.jpg",
  "contact/contact-1.jpg": "publishImages/contact~~element109.jpeg",
  "contact/contact-2.jpg": "publishImages/contact~~element112.jpg",
};

const pinhead = [
  "purp_roses.jpg", "V_sleeve.jpg", "joker.jpg", "suger_skull.jpg", "usa_rose.jpg",
  "B_rad.jpg", "pokemon_sleeve.jpg", "skull_sleeve.jpg", "cc_elephant.JPG",
  "black_and_gray_rose.jpg", "heart.jpg", "l_B_cover_up.jpg", "simba_tattoo.JPG",
  "water_color_dog.jpg", "heather_rose.jpg", "yin_yang.jpg",
];
for (const f of pinhead) {
  MANIFEST[`portfolio/pinhead/${f.toLowerCase().replace(/_/g, "-")}`] = f;
}
const hotsauce = [
  "13606485_10153847919071936_708208455749910456_n.jpg",
  "13600091_10153866904596936_2688328182360617603_n.jpg",
  "13592446_10153847918376936_7153475284614875264_n.jpg",
  "13882298_10153933969611936_579177450287178465_n.jpg",
  "13907151_1140964282637357_98664015203995673_n.jpg",
  "13895175_1140964279304024_6318505496027926752_n.jpg",
];
hotsauce.forEach((f, i) => (MANIFEST[`portfolio/hotsauce/hotsauce-${i + 1}.jpg`] = f));

const failed = [];
for (const [local, remote] of Object.entries(MANIFEST)) {
  const url = BASE + remote.split("/").map(encodeURIComponent).join("/");
  try {
    const res = await fetch(url);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status} ${type}`);
    const dest = join(OUT, local);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log("ok  ", local);
  } catch (err) {
    failed.push(remote);
    console.log("FAIL", remote, String(err.message ?? err));
  }
}
console.log(`\n${Object.keys(MANIFEST).length - failed.length} ok, ${failed.length} failed`);
if (failed.length) process.exitCode = 1;
