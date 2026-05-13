// services/auth.service.js


// auth.service.js : le fichier côté frontend qui centralise les appels HTTP liés à l'auth
// C'est le "pont" entre React et ton API
// 

// On a besoin de deux fonctions :
// POST /api/auth/register → pour créer un compte
// POST /api/auth/login → pour se connecter

import api from './api';

const authService = {
    // Inscription :
    register: async (userData) => {
        const response = await api.post(
            "/auth/register",
            userData
        );
        return response.data;
    },

    // Connexion :
    login: async ({ email, password }) => {
        const response = await api.post(
            "/auth/login",
            { email, password } //extraction des propriété par destructuration 
        );
        return response.data.token;
        // on retourne uniquement un token pour respecter le principe de l'API REST
        // pour être "Stateless", l'API ne doit pas mémoriser qui est connecté entre deux requête
        // Le client doit présenter un token JWT à chaque appel pour prouver son identité. 
        // C'est donc la seule donnée dont on a besoin pour maintenir la session.
}
}

export default authService;