# Ascend

Application mobile de suivi de la condition physique, développée en **React Native** dans le cadre de mon projet personnel de L3 Sciences du numérique à l'Université Catholique de Lille.

Ascend réunit au même endroit le suivi de l'alimentation, des entraînements et de l'évolution du corps.

## Fonctionnalités

**Indispensables**
- Compte et profil avec calcul automatique des besoins en calories et en macronutriments
- Journal alimentaire par repas, avec recherche d'aliments via Open Food Facts
- Création de séances (séries, répétitions, charges), suivi du cardio et des records personnels
- Suivi du poids avec courbe d'évolution
- Tableau de bord et graphiques hebdomadaires et mensuels
- Export et suppression des données personnelles

**Prévues**
- Aliments favoris, recettes personnalisées, copie de repas
- Mode « séance en cours » avec minuteur de repos, modèles de séances
- Mensurations et rappels
- Thème sombre, hydratation, badges

## Technologies

| Domaine | Outil |
|---|---|
| Application mobile | React Native + Expo |
| Langage | TypeScript |
| Navigation et état | Expo Router, Zustand |
| Compte et base de données | Supabase (PostgreSQL) |
| Données alimentaires | API Open Food Facts |
| Graphiques | react-native-gifted-charts |
| Tests | Jest |

## Installation

```bash
git clone https://github.com/TON_PSEUDO/ascend.git
cd ascend
npm install
npx expo start
```

Scanne ensuite le QR code avec l'application **Expo Go** (Android / iOS) pour lancer Ascend sur ton téléphone.

## Tests

```bash
npm test
```

## Auteur

**Ismail Rakeb Soussi**, L3 Sciences du numérique, Université Catholique de Lille (2026-2027)