import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
const names = ['accueil','domaines','caraibe','projets','participer'];
const content = {};
for(const name of names){
  const raw=await readFile(path.join('contenus', name+'.json'),'utf8');
  Object.assign(content, JSON.parse(raw));
}
await rm('dist',{recursive:true,force:true});
await mkdir('dist/assets',{recursive:true});
await copyFile('index.html','dist/index.html');
await copyFile('assets/logo.png','dist/assets/logo.png');
await copyFile('assets/accueil.webp','dist/assets/accueil.webp');
// Copy all other images in the asset folder, including those uploaded by Pages CMS.
const { readdir } = await import('node:fs/promises');
for(const filename of await readdir('assets')) {
  if (filename === 'logo.png' || filename === 'accueil.webp') continue;
  await copyFile(path.join('assets',filename),path.join('dist/assets',filename));
}
await writeFile('dist/assets/contenu.js', 'window.AH_CONTENT = '+JSON.stringify(content,null,2)+';\n', 'utf8');
console.log('Site construit : dist/');
