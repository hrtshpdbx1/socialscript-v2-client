//services/user.service.js

import api from "./api";

// ** GET ME** 
/**
 * Le user récupere des info de connexion (sauf le mdp)
 * Route : GET /api/users/me
 */


async function getMe() {
    const response = await api.get(
        '/users/me')
        return response.data.user;
}



// Export 
export const userService = {
    getMe
}
