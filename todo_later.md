## À traiter plus tard
- [ ] Loading animation 




###  Bashboard 
- [] Page profil avec l'avatar DiceBear en grand; option de le changer

Back-end :
Ajouter characterAvatarSeed au modèle Mongoose
Créer le controller + service
Créer la route PATCH /api/users/me
Mettre à jour le payload JWT pour inclure le seed

Front-end :
Créer la fonction dans le service front qui appelle PATCH /api/users/me
Page/section profil avec AvatarSelector
À la réponse du back : mettre à jour le token dans l'atom ET le localStorage


- [] (User)  Mes scénarios proposés -> Routes GET /api/scenarios/users/:id/scenarios. L'utilisateur peut voir ses propres contributions avec leur statut (pending, approved, rejected)  --> Demande de créer une nouvelle route 
- [ ] (User) Statistiques  légères : combien de scénarios joués, quel niveau préféré. 

## Modif BACK
[ ] Dans services/scenario.service.js (méthode find) : Ajouter .populate('authorId', 'email firstName lastName') pour transformer l'ID de l'auteur en un objet contenant son e-mail.

[ ] Dans services/scenario.service.js (méthode find) : Ajouter .populate('difficultyId', 'level') pour récupérer le libellé de la difficulté (ex: Facile, Moyen, Difficile).

[ ] Dans services/scenario.service.js (méthode findById) : Ajouter exactement les 3 mêmes .populate() pour que la vue détaillée d'un scénario fonctionne aussi avec les beaux objets.

[ ] Dans components/PendingItemCard.jsx (Frontend) : Une fois le backend mis à jour, remodifier l'affichage pour remplacer scenario.authorId, scenario.themeId et scenario.difficultyId par leurs propriétés respectives (.email, .name, .level).
