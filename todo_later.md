## À traiter plus tard
- [ ] Synchronisation tokenAtom ↔ localStorage au login (atomWithStorage ?)
- [ ] Détection d'expiration du token côté front (champ exp du payload)
- [ ] Stratégie de déconnexion automatique sur token expiré
- [ ] Loading animation 


Modif BACK
[ ] Dans services/scenario.service.js (méthode find) : Ajouter .populate('authorId', 'email firstName lastName') pour transformer l'ID de l'auteur en un objet contenant son e-mail.

[ ] Dans services/scenario.service.js (méthode find) : Ajouter .populate('themeId', 'name') pour récupérer le nom du thème à la place de son ID Mongoose.

[ ] Dans services/scenario.service.js (méthode find) : Ajouter .populate('difficultyId', 'level') pour récupérer le libellé de la difficulté (ex: Facile, Moyen, Difficile).

[ ] Dans services/scenario.service.js (méthode findById) : Ajouter exactement les 3 mêmes .populate() pour que la vue détaillée d'un scénario fonctionne aussi avec les beaux objets.

[ ] Dans components/PendingItemCard.jsx (Frontend) : Une fois le backend mis à jour, remodifier l'affichage pour remplacer scenario.authorId, scenario.themeId et scenario.difficultyId par leurs propriétés respectives (.email, .name, .level).