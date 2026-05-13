// src/components/scenarios/DifficultyStep.jsx
// ÉTAPE 1 : Choix du niveau de difficulté


import { useState, useEffect } from "react";
import { difficultyService } from "../../services/difficulty.service";

// Dictionnaire style et illustation 
const difficultyConfig = {
    "facile": {
        img: "/illustrations/Fitz - Sitting Meditation.png",
        desc: "Se présenter, demander un renseignement",
        theme: "emerald", 
        bg: "bg-emerald-50",
        border: "border-emerald-100 hover:border-emerald-400 hover:shadow-emerald-100",
        text: "text-emerald-700"
    },
    "moyen": {
        img: "/illustrations/Fitz - Playing Sports.png",
        desc: "Refuser poliment, demander un service",
        theme: "orange",
        bg: "bg-orange-50",
        border: "border-orange-100 hover:border-orange-400 hover:shadow-orange-100",
        text: "text-orange-700"
    },
    "difficile": {
        img: "/illustrations/Fitz - Sitting Floor Stretching.png",
        desc: "Exprimer un désaccord, poser une limite",
        theme: "rose",
        bg: "bg-rose-50",
        border: "border-rose-100 hover:border-rose-400 hover:shadow-rose-100",
        text: "text-rose-700"
    }
};

export default function DifficultyStep({ onSelect }) {
    const [difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDifficulties() {
            setLoading(true);
            setError(null);
            try {
                const data = await difficultyService.getAll();
                setDifficulties(data.difficulties);
            } catch (err) {
                setError("Impossible de charger les difficultés. Veuillez réessayer.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDifficulties();
    }, []);

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement en cours...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

    return (
            <div className="w-full animate-fade-in-up mt-4 md:mt-8">
                <p className="text-center text-gray-500 mb-8 font-nunito max-w-lg mx-auto">
                    Choisissez le niveau de défi qui vous correspond aujourd'hui. 
                </p>

                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
                    role="group"
                    aria-label="Niveaux de difficulté"
                >
                    {difficulties.map((difficulty) => {

                        const config = difficultyConfig[difficulty.title.toLowerCase()] || difficultyConfig["moyen"];

                        return (
                            <button
                                key={difficulty._id}
                                onClick={() => {
                                  
                                    onSelect({ ...difficulty, meta: config });
                                }}
                                className={`group flex flex-col items-center text-center p-8 bg-white rounded-[2rem] border-2 shadow-sm transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 hover:-translate-y-2 hover:shadow-xl ${config.border}`}
                            >
                                {/* L'illustration dans sa bulle colorée */}
                                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${config.bg} flex items-center justify-center mb-6 p-4 transition-transform duration-300 group-hover:scale-110`}>
                                    <img
                                        src={config.img}
                                        alt="" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <h3 className="text-2xl font-extrabold text-gray-900 font-nunito mb-3">
                                    {difficulty.title}
                                </h3>

                                <p className="text-gray-500 font-nunito mb-6 flex-1 text-sm leading-relaxed">
                                    {config.desc}
                                </p>

                            </button>
                        );
                    })}
                </div>
            </div>
    )
}
