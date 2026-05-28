// scr/features/admin/components/PendingItemCard.jsx
//  - [x] Composant PendingItemCard réutilisable (titre, contexte, boutons)
//  - [x] Câbler les boutons Approuver/Rejeter → appel API → retire l'item de la liste
//  - [x] Afficher titre, auteur et date par défaut, avec un menu déroulant pour le reste

import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../components/ui/Button";

// On reçoit maintenant l'objet complet "scenario" 
export default function PendingItemCard({ scenario, onApprove, onReject }) {
    // * ÉTAT LOCAL (State)
    // isExpanded (booléen) : permet de savoir si on affiche les détails ou non
    // false = masqué (par défaut), true = affiché
    const [isExpanded, setIsExpanded] = useState(false);

    // * FORMATAGE DE LA DATE
    // On transforme la date ISO (ex: "2024-05-28T...") en date lisible (ex: "28/05/2024")
    const formattedDate = new Date(scenario.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

  

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md hover:border-gray-200">
            {/* En-tête : titre à gauche, actions à droite */}
            <div className="flex items-start justify-between gap-4">
                
                {/* Informations principales toujours visibles */}
                <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-900 font-nunito leading-tight">
                        {scenario.title}
                    </h2>
                    {/* Auteur et date juste en dessous du titre */}
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                        Créé le {formattedDate}
                    </div>
                </div>

                {/* Actions — flex-shrink-0 pour qu'elles ne se compressent jamais */}
                <div className="flex gap-2 flex-shrink-0">
                    <Button
                        onClick={onApprove}
                        variant="success"
                        aria-label="Approuver le scénario"
                        title="Approuver"
                        className="!px-3"
                    >
                        <Check size={18} strokeWidth={2.5} />
                    </Button>
                    <Button
                        onClick={onReject}
                        variant="error"
                        aria-label="Rejeter le scénario"
                        title="Rejeter"
                        className="!px-3"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </Button>
                    
                    {/* Séparateur visuel */}
                    <div className="w-px bg-gray-200 mx-1"></div>

                    {/* Bouton pour ouvrir/fermer le détail */}
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)} // Inverse la valeur (true devient false, false devient true)
                        variant="outline"
                        aria-label="Voir les détails"
                        title="Voir les détails"
                        className="!px-3"
                    >
                        {/* On affiche une icône différente selon l'état */}
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                </div>
            </div>

            {/* Section Détails - Affichée uniquement si isExpanded est true (Rendu conditionnel) */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4 text-sm font-nunito">
                    
                    {/* Contexte */}
                    <div>
                        <strong className="text-gray-900 block mb-1">Contexte :</strong>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                            {scenario.context}
                        </p>
                    </div>

                    {/* Personnage et Dialogue */}
                    <div>
                        <strong className="text-gray-900 block mb-1">Personnage :</strong>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="font-bold text-gray-700">{scenario.characterName} :</span> 
                            <span className="italic text-gray-600 ml-2">"{scenario.characterDialogue}"</span>
                        </div>
                    </div>

                    {/* Les 3 Choix */}
                    <div>
                        <strong className="text-gray-900 block mb-2">Choix possibles :</strong>
                        <div className="grid grid-cols-1 gap-3">
                            {scenario.choices.map((choice, index) => (
                                <div key={index} className="border border-gray-200 p-3 rounded-lg flex flex-col gap-1">
                                    <span className="font-bold text-primary">Choix {index + 1} : {choice.responseText}</span>
                                    <span className="text-gray-600"><strong className="text-gray-700">Réaction :</strong> {choice.reactionText}</span>
                                    <span className="text-gray-600"><strong className="text-gray-700">Analyse :</strong> {choice.analysis}</span>
                                    <span className="text-gray-600"><strong className="text-gray-700">Conséquence :</strong> {choice.consequence}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leçon à retenir (Key Takeaway) */}
                    <div>
                        <strong className="text-gray-900 block mb-1">Leçon (Takeaway) :</strong>
                        <p className="text-gray-600 bg-blue-50/50 border border-blue-100 p-3 rounded-lg">
                            {scenario.keyTakeaway}
                        </p>
                    </div>

                    {/* Métadonnées (Thème et Difficulté) */}
                    {/* <div className="flex gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                        <span><strong className="text-gray-700">Thème ID :</strong> {scenario.themeId?.name || scenario.themeId}</span>
                        <span><strong className="text-gray-700">Difficulté ID :</strong> {scenario.difficultyId?.level || scenario.difficultyId}</span>
                    </div> */}

                </div>
            )}
        </div>
    );
}