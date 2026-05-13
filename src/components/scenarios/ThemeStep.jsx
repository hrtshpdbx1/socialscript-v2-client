// src/components/scenarios/ThemeStep.jsx

import { useState, useEffect } from "react";
import { themeService } from "../../services/theme.service";

export default function ThemeStep({ selectedDifficulty, onSelect }) {
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

            {/* 💡 RAPPEL DU CHOIX PRÉCÉDENT */}
            <div className="flex items-center gap-5 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-lg mx-auto">
                <div className={`w-16 h-16 rounded-full ${config.bg || 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                    <img src={config.img} alt="" className="w-12 h-12 object-contain" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-nunito mb-1">
                        Niveau choisi
                    </p>
                    <h2 className={`text-xl font-extrabold font-nunito ${config.text || 'text-gray-900'}`}>
                        {selectedDifficulty.title}
                    </h2>
                </div>
            </div>

            <p className="text-center text-gray-500 mb-8 font-nunito">
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
                                <h3 className="font-bold text-gray-900 font-nunito text-lg group-hover:text-primary transition-colors">
                                    {theme.title}
                                </h3>
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