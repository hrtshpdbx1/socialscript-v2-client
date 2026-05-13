//services/scenario.service.js 

// Imports 
import api from './api';
import { getDefaultStore } from 'jotai';
import { tokenAtom } from '../atoms/auth.atom';


// Fonctions de service

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
async function getById(id) {
    const response = await api.get(`/scenarios/${id}`)
    // axios.get() retourne une promesse avec la réponse dans response.data

    return response.data.scenario
};

/**
 * Création d'un scénario / route protégée 
 * Route : POST api/scenarios
 */
async function create(scenarioData) {
   // getDefaultStore() → accède au store Jotai hors d'un composant React
    // .get(tokenAtom) → lit la valeur actuelle du token (équivalent de useAtomValue hors React)
    const token = getDefaultStore().get(tokenAtom);

    // api.post prend 3 arguments :
    //   1. l'URL (la baseURL '/api' est déjà dans l'instance)
    //   2. le body → les données du scénario à envoyer au backend
    //   3. la config → ici le header Authorization avec le token JWT
    // Note : api.get ne prend que 2 args (url, config) car un GET n'a pas de body

     const response = await api.post(
        '/scenarios',
        scenarioData,
        {
            headers: {
                 // Convention Bearer Token : le backend vérifie ce header
                // pour identifier l'utilisateur et vérifier qu'il est connecté
                Authorization: `Bearer ${token}`
            }
        }
    );
     // Le backend renvoie le scénario créé (avec son _id, status: 'pending', etc.)
    return response.data;
}

// Export 
export const scenarioService = {
    getByTheme, getById, create

}
