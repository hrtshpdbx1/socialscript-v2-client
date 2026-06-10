/**
 * * Atoms d'authentification 
 * 
 * * 1/ Les atoms primitifs 
 * --> contiennent une valeur que quelqu'un leur donne 
 * - timeAtom (un nombre)
 * - tokenAtom  (la string du JWT reçue par le localStorage)
 * - userAtome (l'objet profil)
 * 
 * * 2/ Les atoms dérivés
 * --> ne stockent rien, ils calculent leur valeur à partir d'autres atoms, via une fonction
 * - roleAtom (extrait le rôle depuis le payload du JWT - décodage côté front uniquement)
 * - tokenExpireAtom (booléen expiré / pas expiré)
 * - isAuthAtom (booléen connecté / pas connecté)
 * 
 * Note sécurité : le décodage côté front sert uniquement à conditionner l'UI. La vraie vérification d'authentification se fait côté backend à chaque requête.
 */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { jwtDecode } from "jwt-decode";

// Atom qui stock le timestamp avec refeshsé dans le store (utiliser pour vérifier si le token est mouru)
export const timeAtom = atom(Date.now());

//  Stocker la valeur brute du token.
export const tokenAtom = atomWithStorage('token_v2', null);
// branché sur le localStorage =  reste connecté après un refresh.


// * roleAtom 
// Extrait le role du payload
export const roleAtom = atom((get) => {

    const token = get(tokenAtom);
    // si pas de token, valeur null par défaut.
    if (!token) return null
    try {
        const dataJwt = jwtDecode(token);
        // JwtDecode découpe le token, décode le base64url, et parse le JSON. 
        const userRole = dataJwt["role"];
        return userRole

    } catch (error) {
        console.error('Token invalide :', error);
        return null;
    }
});

// * tokenExpireAtom
//  Extrait la date d'expiration du token du payload renvoit true ou false selonson statut
export const tokenExpireAtom = atom((get) => {

    const token = get(tokenAtom);
    const now = get(timeAtom);


    // Si pas de token: Expiré !
    if (!token) return true;

    const dataJwt = jwtDecode(token);

    // Si pas de champ exp → pas expiré (false) 
    const exp = dataJwt["exp"];
    if (!exp) return false;

    // Token expiré si timestamp plus petit que mtn (en ms)
    return exp * 1000 < now;

});

// * isAuthAtom 
// renvoit true ou false selon qu'un token existe
export const isAuthAtom = atom((get) => {
    const expire = get(tokenExpireAtom);
    return !expire;
});

// * userAtom
// Stocke le profil utilisateur complet (firstName, etc.) récupéré via GET /users/me.
// Atom passif : valeur null au départ, rempli depuis l'extérieur après le fetch.
export const userAtom = atom(null);
