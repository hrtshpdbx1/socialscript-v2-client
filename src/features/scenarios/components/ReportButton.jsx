//src/features/scenarios/components/ReportButton.jsx

// visible par tout les utilisateur·ices

//  Au clic : `POST /scenarios/:id/report` avec le token
//  Message de confirmation + bouton désactivé après signalement

// doit connaitre l'id du scnenario et l'envoyer à la BD
import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { Flag } from 'lucide-react';
import { ReportModal } from '../../../components/ui/ReportModal';

export const ReportButton = ({ scenarioId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasSent, setHasSent] = useState(false);

 return (
        <div className="flex flex-col gap-2">
            <Button
                type="button"
               variant="ghost"   
                className="flex-1"
                disabled={hasSent}
                 onClick={() => setIsModalOpen(true)}
            >
                  <Flag className="w-4 h-4" />
                 {hasSent ? 'Signalé' : 'Signaler'}
            </Button >

            {/* La modale rendue conditionnellement */}
            {isModalOpen && (
                <ReportModal
                    scenarioId={scenarioId}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => {
                        setIsModalOpen(false);
                        setHasSent(true);
                    }}
                />
            )}
        </div>
    )
}
