//services/difficuly.service.js 


import axios from 'axios'

const api = axios.create({
     baseURL: 'http://localhost:3000/api'
});

/**
 * Récupère les niveaux de difficultés 
 * Route : GET /api/difficulties/
 */

async function getAll(){
    const response = await api.get('/difficulties/')
    return response.data
}

export const difficultyService = {getAll

}