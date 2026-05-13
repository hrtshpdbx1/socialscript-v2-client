// src/services/api.js

import axios from 'axios';

// Configuration de l'instance Axios globale
const api = axios.create({
    // En local = localhost:3000; sur Vercel = URL Render 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export default api;