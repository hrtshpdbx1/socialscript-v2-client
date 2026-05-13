import { useState, useRef, useEffect } from "react";
import ChoiceButton from "./ChoiceButton";

export default function ChoiceList({ choices, onSelectChoice }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const choiceRef = useRef(null);

    if (!choices || choices.length === 0) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? choices.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === choices.length - 1 ? 0 : prev + 1));
    };

    // Gestion clavier sur le conteneur
    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            handlePrev();
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            handleNext();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelectChoice(choices[currentIndex]);
        }
    };

    // Remet le focus sur le choix quand on change d'option
    useEffect(() => {
        choiceRef.current?.focus();
    }, [currentIndex]);

    const currentChoice = choices[currentIndex];

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <p 
                id="choice-label"
                className="text-[10px] font-bold text-gray-700 uppercase tracking-wider text-center mb-1 font-nunito"
            >
                Que répondez-vous ?
            </p>

            <div 
                className="flex items-center w-full gap-2 md:gap-4"
                role="group"
                aria-labelledby="choice-label"
                onKeyDown={handleKeyDown}
            >
                <button
                    onClick={handlePrev}
                    aria-label={`Option précédente (${currentIndex === 0 ? choices.length : currentIndex} sur ${choices.length})`}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                >
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex-1" key={currentIndex}>
                    <div
                        ref={choiceRef}
                        tabIndex={0}
                        role="option"
                        aria-selected="true"
                        aria-label={`Option ${currentIndex + 1} sur ${choices.length} : ${currentChoice.responseText}`}
                        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <ChoiceButton onClick={() => onSelectChoice(currentChoice)}>
                            {currentChoice.responseText}
                        </ChoiceButton>
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    aria-label={`Option suivante (${currentIndex === choices.length - 1 ? 1 : currentIndex + 2} sur ${choices.length})`}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex-shrink-0"
                >
                    <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dots indicateurs — cachés des lecteurs d'écran car redondants */}
            <div className="flex gap-1.5 mt-2" aria-hidden="true">
                {choices.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`transition-all duration-300 rounded-full ${
                            idx === currentIndex 
                            ? 'w-6 h-2 bg-primary'
                            : 'w-2 h-2 bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}