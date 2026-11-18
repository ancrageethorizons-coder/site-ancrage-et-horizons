import { readFile, writeFile, mkdir, copyFile, rm, readdir } from 'node:fs/promises';
import path from 'node:path';

const homeFiles = ['accueil', 'domaines', 'caraibe', 'projets', 'participer'];
const pageFiles = ['association', 'activites'];
const home = {};
const pages = {};

for (const name of homeFiles) {
  const raw = await readFile(path.join('contenus', `${name}.json`), 'utf8');
  Object.assign(home, JSON.parse(raw));
}
for (const name of pageFiles) {
  const raw = await readFile(path.join('contenus', `${name}.json`), 'utf8');
  pages[name] = JSON.parse(raw);
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await copyFile('index.html', 'dist/index.html');
for (const name of pageFiles) {
  await mkdir(`dist/${name}`, { recursive: true });
  await copyFile(`${name}/index.html`, `dist/${name}/index.html`);
}
// Keep all current images, including those later uploaded through Pages CMS.
for (const name of await readdir('assets')) {
  const source = path.join('assets', name);
  // We only keep image files here. Subdirectories, if introduced, need separate handling.
  const { stat } = await import('node:fs/promises');
  if (!(await stat(source)).isFile()) continue;
  await copyFile(source, path.join('dist/assets', name));
}
await writeFile('dist/assets/contenu.js',
  'window.AH_CONTENT = ' + JSON.stringify(home) + ';\n' +
  'window.AH_PAGES = ' + JSON.stringify(pages) + ';\n', 'utf8');
console.log('Site construit avec accueil, association, activites : dist/');
