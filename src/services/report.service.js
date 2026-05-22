// src/services/report.service.js
//centralise les appels HTTP liés aux signalements.

import api from './api';

const reportService = {
    
    /**
     * Crée un nouveau signalement pour un scénario spécifique.
     * @param {string} scenarioId - L'ID du scénario que l'utilisateur veut signaler.
     * @param {Object} reportData - L'objet contenant les infos du signalement.
     * @param {string} reportData.reportType - Le type 
     * @param {string} reportData.reason - L'explication détaillée 
     * @returns {Promise<Object>} - La réponse de l'API (message de succès et les données du report).
     */
    create: async (scenarioId, reportData) => {
        
        // l'instance 'api' contient déjà l'URL de base (http://localhost:3000/api)
        // et ajoute automatiquement le Token de l'utilisateur grâce aux middlewares

        const response = await api.post(
            `/scenarios/${scenarioId}/reports`, // L'URL dynamique avec l'ID du scénario
            reportData // Le corps de la requête (req.body) qui contient 'reportType' et 'reason'
        );
        
        return response.data;
    }
};

export default reportService;