import { atom } from 'jotai';

//? tokenAtom — Atom classique (comme un useState global)
// Stocke la valeur brute du token JWT, accessible partout dans l'appli
// Au démarrage, récupère le token du localStorage (ou null s'il n'existe pas)
export const tokenAtom = atom(localStorage.getItem('token'));

//? isConnectAtom — Atom dérivé (read-only)
// Lit tokenAtom via get() et calcule un booléen (connecté ou non)
// Se recalcule automatiquement chaque fois que tokenAtom change
// On ne peut pas faire setIsConnect() → on passe toujours par setToken()
export const isConnectAtom = atom((get) => {
    const token = get(tokenAtom);
    return token !== null;
});