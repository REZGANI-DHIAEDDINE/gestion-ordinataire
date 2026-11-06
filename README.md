# Gestion des ordinateurs (Vue.js 3)

Application Vue 3 + Vite + Vue Router pour consulter, ajouter, modifier et supprimer des ordinateurs.
Les données sont enregistrées dans le `localStorage` du navigateur (pas de serveur).

## Prérequis
- Node.js 18 ou plus récent (https://nodejs.org)

## Installation
```bash
npm install
```

## Lancer en développement
```bash
npm run dev
```
Ouvrir ensuite http://localhost:5173

## Construire pour la production
```bash
npm run build
npm run preview
```

## Routes
| Route | Page |
|---|---|
| /ordinateurs | Liste |
| /ordinateurs/ajouter | Ajout |
| /ordinateurs/modifier/:id | Modification |

## Fonctionnalités
Liste en cartes, ajout/modification (même formulaire), suppression avec confirmation,
persistance localStorage, et bonus : recherche, compteur, tri par mémoire.
