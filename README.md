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
img/shots/      captures d'écran de l'application, JPEG 640 px de large
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

Les captures viennent de l'iPhone (Réglages → thème sombre). Elles sont réduites
et converties en JPEG pour tenir le poids de la page :

```bash
sips -s format jpeg -s formatOptions 88 -Z 640 ~/Downloads/IMG_XXXX.PNG --out img/shots/nom.jpg
```

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
