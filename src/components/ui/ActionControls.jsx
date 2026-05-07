// src/components/ui/ActionControls.jsx

import Button from "./Button"; // Ton composant Button global
import { useNavigate } from "react-router-dom";

export default function ActionControls({ onReplay, onNext }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up mt-4">
            
            {/* Bouton "Précédent" / Quitter */}
            <Button 
                variant="outline" 
                onClick={() => navigate("/scenarios")}
                className="w-full sm:w-auto"
            >
                Retour aux scénarios
            </Button>
            
            {/* Bouton Rejouer */}
            {onReplay && (
                <Button 
                    variant="primary" 
                    onClick={onReplay} 
                    className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                    Essayer une autre approche
                </Button>
            )}

            {/* Bouton Continuer (Si tu ajoutes des scénarios à tiroirs plus tard) */}
            {onNext && (
                <Button 
                    variant="accent" 
                    onClick={onNext} 
                    className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                    Continuer
                </Button>
            )}
        </div>
    );
}