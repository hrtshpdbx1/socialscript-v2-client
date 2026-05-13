//services/difficuly.service.js 
import api from './api';

/**
 * Récupère les niveaux de difficultés 
 * Route : GET /api/difficulties/
 */

async function getAll(){
    const response = await api.get('/difficulties/');
    return response.data;
}

export const difficultyService = {getAll

}