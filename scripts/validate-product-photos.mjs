import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const photos = JSON.parse(await fs.readFile('src/data/product-photos.json', 'utf8'));
for (const photo of Object.values(photos)) {
  assert(photo.alt && photo.productUrl.startsWith('https://www.aromashanami.com.br/'));
  for (const variant of photo.variants) {
    const image = await sharp('public' + variant.src).metadata();
    assert.equal(image.width, variant.width);
    assert.equal(image.height, variant.height);
  }
}
const files = (await fs.readdir('src/content/posts')).filter(f => f.endsWith('.md'));
for (const file of files) {
  const text = await fs.readFile('src/content/posts/' + file, 'utf8');
  const front = text.split(/\r?\n---/)[0];
  const src = front.match(/^heroImage: "([^"]+)"/m)?.[1];
  assert(src && !src.endsWith('.svg'), file + ': missing photographic cover');
  assert(/^heroImageAlt: "[^"]+"/m.test(front), file + ': missing alt');
  await fs.access('public' + src);
}
async function inspect(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const path = dir + '/' + entry.name;
    if (entry.isDirectory()) await inspect(path);
    else if (entry.name.endsWith('.html')) {
      assert(!(await fs.readFile(path, 'utf8')).includes('/editorial.svg'), path + ': placeholder image');
    }
  }
}
await inspect('dist');
console.log(`${Object.keys(photos).length} official product photographs, ${files.length} article covers; dimensions, alt text and generated pages OK.`);
