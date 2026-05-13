// src/components/scenarios/ThemeStep.jsx
// ÉTAPE 2 : Choix du thème
// Reçoit la difficulté sélectionnée, fetche les thèmes correspondants, les affiche.

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { themeService } from "../../services/theme.service";

// Fonction utilitaire pour la couleur du badge
function getDifficultyColor(title) {
    if (!title) return "primary";
    const t = title.toLowerCase();
    if (t.includes("facile")) return "success";
    if (t.includes("moyen") || t.includes("intermédiaire")) return "accent";
    if (t.includes("difficile")) return "error";
    return "primary";
}

export default function ThemeStep({ selectedDifficulty, onSelect }) {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchThemes() {
            setLoading(true);
            setError(null);
            try {
                const data = await themeService.getByDifficulty(selectedDifficulty._id);
                setThemes(data.themes);
            } catch (err) {
                setError("Impossible de charger les thèmes. Veuillez réessayer.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchThemes();
    }, [selectedDifficulty._id]);

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement en cours...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

    return (
        <div className="flex flex-col gap-16 text-center animate-fade-in-up w-full mt-8 md:mt-12">
            <div
                className="flex flex-wrap gap-4 justify-center"
                role="group"
                aria-label="Thèmes disponibles"
            >
                {themes.map((theme) => (
                    <Button
                        variant="accent"
                        key={theme._id}
                        onClick={() => onSelect(theme)}
                    >
                        {theme.title}
                    </Button>
                ))}
            </div>

            {/* Rappel du choix précédent */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 bg-white p-4 rounded-xl shadow-sm border border-gray-100 justify-center max-w-lg mx-auto">
                <span className="font-semibold text-gray-700 font-nunito">Niveau choisi :</span>
                <Badge
                    text={selectedDifficulty.title}
                    color={getDifficultyColor(selectedDifficulty.title)}
                />
            </div>
        </div>
    );
}
