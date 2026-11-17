# Ancrage et Horizons — version prête pour un éditeur en ligne

Ce projet conserve la présentation validée de la page d'accueil.
Les textes se trouvent dans les fichiers `contenus/*.json`.

## Fonctionnement final recherché

1. Le code du site est conservé dans un dépôt GitHub, de préférence privé si la formule retenue le permet.
2. Netlify est lié à ce dépôt et publie automatiquement chaque modification.
3. Pages CMS (`https://app.pagescms.org`) propose une interface de saisie des textes,
   des fiches-projets et de la photographie d'accueil.

## À faire une seule fois

- Revendiquer le site d'essai dans Netlify, avec un compte de l'association.
- Créer un compte GitHub (ou utiliser un compte de l'association).
- Créer un dépôt GitHub contenant les fichiers de ce dossier **à la racine**.
- Dans le site Netlify existant : `Project configuration` > `Developer settings`
  > `Continuous deployment` > `Repository` > `Link repository`.
- Sélectionner le dépôt GitHub. Le fichier `netlify.toml` configure la compilation
  avec Node.js et la publication de `dist`.
- Aller sur `https://app.pagescms.org`, se connecter avec GitHub, autoriser le dépôt
  (accès limité à ce dépôt si possible), puis ouvrir le dépôt dans Pages CMS.

## Vérification

Dans Pages CMS, modifier temporairement le texte d'accroche de l'accueil, enregistrer
puis vérifier qu'il apparaît sur Netlify après le déploiement. Rétablir ensuite le texte.

## Si vous avez un technicien pour la mise en route

Aucune bibliothèque à installer. `node scripts/build.mjs` crée le dossier `dist/`.
Test local recommandé : `node scripts/build.mjs` puis serveur HTTP depuis `dist`.

## Important

- La page est une **version de travail** : pas de diffusion institutionnelle pour le moment.
- Les informations officielles, mentions légales, conditions de confidentialité et
  liens d'adhésion restent à vérifier/compléter.
- L'éditeur Pages CMS ne peut pas fonctionner depuis un dossier ZIP seul : la connexion
  GitHub + Netlify est nécessaire.
- En phase de test, ne pas publier d'informations personnelles ou sensibles.
