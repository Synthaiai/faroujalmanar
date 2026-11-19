import fs from 'node:fs/promises';
import path from 'node:path';

const roots = [
  'assets/menu/farouj/optimized',
  'assets/vendor/fonts',
  'assets/vendor/phosphor'
];
const assets = [
  './assets/brand/farouj-logo-small.webp',
  './assets/brand/farouj-icon.png',
  './assets/vendor/local-fonts.css'
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else assets.push('./' + full.replaceAll('\\', '/'));
  }
}

for (const root of roots) await walk(root);
assets.sort((a, b) => a.localeCompare(b));
await fs.writeFile('offline-assets.json', JSON.stringify([...new Set(assets)], null, 2) + '\n');
console.log(`offline-assets.json: ${assets.length} assets`);
