import fs from 'node:fs/promises';
const photos = JSON.parse(await fs.readFile('src/data/product-photos.json', 'utf8'));
const plan = JSON.parse(await fs.readFile('content-plan.json', 'utf8'));
const fragrances = ['figo', 'pitanga', 'jabuticaba', 'laranja-lima'];
let changed = 0;
for (const [index, item] of plan.entries()) {
  const path = `src/content/posts/${item.slug}.md`;
  const text = await fs.readFile(path, 'utf8');
  const end = text.indexOf('\n---', 3);
  let front = text.slice(0, end);
  if (/heroImage:.*\/hanami\//.test(front)) continue;
  const slug = item.slug;
  const fragrance = fragrances.find(name => slug.includes(name)) ?? fragrances[index % 4];
  let type = /agua-lencois|agua-tecidos/.test(item.group) ? 'tecidos'
    : item.group === 'sprays' ? 'spray' : 'difusor';
  if (/agua-de-lencois|agua-perfumada|agua-para-tecidos/.test(slug)) type = 'tecidos';
  else if (/spray/.test(slug)) type = 'spray';
  let key = `${type}-${fragrance}`;
  if (/refil/.test(slug) && !fragrances.some(name => name !== 'figo' && slug.includes(name))) key = 'refil-figo';
  if (/eletrico|ultrassonico|kit|comparar|diferenca/.test(slug) && !fragrances.some(name => slug.includes(name))) key = 'kit-pitanga';
  const photo = /^(marca|pomar)$/.test(item.group)
    ? { alt: 'Glaeli com os produtos da coleção Pomar de Minas HANAMI', variants: [{ src: '/images/blog/hanami/pomar-de-minas-1200.webp' }] }
    : photos[key];
  front = front.replace(/^heroImage:.*\r?\n?/gm, '').replace(/^heroImageAlt:.*\r?\n?/gm, '');
  front += `\nheroImage: ${JSON.stringify(photo.variants.at(-1).src)}\nheroImageAlt: ${JSON.stringify(photo.alt)}`;
  await fs.writeFile(path, front + text.slice(end));
  changed++;
}
console.log(`Updated ${changed} article covers; preserved existing brand photographs.`);
