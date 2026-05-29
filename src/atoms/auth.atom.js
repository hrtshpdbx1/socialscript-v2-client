/**
 * Atoms d'authentification utilisateur.
 * - tokenAtom : stocke le JWT brut depuis le localStorage
 * - roleAtom : extrait le rôle depuis le payload du JWT (décodage côté front uniquement)
 * - isAuthAtom : booléen connecté / pas connecté
 * 
 * Note sécurité : le décodage côté front sert uniquement à conditionner l'UI.
 * La vraie vérification d'authentification se fait côté backend à chaque requête.
 */

import { atom } from "jotai";

// 1. Stocker la valeur brute du token.
export const tokenAtom = atom(localStorage.getItem('token'));


// * roleAtom 
// 1.Extraire le payload
// Rappel : Anatomie d'un JWT = header.payload.signature, base64url
export const roleAtom = atom((get) => {

    const token = get(tokenAtom);
    // si pas de token, valeur null par défaut.
    if (!token) return null

    const tokenParts = token.split(".");
    // token complet: "xxx.yyy.zzz"
    // Split = coupe la string token à chaque occurrence de "."
    // Expected output: le payload  aka la partie du milieu"
    const payload = (tokenParts[1]);

    // 2. Décoder avec atob 
    try {
        // Pipeline de décodage dui pourrait planter 
        const decodedPayload = atob(payload);
        const payloadParsed = JSON.parse(decodedPayload)
        // → '{"role":"admin"}'
        const userRole = payloadParsed.role
        return userRole

    } catch (error) {
        console.error('Token invalide :', error);
        return null;
    }
});

// * isAuthAtom 
// Atom dérivé qui renvoit true ou false selon qu'un token existe.
export const isAuthAtom = atom((get) => {
    const token = get(tokenAtom);
    // On utilise une coercion booléenne (truthy/falsy) plutôt que `!== null`
    // pour couvrir aussi les cas où le token serait "" ou undefined.
    return token ? true : false;

});

// * userAtom
// Stocke le profil utilisateur complet (firstName, etc.) récupéré via GET /users/me.
// Atom passif : valeur null au départ, rempli depuis l'extérieur après le fetch.
export const userAtom = atom(null);

