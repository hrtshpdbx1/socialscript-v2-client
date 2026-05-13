// src/components/ui/ActionControls.jsx

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Undo2, RotateCw } from "lucide-react"; 

export default function ActionControls({ onReplay, onNext }) {
    const navigate = useNavigate();

    return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up mt-4">
            
            {/* Bouton Retour */}
            <Button 
                variant="outline" 
                onClick={() => navigate("/scenarios")}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
                <Undo2 className="w-5 h-5" /> 
                Retour aux scénarios
            </Button>
            
            {/* Bouton Rejouer */}
            {onReplay && (
                <Button 
                    variant="primary" 
                    onClick={onReplay} 
                    className="w-full sm:w-auto shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    <RotateCw className="w-5 h-5" /> 
                    Essayer une autre approche
                </Button>
            )}

        </div>
    );
}