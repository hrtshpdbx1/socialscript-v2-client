// src/services/resource.service.js
import api from './api';

// ** GET ALL RESSOURCES ** 
async function getAll() {
    const response = await api.get('/resources');
    return response.data;
};

// ** GET ALL CATEGORIES ** 
/**
 *  Récupérer toutes les catégories
 */
//
async function getCategories() {
    const response = await api.get('/resource-categories');
    return response.data;
};

// ** GET BY CATEGORIES ** 
/**
 *  Récupérer les ressources d'une catégorie spécifique
 */
//
async function getByCategory(categoryId) {
    const response = await api.get(`/resource-categories/${categoryId}/resources`);
    return response.data;
};

// ** UPTATE RESSOURCE ** 
/**
 *  Mettre à jour (ex: passer isPublished à true
 * Route : PATCH /api/resources/:id`
 * needs id, updateData
 */
async function publishResource(resourceId, newResourceStatus) {
    const response = await api.patch(
        `/resources/${resourceId}`,
        newResourceStatus
    )
    return response.data;
}


// export
export const resourceService = {
    getAll, getByCategory, getCategories, publishResource
}