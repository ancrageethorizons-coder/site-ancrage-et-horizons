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
// Welcome panel for AssoConnect iframe: no private data; intentionally excluded from sitemap.
await mkdir('dist/bienvenue-membres', {recursive:true});
await copyFile('bienvenue-membres/index.html','dist/bienvenue-membres/index.html');
await mkdir('dist/presentation-assoconnect', {recursive:true});
await copyFile('presentation-assoconnect/index.html','dist/presentation-assoconnect/index.html');
await mkdir('dist/mentions-legales', {recursive:true});
await copyFile('mentions-legales/index.html','dist/mentions-legales/index.html');
await mkdir('dist/confidentialite', {recursive:true});
await copyFile('confidentialite/index.html','dist/confidentialite/index.html');
await mkdir('dist/conditions-adhesion', {recursive:true});
await copyFile('conditions-adhesion/index.html','dist/conditions-adhesion/index.html');
for (const name of pageFiles) {
  await mkdir(`dist/${name}`, { recursive: true });
  await copyFile(`${name}/index.html`, `dist/${name}/index.html`);
}
// Generate the projects page from the same JSON maintained in Pages CMS.
const projectsData = JSON.parse(await readFile('contenus/projets.json', 'utf8'));
const escapeHTML = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const projectsTemplate = await readFile('projets/index.html', 'utf8');
const projectPhoto = (src, alt, caption, cssClass) => {
  // Only locally uploaded image assets; leave empty when a photo is not provided.
  if (typeof src !== 'string' || !/^\/assets\/[a-z0-9._%+ -]+\.(?:png|jpe?g|webp|avif)$/i.test(src) || src.includes('..')) return '';
  const captionHTML = caption ? '<figcaption>' + escapeHTML(caption) + '</figcaption>' : '';
  return '<figure class="' + cssClass + '"><img loading="lazy" src="' + escapeHTML(src) +
         '" alt="' + escapeHTML(alt || 'Photographie du projet') + '">' + captionHTML + '</figure>';
};
const projectsCards = (projectsData.projects || []).map((project, index) => {
  const cover = projectPhoto(project.coverImage, project.coverAlt || project.title, project.coverCaption, 'cover');
  const paragraphs = String(project.details || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    .map(p => '<p>' + escapeHTML(p) + '</p>').join('');
  const gallery = (Array.isArray(project.gallery) ? project.gallery : []).map(photo =>
    projectPhoto(photo.image, photo.alt || project.title, photo.caption, 'photo')
  ).filter(Boolean).join('');
  const extra = paragraphs || gallery ? '<details class="details-toggle"><summary>En savoir plus sur ce projet</summary>' +
    '<div class="details-copy">' + paragraphs + '</div>' + (gallery ? '<div class="gallery">' + gallery + '</div>' : '') + '</details>' : '';
  return '<article class="card" id="projet-' + (index + 1) + '">' + cover + '<div class="card-body">' +
    '<p class="status">' + escapeHTML(project.status || 'Projet en développement') + '</p><h2>' +
    escapeHTML(project.title) + '</h2><p>' + escapeHTML(project.description) + '</p>' + extra + '</div></article>';
}).join('');
await mkdir('dist/projets', {recursive:true});
await writeFile('dist/projets/index.html',
  projectsTemplate.replace('{{PROJECTS_LEAD}}', escapeHTML(projectsData.projectsLead))
                  .replace('{{PROJECTS_CARDS}}', projectsCards), 'utf8');

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
console.log('Site construit avec accueil, association, activites, projets : dist/');

const canonicalBase = 'https://ancrageethorizons.pages.dev';
// Publication du site vitrine ; les conditions d’adhésion restent accessibles mais non indexées jusqu’au vote.
const publicPages = ['/', '/association/', '/activites/', '/projets/', '/mentions-legales/', '/confidentialite/'];
for (const route of publicPages) {
  const htmlPath = path.join('dist', route.replace(/^\//, ''), 'index.html');
  let html = await readFile(htmlPath, 'utf8');
  html = html.replace('<meta name="robots" content="noindex,nofollow">', '<meta name="robots" content="index,follow">');
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', '<link rel="canonical" href="' + canonicalBase + route + '">\n</head>');
  }
  await writeFile(htmlPath, html, 'utf8');
}
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  publicPages.map(p => '  <url><loc>' + escapeXml(canonicalBase + p) + '</loc></url>').join('\n') +
  '\n</urlset>\n';
await writeFile('dist/sitemap.xml', sitemap, 'utf8');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + canonicalBase + '/sitemap.xml\n', 'utf8');
// Source templates keep noindex during editing; published pages listed above opt in at build time.
