# Programme SocialScript V2 — Frontend React (2 semaines)

**Stack :** Vite + React + Tailwind + React Router (data mode) + Jotai + Axios

**Objectif de fin :** une SPA React connectée à ton API, qui reprend toutes les fonctionnalités de la V1 et les étend avec l'auth, les contributions utilisateurs et la modération.

---

## 🗓️ SEMAINE 1 — Fondations, routing, lecture publique

**Objectif de fin de semaine :** naviguer dans l'app, voir les difficultés → thèmes → scénarios depuis l'API réelle, sans auth.

---

### Jour 1 — Setup du projet

**À faire**
- [x] `npm create vite@latest` → React + JavaScript
- [x] Installer : `npm i tailwindcss @tailwindcss/vite react-router-dom axios jotai`
- [x] Configurer Tailwind dans `vite.config.js` et `index.css`
- [x] Créer le thème Tailwind dans `theme.css` en reprenant les couleurs de la V1 (`--primary`, `--secondary`, etc.)
- [x] Mettre en place le `.env` avec `VITE_API_URL=http://localhost:3000/api`
*variable = import.meta.env.VITE_API_URL*
- [x] Créer l'arborescence :
```
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── ui/
├── pages/
│   ├── Home.jsx
│   ├── Scenarios.jsx
│   ├── Resources.jsx
│   ├── NotFound.jsx
│   └── auth/
│       ├── Login.jsx
│       └── Register.jsx
├── services/
├── atoms/
├── routes.jsx
└── main.jsx
```
- [x] Route test `GET /` → page `Home.jsx` qui répond
- [x] Commit

**Questions à te poser**
- Pourquoi `VITE_API_URL` et pas juste `API_URL` ? Qu'est-ce que Vite fait avec ce préfixe ?
- Quelle différence entre `import.meta.env.VITE_API_URL` et `process.env.API_URL` ?

**Validation :** serveur Vite qui tourne, page Home qui s'affiche, premier commit fait.

---

### Jour 2 — Routing + Layout

**À faire**
- [x] Configurer `routes.jsx` avec React Router data mode (`createBrowserRouter`)
- [x] Créer le layout avec `<Outlet />` : Header + Footer persistants sur toutes les pages
- [x] Reprendre la navbar de la V1 : logo, liens de navigation, bouton CTA 
- [x] Menu hamburger mobile
- [x] Implémenter `<NavLink>` avec classes actives Tailwind
- [x] Page `NotFound.jsx`
- [x] Tester la navigation entre pages
- [x] Créer composant <Card/> standardisé 
- [x] FaqSection avec <details> et <summary>
- [x] Créer les différentes sections : 
    <HeroSection />     {/* Le gros titre et le call-to-action */}
    <FeaturesSection /> {/* L'espace d'entrainement */}
    <ExploreSection />  {/* Les 3 cartes de navigation */}
    <FaqSection />      {/* Les questions fréquentes */}
    <Testimonial/About/>

**Questions à te poser**
- Quelle différence entre `<Link>` et `<NavLink>` ?
- Pourquoi utilise-t-on un layout avec `<Outlet />` plutôt que de répéter Header/Footer dans chaque page ?
- Comment React Router sait quelle page afficher à l'intérieur du layout ?

**Validation :** navigation entre toutes les pages sans rechargement, 404 fonctionnel.

---

### Jour 3 — Services + Page Difficultés/Thèmes

Hook d'état, cours d'Aude : 
https://interface3be.sharepoint.com/sites/WEB14-Teams/_layouts/15/stream.aspx?id=%2Fsites%2FWEB14%2DTeams%2FDocuments%20partages%2FReact%20JS%2FRecordings%2FR%C3%A9union%20dans%20%C2%AB%C2%A0React%20JS%C2%A0%C2%BB%2D20260127%5F092440%2DEnregistrement%20de%20la%20r%C3%A9union%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ef9fb8a37%2Db5bf%2D4cd0%2Da397%2D223aab87cc30

**Théorie of the day** :
1. useState — Tu connais déjà les variables en JS. En React, on ne peut pas juste faire let data = [] et s'attendre à ce que la page se mette à jour quand data change. useState crée une variable "réactive" : quand elle change, React re-affiche le composant automatiquement.
jsconst [difficulties, setDifficulties] = useState([]);
// difficulties = la valeur actuelle (commence à [])
// setDifficulties = la fonction pour la modifier

2. useEffect — C'est le moyen de dire à React : "quand mon composant apparaît à l'écran, fais cette action" (par exemple, appeler ton API). Le deuxième argument (le tableau []) contrôle quand l'effet se relance.
jsuseEffect(() => {
  // ce code s'exécute quand le composant s'affiche
}, []); // [] = une seule fois, au montage
3. Le fichier service — C'est exactement la même logique que dans ton backend ! Ton backend a une couche services/ qui contient la logique métier séparée des controllers. Côté frontend, c'est pareil : on sépare les appels API des composants React. Même réflexe d'architecture en couches.


**À faire**
- [x] Créer `services/difficulty.service.js` → `getAll()`
- [x] Créer `services/theme.service.js` → `getByDifficulty(difficultyId)`
- [x] Page `Scenarios.jsx` : affiche les boutons de difficulté (comme la V1)
- [x] Au clic sur une difficulté → affiche les thèmes associés
- [x] Gérer les 3 états : `loading` / `error` / `data`


**Questions à te poser**
- Pourquoi on met les appels API dans des fichiers `service` séparés plutôt que directement dans le composant ?
- Que se passe-t-il si on oublie le tableau de dépendances `[]` dans `useEffect` ?
- Pourquoi faut-il gérer l'état `loading` ? Que voit l'utilisateur sans lui ?

**Piège classique :** appeler `useEffect` avec une dépendance qui change à chaque render → boucle infinie.

**Validation :** les difficultés s'affichent depuis l'API, les thèmes apparaissent au clic.

---

### Jour 4 — Liste et détail de scénario

**À faire**
- [x] Créer `services/scenario.service.js` → `getByTheme(themeId)` et `getById(id)`
- [x] Au clic sur un thème → affiche la liste légère des scénarios (titre + contexte)
- [ ] Route dynamique `/scenarios/:id` → page `ScenarioDetail.jsx`
- [ ] Récupérer l'`id` avec `useParams`
- [ ] Afficher le scénario complet : contexte, avatar DiceBear, dialogue, 3 choix
- [ ] Reprendre la logique de la V1 : clic sur un choix → affiche le feedback (`reactionText`, `analysis`, `keyTakeaway`)

**Questions à te poser**
- Comment `useParams` récupère-t-il l'id dans l'URL ?
- Pourquoi crée-t-on deux services séparés (`getByTheme` et `getById`) plutôt qu'un seul appel ?
- L'URL de l'avatar DiceBear dépend de quel champ du modèle Mongoose ?

**Validation :** parcours complet fonctionnel — difficulté → thème → liste → détail → feedback.

---
### Jour 4 et demi — Refont UI, Liste de Composants 

🏗️ 1. Le Layout spécifique

    [ ] ScenarioLayout.jsx : Le conteneur principal. Il remplace le Header et le Footer habituels par un écran vide, prenant 100% de la hauteur (h-screen), optimisé pour le mode "Focus".

🧩 2. Les éléments de Navigation (Haut de l'écran)

    [ ] ScenarioTopBar.jsx : La barre en haut de l'écran. Elle contiendra le bouton "Croix" (pour quitter) et le titre du scénario.

    [ ] SegmentedProgressBar.jsx : La fameuse barre de progression segmentée. Elle prendra des props comme totalSteps={5} et currentStep={2} pour colorer les bons segments.

💬 3. Les éléments du Chat (Le cœur de l'interaction)

    [ ] ChatContainer.jsx : La zone qui englobe la discussion et qui gère le scroll automatique vers le bas à chaque nouveau message.

    [ ] ChatBubble.jsx : Une bulle de dialogue réutilisable. Elle doit accepter une prop isUser (pour s'aligner à droite en bleu ou à gauche en gris).

    [ ] FeedbackCoach.jsx (Si tu choisis l'option In-line) : Un composant visuellement distinct (couleur d'accentuation, petite icône d'ampoule) qui s'insère dans le chat pour donner l'analyse pédagogique.

👆 4. Les éléments d'Interaction (Bas de l'écran)

    [ ] ChoiceList.jsx : Le conteneur qui affiche les 3 options de réponse.

    [ ] ChoiceButton.jsx : Un bouton de choix spécifique (plus gros qu'un bouton standard, texte aligné à gauche pour la lisibilité sur plusieurs lignes).

    [ ] ActionControls.jsx : La zone tout en bas pour les boutons "Précédent", "Continuer" ou "Rejouer".

🗂️ 5. Les Écrans (Les "Pages" du scénario)

    [ ] ScenarioSelection.jsx : L'écran de tes premiers wireframes (Sélection de difficulté et de thème avec les petites cartes).

    [ ] ScenarioPlay.jsx : L'écran principal où se déroule le chat.

    [ ] ScenarioOutro.jsx : L'écran de fin qui résume l'apprentissage et propose de rejouer ou de retourner à l'accueil.

    Excellent choix ! Le feedback "In-line" va rendre l'expérience super fluide et naturelle, surtout sur mobile.


💡 6.  Implémenter le Feedback "In-line" (Coach Virtuel)

    [ ] Créer le composant FeedbackCoach.jsx

        [ ] UI / Design : Lui donner un style visuel distinct des bulles de chat classiques pour marquer la pause pédagogique (ex: fond très clair, bordure jaune border-accent, icône 💡 ou avatar du coach).

        [ ] Animation : Ajouter une petite animation d'apparition douce (animate-fade-in-up) pour guider l'œil de l'utilisateur vers le bas.

    [ ] Mettre à jour la logique d'interaction dans le flux du chat (ScenarioPlay.jsx)

        [ ] Étape 1 : Au clic sur une option de réponse, masquer la zone de choix.

        [ ] Étape 2 : Afficher instantanément le choix cliqué sous forme de bulle utilisateur classique (alignée à droite, fond bleu/violet).

        [ ] Étape 3 : Faire apparaître le composant FeedbackCoach.jsx juste en dessous avec l'analyse de la réponse.

    [ ] Mettre à jour le composant ActionControls.jsx

        [ ] Afficher un bouton principal "Continuer" ou "Réplique suivante" tout en bas de l'écran uniquement une fois que le feedback a été lu.

        [ ] Faire en sorte que ce bouton déclenche le prochain message de l'IA et relance la boucle.


### Jour 5 — Page Ressources

**À faire**
- [ ] Créer `services/resource.service.js` → `getCategories()` et `getByCategory(categoryId)`
- [ ] Page `Resources.jsx` : reprendre la V1 — filtres par catégorie, barre de recherche, grille de cartes
- [ ] Les filtres appellent l'API au lieu du fichier statique
- [ ] Recherche côté client sur les résultats reçus (filtre sur le titre/description en local)
- [ ] Commit de fin de semaine

**Questions à te poser**
- Quelle différence entre filtrer côté client et filtrer côté serveur ? Quand préférer l'un ou l'autre ?
- Comment éviter de refaire un appel API à chaque frappe dans la barre de recherche ?

**Validation :** les ressources s'affichent par catégorie, la recherche filtre les résultats.

---

## 🗓️ SEMAINE 2 — Auth, contributions, modération

**Objectif de fin de semaine :** un utilisateur peut créer un compte, se connecter, proposer un scénario, signaler du contenu. Un modérateur peut valider depuis une interface dédiée.

---

### Jour 6 — Register + Login + Jotai

**À faire**
- [ ] Créer `services/auth.service.js` → `register(data)` et `login(credentials)`
- [ ] Pages `Register.jsx` et `Login.jsx` avec formulaires React (pattern `action`)
- [ ] Installer et configurer Jotai
- [ ] Créer `atoms/auth.atom.js` : `tokenAtom` et `isConnectedAtom`
- [ ] Au login réussi : stocker le token dans `localStorage` + dans l'atom (double stockage)
- [ ] Redirection programmatique avec `useNavigate` après login/register réussi

**Questions à te poser**
- Pourquoi double stockage `localStorage` + atom ? Que se passe-t-il au refresh de page si on ne fait que l'atom ?
- Pourquoi `isConnectedAtom` plutôt que de tester directement `tokenAtom !== null` dans les composants ?
- Que contient le token JWT côté front ? A-t-on accès au `role` de l'utilisateur ?

**Validation :** register crée un compte, login stocke le token, redirect vers la home après connexion.

---

### Jour 7 — Header dynamique + Déconnexion + Routes protégées

**À faire**
- [ ] Header conditionnel : affiche "Connexion" si non connecté, nom + "Déconnexion" si connecté
- [ ] Composant `BtnLogout.jsx` : vide l'atom + supprime `localStorage`
- [ ] Créer `components/layout/ProtectedPage.jsx` : redirige vers `/login` si non connecté
- [ ] Protéger les routes qui nécessitent un compte dans `routes.jsx`
- [ ] Initialiser l'atom depuis `localStorage` au démarrage de l'app (persist de session)

**Questions à te poser**
- Quelle différence entre `<Navigate />` et `useNavigate()` ? Quand utiliser l'un ou l'autre ?
- Que se passe-t-il si le token stocké dans `localStorage` est expiré ? Comment le détecter ?

**Validation :** une route protégée redirige vers `/login`, le header change selon l'état de connexion.

---

### Jour 8 — Formulaire de création de scénario

**À faire**
- [ ] Page `CreateScenario.jsx` protégée par `ProtectedPage`
- [ ] Formulaire complet : titre, contexte, personnage, dialogue, avatarSeed, 3 choix
- [ ] Le token est injecté dans le header `Authorization` via le service (`getDefaultStore()` de Jotai)
- [ ] Gestion de la validation côté front (champs requis, exactement 3 choix)
- [ ] Redirection vers le scénario créé après soumission réussie

**Questions à te poser**
- Pourquoi utilise-t-on `getDefaultStore()` pour accéder à l'atom hors d'un composant React ?
- Le serveur force `status: 'pending'` côté API — pourquoi ne pas faire confiance au front pour ça ?

**Validation :** un utilisateur connecté peut créer un scénario, il est redirigé vers la page de détail.

---

### Jour 9 — Proposition de thème + Signalement

**À faire**
- [ ] Dans le formulaire de création de scénario : bouton "Proposer un nouveau thème" → section dépliante ou modal
- [ ] Au clic : `POST /difficulties/:id/themes` → récupère le `_id` retourné → l'injecte automatiquement dans le formulaire
- [ ] Composant `ReportButton.jsx` sur la page `ScenarioDetail.jsx` (visible uniquement si connecté)
- [ ] Au clic : `POST /scenarios/:id/report` avec le token
- [ ] Afficher un message de confirmation, désactiver le bouton après signalement

**Questions à te poser**
- Comment passer l'`_id` du thème nouvellement créé vers le champ `themeId` du formulaire parent ?
- Pourquoi désactiver le bouton de signalement après le premier clic ?

**Validation :** un thème proposé apparaît en `pending` dans Atlas, un signalement est créé en DB.

---

### Jour 10 — Interface de modération

**À faire**
- [ ] Créer `atoms/user.atom.js` : `roleAtom` pour connaître le rôle de l'utilisateur connecté (extrait du token JWT au login)
- [ ] Route `/admin` protégée par rôle (`moderator` ou `admin`) → redirige vers `/` si rôle insuffisant
- [ ] Page `Admin.jsx` avec 3 onglets : **Scénarios en attente** / **Thèmes en attente** / **Signalements**
- [ ] Chaque onglet appelle les routes admin correspondantes
- [ ] Boutons Approuver / Rejeter sur chaque item → appelle `PATCH` correspondant → retire l'item de la liste
- [ ] Commit final, push, tu respires 🎉

**Questions à te poser**
- Comment extraire le `role` du token JWT côté front sans appel API supplémentaire ?
- Pourquoi ne suffit-il pas de cacher le bouton `/admin` dans le Header pour sécuriser cette page ? Qui fait la vraie protection ?

**Validation :** un modérateur peut approuver un scénario, il apparaît ensuite en lecture publique.

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

- Déploiement du backend (Render ou Railway)
- Déploiement du frontend (Vercel ou Netlify)
- Pagination sur les listes de scénarios
- Page profil utilisateur (mes scénarios, mes signalements)
- Tests (Jest + React Testing Library)
