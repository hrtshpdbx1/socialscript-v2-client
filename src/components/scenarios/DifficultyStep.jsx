// src/components/scenarios/DifficultyStep.jsx
// ÉTAPE 1 : Choix du niveau de difficulté


import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { difficultyService } from "../../services/difficulty.service";

export default function DifficultyStep({ onSelect }) {
    // Chaque étape gère ses propres données et son propre état de chargement
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
        <div className="text-center animate-fade-in-up w-full mt-8 md:mt-16">
            <div
                className="flex flex-wrap gap-4 justify-center"
                role="group"
                aria-label="Niveaux de difficulté"
            >
                {difficulties.map((difficulty) => (
                    <Button
                        variant="outline_primary"
                        key={difficulty._id}
                        onClick={() => onSelect(difficulty)}
                    >
                        {difficulty.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}
