// src/services/resource.service.js
import api from './api';

// ** GET ALL RESSOURCES ** 
// Public : ressources publiées (route publique)
async function getAll() {
    const response = await api.get('/resources');
    return response.data;
}

// Admin : toutes les ressources, brouillons compris (route admin protégée)
async function getAllAdmin() {
    const response = await api.get('/admin/resources');
    return response.data;
}

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

// ** CREATE **
// Route : POST /api/resources
async function create(resourceData) {
    const response = await api.post('/resources', resourceData);
    return response.data;
}

// ** UPDATE COMPLET **
// Route : PUT ou PATCH /api/resources/:id
async function update(resourceId, updateData) {
    const response = await api.patch(`/resources/${resourceId}`, updateData);
    return response.data;
}

// ** DELETE (Reject/Remove) **
// Route : DELETE /api/resources/:id
async function remove(resourceId) {
    const response = await api.delete(`/resources/${resourceId}`);
    return response.data;
}

// export
export const resourceService = {
    getAll, 
    getAllAdmin,
    getCategories, 
    getByCategory, 
    publishResource,
    create,
    update,
    remove
};