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

const canonicalBase = 'https://ancrageethorizons.netlify.app';
const publicPages = ['/', '/association/', '/activites/'];
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  publicPages.map(p => '  <url><loc>' + escapeXml(canonicalBase + p) + '</loc></url>').join('\n') +
  '\n</urlset>\n';
await writeFile('dist/sitemap.xml', sitemap, 'utf8');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + canonicalBase + '/sitemap.xml\n', 'utf8');
// IMPORTANT: HTML pages still contain noindex,nofollow while the site is under preparation.
