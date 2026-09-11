# Site public CarCare

Pages statiques requises par App Store Connect pour l'application **CarCare**.

| Page | Rôle | À renseigner dans App Store Connect |
|------|------|-------------------------------------|
| `privacy.html` | Politique de confidentialité | *URL d'engagement de confidentialité* |
| `support.html` | Assistance et FAQ | *URL de l'assistance* |
| `index.html` | Page d'accueil | *URL marketing* (facultatif) |

Aucune dépendance, aucune étape de build : ce sont des fichiers HTML/CSS statiques.

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

## Maintenir à jour

La politique de confidentialité décrit le comportement réel de l'application.
Toute évolution touchant aux données (nouveau service tiers, nouvelle donnée
collectée, envoi de photos vers un serveur…) doit être répercutée ici, ainsi
que la date de dernière mise à jour en haut de `privacy.html`.
