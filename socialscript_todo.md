# Programme SocialScript V2 — Frontend React (2 semaines)

**Stack :** Vite + React + Tailwind + React Router (data mode) + Jotai + Axios

**Objectif de fin :** une SPA React connectée à ton API, qui reprend toutes les fonctionnalités de la V1 et les étend avec l'auth, les contributions utilisateurs et la modération.

---

## 🗓️ SEMAINE 1 — Fondations, routing, lecture publique

**Objectif de fin de semaine :** naviguer dans l'app, voir les difficultés → thèmes → scénarios depuis l'API réelle, sans auth.

---

### Jour 1 — Setup du projet ✅

- [x] `npm create vite@latest` → React + JavaScript
- [x] Installer : `npm i tailwindcss @tailwindcss/vite react-router-dom axios jotai`
- [x] Configurer Tailwind dans `vite.config.js` et `index.css`
- [x] Créer le thème Tailwind dans `theme.css` en reprenant les couleurs de la V1 (`--primary`, `--secondary`, etc.)
- [x] Mettre en place le `.env` avec `VITE_API_URL=http://localhost:3000/api`
- [x] Créer l'arborescence `src/`
- [x] Route test `GET /` → page `Home.jsx` qui répond
- [x] Commit

**Questions à te poser**
- Pourquoi `VITE_API_URL` et pas juste `API_URL` ? Qu'est-ce que Vite fait avec ce préfixe ?
- Quelle différence entre `import.meta.env.VITE_API_URL` et `process.env.API_URL` ?

---

### Jour 2 — Routing + Layout ✅

- [x] Configurer `routes.jsx` avec React Router data mode (`createBrowserRouter`)
- [x] Créer le layout avec `<Outlet />` : Header + Footer persistants sur toutes les pages
- [x] Reprendre la navbar de la V1 : logo, liens de navigation, bouton CTA
- [x] Menu hamburger mobile
- [x] Implémenter `<NavLink>` avec classes actives Tailwind
- [x] Page `NotFound.jsx`
- [x] Tester la navigation entre pages
- [x] Créer composant `<Card/>` standardisé
- [x] FaqSection avec `<details>` et `<summary>`
- [x] Créer les différentes sections de `Home.jsx` : `<HeroSection />`, `<FeaturesSection />`, `<ExploreSection />`, `<FaqSection />`, `<Testimonial />`
- [x] Créer composants réutilisables : `Card`, `Button`, `Badge`

**Questions à te poser**
- Quelle différence entre `<Link>` et `<NavLink>` ?
- Pourquoi utilise-t-on un layout avec `<Outlet />` plutôt que de répéter Header/Footer dans chaque page ?
- Comment React Router sait quelle page afficher à l'intérieur du layout ?

---

### Jour 3 — Services + Page Difficultés/Thèmes ✅

- [x] Créer `services/difficulty.service.js` → `getAll()`
- [x] Créer `services/theme.service.js` → `getByDifficulty(difficultyId)`
- [x] Page `Scenarios.jsx` : affiche les boutons de difficulté (comme la V1)
- [x] Au clic sur une difficulté → affiche les thèmes associés
- [x] Gérer les 3 états : `loading` / `error` / `data`

**Questions à te poser**
- Pourquoi on met les appels API dans des fichiers `service` séparés plutôt que directement dans le composant ?
- Que se passe-t-il si on oublie le tableau de dépendances `[]` dans `useEffect` ?
- Pourquoi faut-il gérer l'état `loading` ? Que voit l'utilisateur sans lui ?

---

### Jour 4 — Liste et détail de scénario 🔄

- [x] Créer `services/scenario.service.js` → `getByTheme(themeId)` et `getById(id)`
- [x] Au clic sur un thème → affiche la liste légère des scénarios (titre + contexte)
- [x] Route dynamique `/scenarios/:id` → page `ScenarioDetail.jsx`
- [x] Récupérer l'`id` avec `useParams`
- [x] Afficher le scénario complet : contexte, avatar DiceBear, dialogue, 3 choix
- [x] Reprendre la logique de la V1 : clic sur un choix → affiche le feedback (`reactionText`, `analysis`, `keyTakeaway`)

**Questions à te poser**
- Comment `useParams` récupère-t-il l'id dans l'URL ?
*useParams récupère l'id dynamique grace au ReactRouter et au path 'scenarios/:id'. Si l'URL est localhost:5173/scenarios/123a, {id} = 123a*
- Pourquoi crée-t-on deux services séparés (`getByTheme` et `getById`) plutôt qu'un seul appel ?
*Pour séparer la logique et avoir un code facile maintenir*
*deux besoins distincts. getByTheme sert la liste (titre + contexte), getById sert le détail complet.*
- L'URL de l'avatar DiceBear dépend de quel champ du modèle Mongoose ?
*Il dépdend de 'characterAvatarSeed' mais j'hésite a aller piocher directement dans l'API DiceBear pour le moment, qu'en penses-tu?*

---

### Jour 4½ — Refonte UI scénario 🔄

#### 🏗️ 1. Layout spécifique

- [ ] `ScenarioLayout.jsx` — conteneur h-screen, mode Focus, sans Header/Footer

#### 🧩 2. Navigation (haut de l'écran)

- [x] `ScenarioTopBar.jsx` — bouton croix + titre du scénario
- [x] `SegmentedProgressBar.jsx` — props `totalSteps` / `currentStep`

#### 💬 3. Chat (cœur de l'interaction)

- [x] `ChatContainer.jsx` — scroll automatique vers le bas à chaque nouveau message
- [x] `ChatBubble.jsx` — prop `isUser` (aligné droite/gauche)
- [x] FeedbackCoach.jsx` — style distinct (bordure accent, icône 💡), animation d'apparition douce

#### 👆 4. Interaction (bas de l'écran)

- [x] `ChoiceList.jsx` — conteneur des 3 options de réponse
- [x] `ChoiceButton.jsx` — bouton plus grand, texte aligné à gauche
- [x] `ActionControls.jsx` — boutons Précédent / Continuer / Rejouer

#### 🗂️ 5. Écrans 

- [ ] `ScenarioSelection.jsx` — sélection difficulté + thème avec cartes
- [x] `ScenarioPlay.jsx` — écran principal du chat
- [ ] `ScenarioOutro.jsx` — écran de fin : résumé + rejouer / retour accueil

#### 💡 6. Feedback In-line (coach virtuel)

- [] **`FeedbackCoach.jsx`**
  - [x] UI distincte : fond clair, `border-accent`, icône 💡
  - [ ] Animation `animate-fade-in-up`
- [ ] **Logique dans `ScenarioPlay.jsx`**
  - [ ] Étape 1 : au clic sur un choix → masquer la zone de choix
  - [x] Étape 2 : afficher le choix comme bulle utilisateur (droite, fond coloré)
  - [x] Étape 3 : afficher `FeedbackCoach.jsx` en dessous avec l'analyse
- [X] **`ActionControls.jsx`**
  - [ ] Bouton "Continuer" visible uniquement après lecture du feedback
  - [ ] Déclenche le prochain message et relance la boucle

---

### Jour 5 — Page Ressources

- [x] Créer `services/resource.service.js` → `getCategories()` et `getByCategory(categoryId)`
- [x] Page `Resources.jsx` : filtres par catégorie, barre de recherche, grille de cartes
- [x] Les filtres appellent l'API au lieu du fichier statique
- [x] Recherche côté client sur les résultats reçus (filtre sur titre/description en local)
- [x] Commit de fin de semaine

**Questions à te poser**
- Quelle différence entre filtrer côté client et filtrer côté serveur ? Quand préférer l'un ou l'autre ?
- Comment éviter de refaire un appel API à chaque frappe dans la barre de recherche ?

---

## 🗓️ SEMAINE 2 — Auth, contributions, modération

**Objectif de fin de semaine :** un utilisateur peut créer un compte, se connecter, proposer un scénario, signaler du contenu. Un modérateur peut valider depuis une interface dédiée.



### Jour 6 — Register + Login + Jotai

 - [x] services/auth.service.js → register + login
 - [x] RegisterForm.jsx avec pattern action React 19
 - [x] LoginForm.jsx avec pattern action + try/catch + Jotai
 - [x] atoms/auth.atom.js → tokenAtom + isConnectAtom
 - [x] Double stockage localStorage + atom
 - [x] Pages Register.jsx et Login.jsx
 - [x] Routes branchées dans routes.jsx
 - [x] Redirection avec useNavigate

**Questions à te poser**
- Pourquoi double stockage `localStorage` + atom ? Que se passe-t-il au refresh si on ne fait que l'atom ?
*L'atom vit en mémoire, donc au refresh il disparaît. Le localStorage survit au rechargement*
- Pourquoi `isConnectedAtom` plutôt que de tester directement `tokenAtom !== null` ?
*Centraliser la logique dans un atom dérivé permet de ne modifier qu'un seul endroit si un jour la condition de connecté changé. Les composants qui ont besoin de savoir "est-ce que l'utilisateur est connecté ?" utilisent isConnectAtom sans se soucier du comment*
- Que contient le token JWT côté front ? A-t-on accès au `role` de l'utilisateur ?
*Le JWT est composé de 3 parties*
*header.payload.signature, dans payload le back mets des infos : id, rôle, ...*


---

### Jour 7 — Header dynamique + Déconnexion + Routes protégées

- [x] Header conditionnel : "Connexion" si non connecté, nom + "Déconnexion" si connecté
- [x] Composant `BtnLogout.jsx` : vide l'atom + supprime `localStorage`
- [x] Créer `components/layout/ProtectedPage.jsx` : redirige vers `/login` si non connecté
- [ ] Protéger les routes qui nécessitent un compte dans `routes.jsx`
- [x] Initialiser l'atom depuis `localStorage` au démarrage de l'app (persist de session)

**Questions à te poser**
- Quelle différence entre `<Navigate />` et `useNavigate()` ? Quand utiliser l'un ou l'autre ?
- Que se passe-t-il si le token dans `localStorage` est expiré ? Comment le détecter ?

---

### Jour 8 — Formulaire de création de scénario

- [ ] Créer un composant,  ProtectedRole, qui vérifie aussi le rôle dans le token JWT. 
- [ ] Page `CreateScenario.jsx` protégée par `ProtectedPage`
- [ ] Formulaire complet : titre, contexte, personnage, dialogue, avatarSeed, 3 choix
- [ ] Créer aperçu de l'avatar 
- [ ] Token injecté dans le header `Authorization` via le service (`getDefaultStore()` de Jotai)
- [ ] Validation côté front (champs requis, exactement 3 choix)
- [ ] Redirection vers le scénario créé après soumission réussie

**Questions à te poser**
- Pourquoi utilise-t-on `getDefaultStore()` pour accéder à l'atom hors d'un composant React ?
- Le serveur force `status: 'pending'` côté API — pourquoi ne pas faire confiance au front pour ça ?

---

### Jour 9 — Proposition de thème + Signalement

- [ ] Bouton "Proposer un nouveau thème" dans le formulaire → section dépliante ou modal
- [ ] Au clic : `POST /difficulties/:id/themes` → récupère le `_id` → l'injecte dans le formulaire
- [ ] Composant `ReportButton.jsx` sur `ScenarioDetail.jsx` (visible uniquement si connecté)
- [ ] Au clic : `POST /scenarios/:id/report` avec le token
- [ ] Message de confirmation + bouton désactivé après signalement

**Questions à te poser**
- Comment passer l'`_id` du thème nouvellement créé vers le champ `themeId` du formulaire parent ?
- Pourquoi désactiver le bouton de signalement après le premier clic ?

---

### Jour 10 — Interface de modération

- [ ] Créer `atoms/user.atom.js` : `roleAtom` (extrait du token JWT au login)
- [ ] Route `/admin` protégée par rôle (`moderator` ou `admin`) → redirige vers `/` si rôle insuffisant
- [ ] Page `Admin.jsx` avec 3 onglets : **Scénarios en attente** / **Thèmes en attente** / **Signalements**
- [ ] Chaque onglet appelle les routes admin correspondantes
- [ ] Boutons Approuver / Rejeter → appelle le `PATCH` correspondant → retire l'item de la liste
- [ ] Commit final, push 🎉

**Questions à te poser**
- Comment extraire le `role` du token JWT côté front sans appel API supplémentaire ?
- Pourquoi ne suffit-il pas de cacher le bouton `/admin` dans le Header pour sécuriser cette page ?


- [] Créer la route GET /api/resources côté Back-end !
---
---

## 📚 Stack récapitulatif

| Outil | Usage |
|---|---|
| **Vite + React** | Bundler + framework UI |
| **React Router (data mode)** | Navigation SPA, routes dynamiques, routes protégées |
| **Tailwind** | Styling, thème personnalisé |
| **Jotai** | State global (token, rôle, connexion) |
| **Axios** | Appels API dans les services |
| **DiceBear API** | Génération d'avatars à partir du `characterAvatarSeed` |

---

## 🗂️ Architecture cible

```
src/
├── assets/
├── atoms/
│   ├── auth.atom.js        # tokenAtom, isConnectedAtom
│   └── user.atom.js        # roleAtom
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedPage.jsx
│   │   └── BtnLogout.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── ScenarioCard.jsx
│       ├── ResourceCard.jsx
│       ├── ReportButton.jsx
│       └── Loader.jsx
├── pages/
│   ├── Home.jsx
│   ├── Scenarios.jsx
│   ├── ScenarioDetail.jsx
│   ├── CreateScenario.jsx
│   ├── Resources.jsx
│   ├── Admin.jsx
│   ├── NotFound.jsx
│   └── auth/
│       ├── Login.jsx
│       └── Register.jsx
├── services/
│   ├── auth.service.js
│   ├── difficulty.service.js
│   ├── theme.service.js
│   ├── scenario.service.js
│   └── resource.service.js
├── routes.jsx
├── main.jsx
└── index.css
```

---

## ⚠️ Pièges classiques React à anticiper

1. **Oublier les dépendances de `useEffect`** → boucle infinie ou données jamais rechargées
2. **Mettre l'URL de l'API en dur dans le code** → toujours via `import.meta.env.VITE_API_URL`
3. **Faire les appels API directement dans les composants** → toujours dans les services
4. **Ne pas gérer les 3 états** (`loading` / `error` / `data`) → UX cassée
5. **Oublier de vider le `localStorage` à la déconnexion** → token zombie
6. **Croire que cacher un bouton suffit à protéger une route** → la vraie protection est côté API

---

## 🎯 Ce qui sera à faire APRÈS ces 2 semaines

- [ ] Déploiement du backend (Render)
- [ ] Déploiement du frontend (Vercel)
- [ ] Pagination sur les listes de scénarios
- [ ] Page profil utilisateur (mes scénarios, mes signalements)
- [ ] Tests (Jest + React Testing Library)
