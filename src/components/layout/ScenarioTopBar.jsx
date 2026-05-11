// src/components/layout/ScenarioTopBar.jsx

import { useNavigate } from "react-router-dom";
import ProgressBar from "../ui/ProgressBar";

export default function ScenarioTopBar({ title, totalSteps, currentStep, onClose, onBack }) {
    const navigate = useNavigate();

    return (
        // 'sticky top-0 z-50' permet à la barre de rester collée en haut même si le chat défile
        <header className="bg-white px-4 py-4 md:px-8 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-4xl mx-auto">

                {/* LIGNE 1 : Retour (gauche) — Titre (centre) — Quitter (droite) */}
                <div className="flex items-center justify-between mb-4">

                    {/* BOUTON RETOUR (Flèche) */}
                    {/* Si onBack n'existe pas, on affiche un élément fantôme de même taille 
                        pour que le titre reste parfaitement centré */}
                    {onBack ? (
                        <button
                            onClick={onBack}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                            aria-label="Retour à l'étape précédente"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    ) : (
                        // Élément fantôme gauche (même largeur que le bouton : p-2 + w-6 = w-10 ≈ 44px)
                        <div className="w-10" />
                    )}

                    {/* TITRE DU SCÉNARIO */}
                    {/* 'truncate' évite de casser la mise en page sur mobile si le titre est trop long */}
                    <h1 className="flex-1 text-center text-lg md:text-xl font-extrabold text-gray-900 font-nunito truncate px-2">
                        {title}
                    </h1>

                    {/* BOUTON QUITTER (Croix)  */}
                    <button
                        onClick={onClose || (() => navigate("/scenarios"))}
                        className="p-2 text-gray-400 hover:text-error hover:bg-error-100 rounded-full transition-all"
                        aria-label="Quitter l'entraînement"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* LIGNE 2 : La barre de progression */}
                <div className="max-w-4xl mx-auto">
                    <ProgressBar totalSteps={totalSteps} currentStep={currentStep} />
                </div>
            </div>
        </header>
    );
}