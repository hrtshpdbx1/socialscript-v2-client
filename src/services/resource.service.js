// src/services/resource.service.js
import api from './api';

export const resourceService = {
    // Récupérer toutes les catégories
    getCategories: async () => {
        const response = await api.get('/resource-categories');
        return response.data;
    },

    // Récupérer les ressources d'une catégorie spécifique
    getByCategory: async (categoryId) => {
        const response = await api.get(`/resource-categories/${categoryId}/resources`);
        return response.data;
    }, 
    getAll: async () => {
        const response = await api.get('/resources');
        return response.data;
    }
};