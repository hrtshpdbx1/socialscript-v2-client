// src/components/scenarios/ScenarioStep.jsx
// ÉTAPE 3 : Choix du scénario
// Reçoit la difficulté et le thème, fetche les scénarios, les affiche comme boutons accessibles.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scenarioService } from "../../services/scenario.service";

export default function ScenarioStep({ selectedDifficulty, selectedTheme }) {
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement en cours...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

    return (
        <div className="animate-fade-in-up w-full mt-4 md:mt-8">
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                role="list"
                aria-label="Liste des scénarios disponibles"
            >
                {scenarios.map((scenario) => (
                    <div key={scenario._id} role="listitem">
                        <button
                            onClick={() => navigate(`/scenarios/${scenario._id}`)}
                            className="w-full text-left p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <h3 className="font-bold text-xl font-nunito text-primary">
                                {scenario.title}
                            </h3>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
