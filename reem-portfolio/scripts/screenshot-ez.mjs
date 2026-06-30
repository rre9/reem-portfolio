import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'assets', 'projects', 'ez-insurance');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://qc.ezinsure.com.sa/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

await page.screenshot({ path: join(outDir, 'ez-insurance-hero.png'), fullPage: false });
await page.screenshot({ path: join(outDir, 'ez-insurance-full.png'), fullPage: true });

// Try mobile viewport
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('https://qc.ezinsure.com.sa/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: join(outDir, 'ez-insurance-mobile.png'), fullPage: false });

await browser.close();
console.log('Screenshots saved to', outDir);
