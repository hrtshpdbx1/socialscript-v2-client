// src/services/report.service.js
//centralise les appels HTTP liés aux signalements.

import api from './api';

// ** CREATE REPORT **  
/**
 * Crée un nouveau signalement pour un scénario spécifique.
 */

async function create(scenarioId, reportData) {
    // l'instance 'api' contient déjà l'URL de base (http://localhost:3000/api)
    // et ajoute automatiquement le Token de l'utilisateur grâce aux middlewares

    const response = await api.post(
        `/scenarios/${scenarioId}/reports`, // L'URL dynamique avec l'ID du scénario
        reportData // Le corps de la requête (req.body) qui contient 'reportType' et 'reason'
    );
    return response.data;
};

// ** GET REPORT **  
/**
 * Récupérer un signalement 
 * Route : `GET /api/admin/report`
 */

async function getReports() {
    const response = await api.get(
        '/api/admin/report'
    );
    return response.data
};

// ** UPDATE REPORT STATUS **  
/**
 * Mettre à jour le status d'un événement 
 * Route : PATCH /api/admin/report/:reportId`
 */
async function updateReportStatus(reportId, newReportStatus) {
    const response = await api.patch(
        `/admin/report/${reportId}`,
        newReportStatus
    )
    return response.data
}

// export
export const reportService = {
    create, getReports, updateReportStatus
}

