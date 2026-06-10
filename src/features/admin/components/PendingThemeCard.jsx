// src/features/admin/components/PendingThemeCard.jsx

import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../components/ui/Button";

// On reçoit l'objet complet "theme"
export default function PendingThemeCard({ theme, onApprove, onReject }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Date ISO -> "28/05/2024"
    const formattedDate = new Date(theme.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md hover:border-gray-200">
            {/* En-tête : titre (+ icône) à gauche, actions à droite */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-900 font-nunito leading-tight">
                        {/* icon est une String (emoji ?) — si absent, on n'affiche rien */}
                        {theme.icon && <span className="mr-2">{theme.icon}</span>}
                        {theme.title}
                    </h2>
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                        Proposé le {formattedDate}
                    </div>
                </div>

                <div className="flex gap-2 shrink-0">
                    <Button
                        onClick={onApprove}
                        variant="success"
                        aria-label="Approuver le thème"
                        title="Approuver"
                        className="!px-3"
                    >
                        <Check size={18} strokeWidth={2.5} />
                    </Button>
                    <Button
                        onClick={onReject}
                        variant="error"
                        aria-label="Rejeter le thème"
                        title="Rejeter"
                        className="!px-3"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </Button>

                    {/* Séparateur visuel */}
                    <div className="w-px bg-gray-200 mx-1"></div>

                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="outline"
                        aria-label="Voir les détails"
                        title="Voir les détails"
                        className="!px-3"
                    >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                </div>
            </div>

            {/* Détails — affichés uniquement si isExpanded */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4 text-sm font-nunito">

                    {/* Description : optionnelle dans le modèle -> garde-fou avec || */}
                    <div>
                        <strong className="text-gray-900 block mb-1">Description :</strong>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                            {theme.description || "Aucune description fournie."}
                        </p>
                    </div>

                    {/* Difficulté + statut */}
                    <div className="flex gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                        <span>
                            <strong className="text-gray-700">Difficulté :</strong>{" "}
                            {theme.difficultyId?.level || theme.difficultyId}
                        </span>
                        <span>
                            <strong className="text-gray-700">Statut :</strong> {theme.status}
                        </span>
                    </div>

                </div>
            )}
        </div>
    );
}