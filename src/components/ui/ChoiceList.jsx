// src/components/ui/ChoiceList.jsx

import { useState } from "react";
import ChoiceButton from "./ChoiceButton";

export default function ChoiceList({ choices, onSelectChoice }) {
    // On commence toujours par afficher la première option (index 0)
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!choices || choices.length === 0) return null;

    // Fonction pour reculer (avec boucle : si on est au début, on passe à la fin)
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? choices.length - 1 : prev - 1));
    };

    // Fonction pour avancer (avec boucle : si on est à la fin, on repasse au début)
    const handleNext = () => {
        setCurrentIndex((prev) => (prev === choices.length - 1 ? 0 : prev + 1));
    };

    // On isole l'option qui doit être affichée à l'écran
    const currentChoice = choices[currentIndex];

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider text-center mb-1 font-nunito">
                Que répondez-vous ?
            </p>

            {/* Le Carousel*/}
            <div className="flex items-center w-full gap-2 md:gap-4">
                
                {/* Flèche Gauche */}
                <button
                    onClick={handlePrev}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                    aria-label="Option précédente"
                >
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Le Bouton d'Option Central */}
                <div className="flex-1">
                    {/* On utilise un key basé sur l'index pour forcer l'animation React si on change d'option */}
                    <div key={currentIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <ChoiceButton 
                            onClick={() => onSelectChoice(currentChoice)}
                            label={`Option ${currentIndex + 1}`}
                        >
                            {currentChoice.responseText}
                        </ChoiceButton>
                    </div>
                </div>

                {/* Flèche Droite */}
                <button
                    onClick={handleNext}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                    aria-label="Option suivante"
                >
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Les petits points (dots) indicateurs en dessous */}
          <div className="flex gap-1.5 mt-2">
                {choices.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`transition-all duration-300 rounded-full ${
                            idx === currentIndex 
                            ? 'w-6 h-2 bg-primary' // Le point actif est plus large et coloré
                            : 'w-2 h-2 bg-gray-300' // Les autres sont de petits cercles gris
                        }`}
                    />
                ))}
            </div>
            
        </div>
    );
}