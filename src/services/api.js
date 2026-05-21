// src/services/api.js

import axios from 'axios';

// Configuration de l'instance Axios globale
const api = axios.create({
    // En local = localhost:3000; sur Vercel = URL Render 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

// ? Intercepteur de requête
// Cette fonction s'exécute automatiquement AVANT chaque requête sortante.
// Elle va chercher le token dans le localStorage et l'attache au header Authorization.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // On retourne la config (modifiée ou non) pour que la requête continue
        return config;
    },
    (error) => {
        // En cas d'erreur de configuration (rare), on rejette la promesse
        return Promise.reject(error);
    }
);

export default api;