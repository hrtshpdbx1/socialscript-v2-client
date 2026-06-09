//services/user.service.js

import api from "./api";

// ** GET ME** 
/**
 * Le user récupere des info de connexion (sauf le mdp)
 * Route : GET /api/users/me
 */


async function getMe() {
    const response = await api.get(
        '/users/me')
        return response.data.user;
}

// ** GET ALL USERS (admin) **
// Route : GET /api/admin/users
async function getAllUsers() {
    const response = await api.get('/admin/users');
    return response.data; // { users: [...] }
}

// ** UPDATE ROLE (admin) **
// Route : PATCH /api/admin/users/:userId/role
async function updateUserRole(userId, role) {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
}

// ** UPDATE SELF (user)
async function updateSelf(data) {
    const response = await api.patch('/users/me', data);
    return response.data.user; // le back renvoie { user: {...} }
}

// Export
export const userService = {
    getMe,
    getAllUsers,
    updateUserRole, 
    updateSelf
};

