# Site public CarCare

Pages statiques requises par App Store Connect pour l'application **CarCare**.

| Page | Rôle | À renseigner dans App Store Connect |
|------|------|-------------------------------------|
| `privacy.html` | Politique de confidentialité | *URL d'engagement de confidentialité* |
| `support.html` | Assistance et FAQ | *URL de l'assistance* |
| `index.html` | Page d'accueil | *URL marketing* (facultatif) |

Aucune dépendance, aucune étape de build : ce sont des fichiers HTML/CSS statiques.

```
index.html      accueil : présentation, galerie, fonctions, FAQ courte
support.html    assistance : FAQ complète, groupée par thème
privacy.html    politique de confidentialité
style.css       feuille de style commune (identité « Onyx »)
favicon.ico     copie de img/icon.png, pour les navigateurs qui sondent la racine
img/icon.png    icône de l'application (en-tête, héros, favicon)
img/shots/      captures d'écran recadrées, JPEG 640 px de large
carousel.js     flèches et pastilles du carrousel (le défilement est natif)
```

## Contact

L'adresse d'assistance publiée sur le site est `contact.chamallaw@gmail.com`.
Pour la changer :

```bash
sed -i '' 's/contact\.chamallaw@gmail\.com/NOUVELLE_ADRESSE/g' *.html
```

## Aperçu local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement — GitHub Pages

```bash
gh repo create carcare-site --public --source=. --push
```

Puis dans le dépôt : **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.

Les URL seront de la forme :

```
https://<utilisateur>.github.io/carcare-site/privacy.html
https://<utilisateur>.github.io/carcare-site/support.html
```

## Mettre à jour les captures d'écran

Les captures viennent de l'iPhone (Réglages → thème sombre). Elles sont
**recadrées puis réduites** : un écran d'iPhone entier fait 1179 × 2556, soit
deux fois plus haut que large, ce qui impose dans une page web soit une image
démesurée, soit une image trop petite pour qu'on y distingue quoi que ce soit.
On garde donc 1500 px de haut sur la partie utile de l'écran.

```bash
# 1. recadrer : hauteur 1500, largeur 1179, décalage depuis le haut
sips -c 1500 1179 --cropOffset 0 0 ~/Downloads/IMG_XXXX.PNG --out /tmp/crop.png

# 2. réduire à 640 px de LARGE (attention : -Z contraint le plus grand côté,
#    donc la hauteur sur une capture en portrait — utiliser --resampleWidth)
sips -s format jpeg -s formatOptions 86 --resampleWidth 640 /tmp/crop.png --out img/shots/nom.jpg
```

Le décalage se choisit selon l'écran : 0 quand l'intérêt est en haut, plus bas
quand il s'agit de montrer des actions de bas de page (`fiche.jpg` est prise à
880). Les images sont affichées sur 240 px, soit près de trois fois moins que
leur définition : elles restent nettes sur écran retina.

Deux précautions avant de publier une capture :

- **Vérifier les données affichées.** Les captures actuelles montrent le jeu de
  données de démo (plaques `AB-123-CD` et `EF-456-GH`, garages fictifs), pas des
  données réelles. Charger les données de démo avant de photographier l'écran
  évite d'exposer un carnet personnel.
- **Vérifier qu'elle reflète la version en ligne.** Une capture montrant un
  compteur, une limite ou un libellé qui n'existent plus crée une contradiction
  avec le texte de la page.

## Maintenir à jour

La politique de confidentialité décrit le comportement réel de l'application.
Toute évolution touchant aux données (nouveau service tiers, nouvelle donnée
collectée, envoi de photos vers un serveur…) doit être répercutée ici, ainsi
que la date de dernière mise à jour en haut de `privacy.html`.
