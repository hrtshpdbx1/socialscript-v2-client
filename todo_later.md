## À traiter plus tard
- [ ] Loading animation 
- [ ] Permettre aux admin de supprimer un utilisateur (Front)
- [ ] Permettre aux admin de modifier un scenario pending avant validation


###  Bashboard 

**Back-end** 


**Front-end** 



- [] (User)  Mes scénarios proposés -> Routes GET /api/scenarios/users/:id/scenarios. L'utilisateur peut voir ses propres contributions avec leur statut (pending, approved, rejected)  --> Demande de créer une nouvelle route 
- [ ] (User) Statistiques  légères : combien de scénarios joués, quel niveau préféré. 

## Modif BACK
- [] Dans services/scenario.service.js (méthode find) : Ajouter .populate('authorId', 'email firstName lastName') pour transformer l'ID de l'auteur en un objet contenant son e-mail.
- [] Dans services/scenario.service.js (méthode find) : Ajouter .populate('difficultyId', 'level') pour récupérer le libellé de la difficulté (ex: Facile, Moyen, Difficile).
- [] Dans services/scenario.service.js (méthode findById) : Ajouter exactement les 3 mêmes .populate() pour que la vue détaillée d'un scénario fonctionne aussi avec les beaux objets.

- [] Dans components/PendingItemCard.jsx (Frontend) : Une fois le backend mis à jour, remodifier l'affichage pour remplacer scenario.authorId, scenario.themeId et scenario.difficultyId par leurs propriétés respectives (.email, .name, .level).
