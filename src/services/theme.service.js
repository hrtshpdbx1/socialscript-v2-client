//services/theme.service.js
import api from './api';


// ** GET BY DIFFICULTY ** 
/**
 * Récupère les thèmes par difficulté (filtre)
 * Route :  	/api/difficulties/:difficultyId/themes
 */

async function getByDifficulty(difficultyId) {
    const response = await api.get(`/difficulties/${difficultyId}/themes/`);
    return response.data;
}


// ** CREATE THEME ** 
/**
 * Crée un nouveau thème (statut "pending" par défaut côté backend)
 * Route : POST /api/difficulties/:difficultyId/themes
 */

// 1. Appel au serveur avec l'URL et les données
// 2. Attente de la réponse(le await)
// 3. Retour des données du serveur au composant

async function create(difficultyId, themeData){
    const response = await api.post(`/difficulties/${difficultyId}/themes/`, themeData)
    return response.data
}

export const themeService = {
    getByDifficulty,
    create
}