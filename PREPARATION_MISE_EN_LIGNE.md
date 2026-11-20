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
- [ ] Confirmer l'adresse définitive du site : `https://ancrageethorizons.netlify.app/` ou un domaine propre
- [ ] Vérifier le site public sans connexion Netlify et le succès du dernier déploiement
- [ ] **Après feu vert de lancement seulement :** supprimer `noindex,nofollow` des quatre pages
- [ ] Vérifier qu'aucun contrôle d'accès Netlify ou en-tête HTTP `X-Robots-Tag: noindex` ne bloque le domaine de production
- [ ] Ajouter le site à Google Search Console et vérifier la propriété
- [ ] Soumettre `https://ancrageethorizons.netlify.app/sitemap.xml` (si domaine confirmé)
- [ ] Inspecter chaque URL publiée dans Search Console ; l'indexation ne sera pas instantanée ni garantie

## Informations juridiques et RGPD — à compléter AVANT l'ouverture publique

- [ ] Préparer la page « Mentions légales » à partir des informations **officielles validées** de l'association : identité, adresse de siège à publier, responsable de publication, coordonnées et hébergeur
- [ ] Confirmer le numéro RNA sur la pièce officielle ; une fiche publique mentionne `W9G1012339`
- [ ] Vérifier si un numéro SIREN/SIRET est à mentionner ; ne pas se fier à une fiche commerciale non confirmée
- [ ] Préparer une information « Données personnelles » qui distingue le site vitrine et les formulaires AssoConnect (collecte, finalités, destinataires, durée de conservation et droits)
- [ ] Examiner les cookies/traceurs effectivement déposés sur le site vitrine et adapter les informations/consentements nécessaires
- [ ] Ajouter les liens légaux dans le pied de page de chaque page, une fois les textes vérifiés

## Validation des contenus et qualité

- [ ] Relecture éditoriale par l'association : actualité des projets, libellés et cohérence du projet associatif
- [ ] Vérifier l'affichage sur téléphone et tablette, la lisibilité, le contraste et les boutons
- [ ] Tester tous les liens : navigation interne, courriel, soutien, membre actif, retour depuis AssoConnect
- [ ] Vérifier l'origine et les droits d'usage des visuels ; les illustrations ne doivent pas être présentées comme des photos d'activités réalisées
- [ ] Vérifier les coordonnées et les mentions d'adhésion/cotisation avant annonce publique

## Commande de construction du site

`node scripts/build.mjs` : génère `dist/`, y compris la page projets, `robots.txt`, `sitemap.xml` et les contenus Pages CMS.

Pour la première publication officielle, faire une validation du site de production, puis seulement retirer `noindex,nofollow` et inscrire le domaine dans Search Console.
