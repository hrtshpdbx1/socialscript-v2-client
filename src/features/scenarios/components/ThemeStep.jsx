// src/features/scenarios/components/ThemeStep.jsx

import { useState, useEffect } from "react";
import { themeService } from "../../../services/theme.service";

export default function ThemeStep({ selectedDifficulty, onSelect, onEditDifficulty }) {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // On récupère la configuration (image, couleurs) injectée à l'étape 1
    const config = selectedDifficulty.meta || {};

    useEffect(() => {
        async function fetchThemes() {
            setLoading(true);
            setError(null);
            try {
                const data = await themeService.getByDifficulty(selectedDifficulty._id);
                setThemes(data.themes);
            } catch (err) {
                setError("Impossible de charger les thèmes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchThemes();
    }, [selectedDifficulty._id]);

    return (
        <div className="w-full animate-fade-in-up mt-4 md:mt-8 max-w-3xl mx-auto px-4">

          
        
            {/* 💡 RAPPEL DU CHOIX PRÉCÉDENT (Uniformisé avec ScenarioStep) */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={onEditDifficulty}
                    className="group flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 pr-6 text-left transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                    aria-label="Modifier le niveau de difficulté"
                >
                    <div className={`w-12 h-12 rounded-full ${config.bg || 'bg-gray-100'} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <img src={config.img} alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-nunito group-hover:text-primary transition-colors">
                            Niveau choisi
                        </p>
                        <p className={`font-bold font-nunito leading-tight ${config.text || 'text-gray-900'}`}>
                            {selectedDifficulty.title}
                        </p>
                    </div>
                </button>
            </div>

            <p className="text-center text-gray-600 mb-8 font-nunito max-w-lg mx-auto">
                Quel type de situation souhaitez-vous pratiquer aujourd'hui ?
            </p>
          

            {loading && <p className="text-center text-gray-500 animate-pulse font-nunito">Chargement des thèmes...</p>}
            {error && <p className="text-center text-error font-bold font-nunito">{error}</p>}

            {/* GRILLE DES THÈMES */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {themes.map((theme) => (
                        <button
                            key={theme._id}
                            onClick={() => onSelect(theme)}
                            className="group flex items-center gap-4 text-left p-4 bg-white border-2 border-gray-100 rounded-2xl transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:border-primary/40 hover:shadow-md hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                {theme.icon || "💬"}
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 font-nunito text-lg group-hover:text-primary transition-colors">
                                    {theme.title}
                                </h2>
                                <p className="text-xs text-gray-500 font-nunito mt-1 line-clamp-1">
                                    {theme.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}