# Site public CarCare

Pages statiques requises par App Store Connect pour l'application **CarCare**.

| Page | Rôle | À renseigner dans App Store Connect |
|------|------|-------------------------------------|
| `privacy.html` | Politique de confidentialité | *URL d'engagement de confidentialité* |
| `support.html` | Assistance et FAQ | *URL de l'assistance* |
| `index.html` | Page d'accueil | *URL marketing* (facultatif) |

Aucune dépendance, aucune étape de build : ce sont des fichiers HTML/CSS statiques.

## Avant la mise en ligne

Remplacer l'adresse de contact utilisée comme espace réservé :

```bash
sed -i '' 's/contact@exemple\.com/VOTRE_ADRESSE/g' *.html
```

Vérifier qu'il n'en reste aucune :

```bash
grep -rn "contact@exemple.com" *.html || echo "OK"
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
