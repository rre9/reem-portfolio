import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'assets', 'projects', 'ez-insurance');
mkdirSync(outDir, { recursive: true });

const base = 'https://qc.ezinsure.com.sa/';
const jsUrl = base + 'main.24bf8d673e4adcaa.js';
const js = await fetch(jsUrl).then((r) => r.text());
const paths = [...new Set([...js.matchAll(/assets\/[a-zA-Z0-9_\-./]+\.(?:png|jpg|jpeg|webp|svg)/gi)].map((m) => m[0]))];
console.log('Found', paths.length, 'asset paths');
console.log(paths.slice(0, 20).join('\n'));

const heroCandidates = paths.filter((p) =>
  /hero|banner|home|landing|slide|car|vehicle|insurance|main/i.test(p)
);
const toFetch = (heroCandidates.length ? heroCandidates : paths).slice(0, 6);

for (const p of toFetch) {
  const url = new URL(p, base).href;
  try {
    const res = await fetch(url);
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    const name = p.split('/').pop();
    writeFileSync(join(outDir, name), buf);
    console.log('Saved', name, buf.length, 'bytes');
  } catch (e) {
    console.log('Skip', url, e.message);
  }
}
