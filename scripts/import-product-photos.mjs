import fs from 'node:fs/promises';
import sharp from 'sharp';
const base = 'https://www.aromashanami.com.br/';
const products = [
 ['difusor-figo','difusor-de-aromas-de-figo','Difusor de varetas Figo HANAMI'],
 ['difusor-pitanga','difusor-de-aromas-pitanga-varetas','Difusor de varetas Pitanga HANAMI'],
 ['difusor-jabuticaba','difusor-aromas-jabuticaba-varetas','Difusor de varetas Jabuticaba HANAMI'],
 ['difusor-laranja-lima','difusor-aromas-laranja-lima-varetas','Difusor de varetas Laranja Lima HANAMI'],
 ['spray-figo','spray-de-ambientes-aroma-figo','Spray de ambiente Figo HANAMI'],
 ['spray-pitanga','spray-de-ambientes-aroma-pitanga','Spray de ambiente Pitanga HANAMI'],
 ['spray-jabuticaba','spray-de-ambientes-aroma-jabuticaba','Spray de ambiente Jabuticaba HANAMI'],
 ['spray-laranja-lima','spray-de-ambientes-aroma-laranja-lima','Spray de ambiente Laranja Lima HANAMI'],
 ['tecidos-figo','agua-de-lencois-c-aroma-de-figo','Água de lençóis Figo HANAMI'],
 ['tecidos-pitanga','agua-de-lencois-c-aroma-de-pitanga','Água de lençóis Pitanga HANAMI'],
 ['tecidos-jabuticaba','agua-de-lencois-c-aroma-de-jabuticaba','Água de lençóis Jabuticaba HANAMI'],
 ['tecidos-laranja-lima','agua-de-lencois-c-aroma-de-laranja-lima','Água de lençóis Laranja Lima HANAMI'],
 ['refil-figo','refil-difusor-de-aromas-de-figo-c-varetas-de-bambu','Refil para difusor Figo HANAMI'],
 ['kit-pitanga','kit-pitanga-triplo-spray-difusor-agua-hanami','Kit Pitanga HANAMI com difusor, spray e água de lençóis'],
];
await fs.mkdir('public/images/blog/produtos',{recursive:true});
const photos = {};
for (const [id,slug,alt] of products) {
 const page = await fetch(base+slug,{signal:AbortSignal.timeout(30000)});
 if (!page.ok) throw Error(`${slug}: HTTP ${page.status}`);
 const html = await page.text();
 const source = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1]?.replaceAll('&amp;','&');
 if (!source || !new URL(source).hostname.endsWith('awsli.com.br')) throw Error('No store image: '+slug);
 const response = await fetch(source,{signal:AbortSignal.timeout(30000)});
 if (!response.ok) throw Error('Image HTTP '+response.status);
 const input = Buffer.from(await response.arrayBuffer());
 const metadata = await sharp(input).metadata();
 const widths = [...new Set([480,800,Math.min(1200,metadata.width)].filter(w=>w<=metadata.width))].sort((a,b)=>a-b);
 const variants = [];
 for (const width of widths) {
  const file = `/images/blog/produtos/${id}-${width}.webp`;
  const info = await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:83}).toFile('public'+file);
  variants.push({src:file,width:info.width,height:info.height,bytes:info.size});
 }
 photos[id] = {alt,productUrl:base+slug,sourceUrl:source,variants};
 console.log(id+': '+variants.map(v=>Math.round(v.bytes/1024)+'KB').join(', '));
}
await fs.writeFile('src/data/product-photos.json',JSON.stringify(photos,null,2)+'\n');
