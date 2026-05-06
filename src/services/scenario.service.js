//services/scenario.service.js 

// 1. Import d'axios
import axios from 'axios';

// 2. Configuration de l'instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});
// axios.get(url) retourne une promesse, et la réponse est dans response.data


// 3. Fonctions de service

/**
 * Récupère les scénarios selon la difficulté et le thème
 * Route : GET /api/difficulties/:difficultyId/themes/:themeId/scenarios
 */
async function getByTheme(difficultyId, themeId) {
    // On utilise les backticks pour injecter les variables dans l'URL
    const response = await api.get(`/difficulties/${difficultyId}/themes/${themeId}/scenarios/`)
    // On retourne directement les données utiles
    return response.data
};

/**
 * Récupère un scénario spécifique par son ID
 * Route : GET /api/scenarios/:id
 */
async function getByID(id) {
    const response = await api.get(`/scenarios/${id}`)
    // axios.get() retourne une promesse avec la réponse dans response.data

    return response.data
}

// 4. Export des fonctions
export const scenarioService = {
    getByTheme, getByID

}
