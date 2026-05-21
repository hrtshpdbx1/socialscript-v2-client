// src/features/scenarios/components/ScenarioStep.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scenarioService } from "../../../services/scenario.service";

export default function ScenarioStep({ selectedDifficulty, selectedTheme, onEditDifficulty, onEditTheme }) {
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // On récupère la config visuelle de la difficulté (injectée à l'étape 1)
    const diffConfig = selectedDifficulty.meta || {};

    useEffect(() => {
        async function fetchScenarios() {
            setLoading(true);
            setError(null);
            try {
                const data = await scenarioService.getByTheme(selectedDifficulty._id, selectedTheme._id);
                setScenarios(data.scenarios);
            } catch (err) {
                setError("Impossible de charger les scénarios. Veuillez réessayer.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchScenarios();
    }, [selectedDifficulty._id, selectedTheme._id]);

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des scénarios...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

    return (
        <div className="w-full animate-fade-in-up mt-4 md:mt-8 max-w-4xl mx-auto px-4">

            {/* Fil d'Ariane : Difficulté + Thème) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">

                {/* Bouton Difficulté */}
                <button
                    onClick={onEditDifficulty}
                    className="group flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 pr-6 text-left transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                    aria-label="Modifier le niveau de difficulté"
                >
                    <div className={`w-12 h-12 rounded-full ${diffConfig.bg || 'bg-gray-100'} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <img src={diffConfig.img} alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-nunito group-hover:text-primary transition-colors">
                            Niveau
                        </p>
                        <p className={`font-bold font-nunito leading-tight ${diffConfig.text || 'text-gray-900'}`}>
                            {selectedDifficulty.title}
                        </p>
                    </div>
                </button>

                {/* Petite flèche de liaison */}
                <span className="text-gray-500 hidden sm:block">➔</span>

                {/* Bouton Thème */}
                <button
                    onClick={onEditTheme}
                    className="group flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 pr-6 text-left transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                    aria-label="Modifier le thème"
                >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                        {selectedTheme.icon || "💬"}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider font-nunito group-hover:text-primary transition-colors">
                            Thème
                        </p>
                        <p className="font-bold font-nunito leading-tight text-gray-900">
                            {selectedTheme.title}
                        </p>
                    </div>
                </button>
            </div>

            <p className="text-center text-gray-600 mb-8 font-nunito">
                Choisissez une situation pour commencer votre entraînement.
            </p>

            {/* GRILLE DES SCÉNARIOS */}
            {scenarios.length === 0 && !loading && !error ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-nunito">Aucun scénario disponible pour le moment dans cette catégorie.</p>
                </div>
            ) : (
                <ul
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    role="list"
                    aria-label="Liste des scénarios"
                >
                    {scenarios.map((scenario) => (
                        <li key={scenario._id} role="listitem">
                            <button
                                onClick={() => navigate(`/scenarios/${scenario._id}`)}
                                className="w-full text-left p-6 bg-white rounded-3xl border-2 border-gray-100 shadow-sm transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full group"
                                aria-label={`Jouer le scénario : ${scenario.title}`}
                            >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <h2 className="font-bold text-xl text-gray-900 font-nunito group-hover:text-primary transition-colors leading-tight">
                                        {scenario.title}
                                    </h2>

                                    {/* Icône de Play */}
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Le contexte (limité à 3 lignes) */}
                                <p className="text-gray-500 font-nunito text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {scenario.context}
                                </p>


                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}