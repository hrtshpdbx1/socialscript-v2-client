//services/scenario.service.js 

// Imports 
import api from './api';


//* --- Fonctions de service ---- *

// ** GET BY THEME ** 
/**
 * Récupère les scénarios selon la difficulté et le thème
 * Route : GET /api/difficulties/:difficultyId/themes/:themeId/scenarios
 */
async function getByTheme(difficultyId, themeId) {
    // On utilise les backticks pour injecter les variables dans l'URL
    const response = await api.get(`/difficulties/${difficultyId}/themes/${themeId}/scenarios`)
    // On retourne directement les données utiles
    return response.data
};

// ** GET BY ID ** 
/**
 * Récupère un scénario spécifique par son ID
 * Route : GET /api/scenarios/:id
 */
async function getById(id) {
    const response = await api.get(`/scenarios/${id}`)
    // axios.get() retourne une promesse avec la réponse dans response.data

    return response.data.scenario
};

// ** GET BY AUTHOR ** 
/**
 * Récupère les scénarios crée par un user
 * Route : GET /api/scenarios/users/:id/scenarios
 */
async function getByAuthor(userId) {
    const response = await api.get(`/scenarios/users/${userId}/scenarios`)
    return response.data
};

// ** CREATE ** 
/**
 * Création d'un scénario / route protégée 
 * Route : POST api/scenarios
 */
async function create(scenarioData) {
    // api.post prend 3 arguments :
    //   1. l'URL (la baseURL '/api' est déjà dans l'instance)
    //   2. le body → les données du scénario à envoyer au backend
    // Note : api.get ne prend que 2 args (url, config) car un GET n'a pas de body
    const response = await api.post(
        '/scenarios',
        scenarioData,
    );
    // Le backend renvoie le scénario créé (avec son _id, status: 'pending', etc.)
    return response.data;
};


// ** GET PENDING SCENARIO ** 
/**
 * Récupérer les scnenarios en attente de validation / route protégée 
 * Route : GET /api/admin/scenarios
 */
async function getPending() {

    const response = await api.get(
        '/admin/scenarios')
    return response.data;
};

// ** APPROVE SCENARIO ** 
/**
 * Validation des scenarios soumis / route protégée 
 * Route : PATCH /api/admin/scenarios/:scenarioId/status
 */
async function update(scenarioId, newScenarioStatus) {
    const response = await api.patch(
        `/admin/scenarios/${scenarioId}/status`,
        newScenarioStatus,   
    );
    return response.data;
};

// ** EDIT SCENARIO **
/**
 * Edition du conetnu d'un scenariot (Admin only)
 * Route : PATCH /api/admin/scenarios/:scenarioId/edit
 */
async function edit(scenarioId, updatedContent) {
    const response = await api.patch(`/admin/scenarios/${scenarioId}`, updatedContent)
    return response.data
}

// ** SOFT DELETE SCENARIO ** 
/**
 * Soft detele scenario
 * Route : DELETE /api/admin/scenarios/:scenarioId
 */
async function softDelete(scenarioId) {
    const response = await api.delete(
        //api.delete(url, config)
        `/admin/scenarios/${scenarioId}`
    )
    return response.data;
}


// Export 
export const scenarioService = {
    getByTheme, getById, getPending, getByAuthor, create, update, softDelete, edit

}
