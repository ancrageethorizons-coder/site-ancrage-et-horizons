# Ancrage et Horizons — Préparation à la mise en ligne publique

État du dossier : 20 novembre 2026. **Le site est encore en phase de vérification**, avec des balises `noindex,nofollow` volontairement conservées sur les pages pour empêcher leur indexation pendant les travaux.

## Pages prévues pour la première publication

- [x] Accueil (`/`)
- [x] L'association (`/association/`) — la philosophie et l'approche y sont présentées en sections
- [x] Nos activités (`/activites/`)
- [x] Nos projets (`/projets/`) — contenu issu de `contenus/projets.json`
- [x] Accès aux formulaires AssoConnect : membre de soutien et membre actif
- [x] Retour depuis AssoConnect vers le site, testé par l'association

## Référencement préparé

- [x] Titres et descriptions de page
- [x] URL canonique et métadonnées Open Graph pour chaque page
- [x] Données structurées `Organization` sur l'accueil
- [x] Construction automatique de `sitemap.xml` et `robots.txt` avec les quatre pages
- [x] Adresse Cloudflare Pages confirmée : `https://ancrageethorizons.pages.dev/` (un domaine propre reste possible ultérieurement)
- [x] Premier déploiement Cloudflare Pages réussi le 20 novembre 2026, d'après la capture de confirmation de l'association
- [ ] Vérifier les pages et les assets publiquement sans connexion
- [ ] **Après feu vert de lancement seulement :** supprimer `noindex,nofollow` des quatre pages
- [ ] Vérifier qu'aucun contrôle d'accès Cloudflare ou en-tête HTTP `X-Robots-Tag: noindex` ne bloque le domaine de production
- [ ] Ajouter le site à Google Search Console et vérifier la propriété
- [ ] Soumettre `https://ancrageethorizons.pages.dev/sitemap.xml`
- [ ] Inspecter chaque URL publiée dans Search Console ; l'indexation ne sera pas instantanée ni garantie

## Informations juridiques et RGPD — à compléter AVANT l'ouverture publique

- [x] Créer la page « Mentions légales » avec identité, siège, responsable de publication, coordonnées et hébergeur (publication GitHub le 21 novembre 2026 ; contrôler le rendu et confirmer le SIREN sur source officielle)
- [x] Numéro RNA `W9G1012339` confirmé par récépissé préfectoral du 14 septembre 2026 et publication JOAFE du 29 septembre 2026
- [ ] Vérifier si un numéro SIREN/SIRET est à mentionner ; ne pas se fier à une fiche commerciale non confirmée
- [x] Créer une notice « Protection des données personnelles » distinguant site vitrine, emails et AssoConnect (version de travail, 21 novembre 2026)
- [ ] Faire valider les bases légales et surtout des durées de conservation précises ainsi que les sous-traitants/transferts potentiels avant de présenter la notice comme définitive
- [ ] Examiner les cookies/traceurs effectivement déposés sur le site vitrine et adapter les informations/consentements nécessaires
- [x] Ajouter les liens Mentions légales et Protection des données au pied des quatre pages et entre les pages légales ; contrôler leur rendu déployé

## Validation des contenus et qualité

- [ ] Relecture éditoriale par l'association : actualité des projets, libellés et cohérence du projet associatif
- [ ] Vérifier l'affichage sur téléphone et tablette, la lisibilité, le contraste et les boutons
- [ ] Tester tous les liens : navigation interne, courriel, soutien, membre actif, retour depuis AssoConnect
- [ ] Vérifier l'origine et les droits d'usage des visuels ; les illustrations ne doivent pas être présentées comme des photos d'activités réalisées
- [ ] Vérifier les coordonnées et les mentions d'adhésion/cotisation avant annonce publique

## Commande de construction du site

`node scripts/build.mjs` : génère `dist/`, y compris la page projets, `robots.txt`, `sitemap.xml` et les contenus Pages CMS.

Pour la première publication officielle, faire une validation du site de production, puis seulement retirer `noindex,nofollow` et inscrire le domaine dans Search Console.
