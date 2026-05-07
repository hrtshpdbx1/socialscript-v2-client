// src/components/ui/ChoiceButton.jsx

export default function ChoiceButton({ children, onClick, label }) {
    return (
        <button
            onClick={onClick}
            // On passe en flex-col pour mettre le label au-dessus du texte
            className="w-full flex flex-col text-left justify-start h-auto py-4 px-6 border-2 border-primary/20 hover:border-primary text-gray-700 hover:text-primary bg-white hover:bg-primary/5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm font-nunito"
        >
            {/* L'étiquette "Option X" */}
            {label && (
                <span className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                    {label}
                </span>
            )}
            
            {/* Le texte de la réponse */}
            <span className="text-base md:text-lg leading-relaxed">
                {children}
            </span>
        </button>
    );
}