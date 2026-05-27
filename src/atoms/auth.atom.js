 import { atom } from 'jotai';

 // ? Jotai
// Biblitoheque qui prmet de partgar un state global entre plusieurs composants sans passer des props

// On déclare deux atoms (tokenAtom et isConnectAtom )dans le même fichier. Ils ont des rôles distincts et coexistent 

//? Atom principal : stocke la valeur brute du token.
// Au démarrage, on tente de récupérer un token déjà existant
// dans le localStorage (= session précédente non terminée) :
export const tokenAtom = atom(localStorage.getItem('token'));
//                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                            null si pas de token (non connecté)
//                            string si token trouvé (connecté)


// tokenAtom stocke la valeur brute du token JWT(ou null s'il n'existe pas)


//? isConnectAtom — Atom dérivé (read-only)
// Lit tokenAtom via get() et calcule un booléen (connecté ou non)
// Se recalcule automatiquement chaque fois que tokenAtom change
// On ne peut pas faire setIsConnect() → on passe toujours par setToken()
export const isConnectAtom = atom((get) => {
    const token = get(tokenAtom);
    return token !== null;
});