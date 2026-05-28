// src/services/report.service.js
//centralise les appels HTTP liés aux signalements.

import api from './api';

const reportService = {
   // ** CREATE REPORT **  
    /**
     * Crée un nouveau signalement pour un scénario spécifique.
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