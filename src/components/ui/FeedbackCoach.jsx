// src/components/ui/FeedbackCoach.jsx

export default function FeedbackCoach({ analysis, keyTakeaway }) {
    return (
        <div className="flex w-full justify-center my-6 animate-fade-in-up">
            {/* Le fond utilise une version très transparente de l'accent (jaune) et une bordure solide */}
            <div className="bg-[#fff9e6] border-2 border-accent rounded-2xl p-5 md:p-6 max-w-3xl w-full shadow-sm relative overflow-hidden">
                
                {/* Petit élément de décoration en arrière-plan (optionnel, donne du cachet) */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl pointer-events-none"></div>

                {/* En-tête du feedback */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-xl border border-accent/30">
                        💡
                    </div>
                    <h3 className="font-bold text-gray-900 font-nunito text-lg">
                        Analyse
                    </h3>
                </div>

                {/* Le texte d'analyse */}
                <p className="text-gray-800 font-nunito leading-relaxed mb-5 relative z-10">
                    {analysis}
                </p>

                {/* La zone "À retenir" mise en évidence */}
                {keyTakeaway && (
                    <div className="bg-white/80 p-4 rounded-xl border border-accent/20 relative z-10">
                        <h4 className="font-bold text-gray-900 font-nunito mb-1 flex items-center gap-2">
                            <span>📌</span> À retenir :
                        </h4>
                        <p className="text-gray-700 font-nunito">
                            {keyTakeaway}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}