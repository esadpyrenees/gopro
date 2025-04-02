# Auto-défense économique
  
Réflexions, ressources et références pour se préparer à la survie économique en tant que designer dans un monde hostile.

Un site généré avec [Eleventy](https://11ty.dev).

## Téléchargement

```bash
git clone https://github.com/esadpyrenees/gopro.git
```
Ou [téléchargez le zip](https://github.com/esadpyrenees/gopro/archive/refs/heads/main.zip).

## Installation

```bash
cd gopro
npm install
```

## Usage

```bash
# Lance le serveur de développement
npm run start 
# Crée le site statique
npm run build 
```

## Déploiement

Via `rsync`.

```bash
# Lance le build, puis la synchronisation
npm run deploy
```

Éditer le fichier `package.json` pour modifier les valeurs.

Votre login @ hôte ssh et dossier cible (nécessité qu’une clé SSH soit créée sur votre ordi et référencée sur le serveur) :
`you@ssh.example.com:www/target_directory/`

Si vous souhaitez accéder au site depuis `https://votredomaine.com/target_directory/` : 
`--pathprefix target_directory`

```json
"scripts":  {
  "sync": "rsync -avz --progress --delete public/ xxxxxxxxx@esad-pyrenees.fr:www/gopro/",
  "deploy": "rm -r public && npx @11ty/eleventy --pathprefix gopro && npm run sync"
}
```



