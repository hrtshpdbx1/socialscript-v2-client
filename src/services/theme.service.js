//services/theme.service.js


import api from './api';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

/**
 * Récupère les thèmes par difficulté (filtre)
 * Route :  	/api/difficulties/:difficultyId/themes
 */

async function getByDifficulty(difficultyId) {
    const response = await api.get(`/difficulties/${difficultyId}/themes/`);
    return response.data;
}
export const themeService = {
    getByDifficulty
}