// src/services/resource.service.js
import api from './api';

export const resourceService = {
    // ** GET ALL CATEGORIES ** 
    /**
     *  Récupérer toutes les catégories
     */
    //
    getCategories: async () => {
        const response = await api.get('/resource-categories');
        return response.data;
    },

    // ** GET BY CATEGORIES ** 
    /**
     *  Récupérer les ressources d'une catégorie spécifique
     */
    //
    getByCategory: async (categoryId) => {
        const response = await api.get(`/resource-categories/${categoryId}/resources`);
        return response.data;
    },

    // ** GET ALL RESSOURCES ** 
    getAll: async () => {
        const response = await api.get('/resources');
        return response.data;
    }
};