// src/components/layout/ScenarioLayout.jsx

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ScenarioTopBar from "./ScenarioTopBar";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { difficultyService } from "../../services/difficulty.service";
import { themeService } from "../../services/theme.service";
import { scenarioService } from "../../services/scenario.service";

function ScenarioLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // --- 1. GESTION DU MODE (Menu vs Jeu) ---
    // Si l'URL est exactement "/scenarios", on affiche les menus.
    // Si l'URL contient un ID (ex: "/scenarios/1234"), on bascule en mode jeu !
    const isPlayMode = location.pathname !== "/scenarios/play";

    const [activeTitle, setActiveTitle] = useState("");

    // --- 2. ÉTATS DE NAVIGATION ---
    const [step, setStep] = useState("difficulty"); // "difficulty" → "theme" → "scenario"
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);

    // --- 3. ÉTATS DES DONNÉES ---
    const [difficulties, setDifficulties] = useState([]);
    const [themes, setThemes] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- 4. CHARGEMENT INITIAL ---
    useEffect(() => {
        // On ne charge les difficultés que si on est dans les menus et que la liste est vide
        if (!isPlayMode && step === "difficulty" && difficulties.length === 0) {
            showDifficulty();
        }
    }, [step, isPlayMode, difficulties.length]);

    // --- 5. FONCTIONS DE RÉCUPÉRATION ---
    async function showDifficulty() {
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

    async function showTheme(difficultyId) {
        setLoading(true);
        setError(null);
        setThemes([]);
        try {
            const data = await themeService.getByDifficulty(difficultyId);
            setThemes(data.themes);
            setStep("theme"); // On avance à l'étape suivante
        } catch (err) {
            setError("Impossible de charger les thèmes. Veuillez réessayer.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function showScenario(themeId) {
        setLoading(true);
        setError(null);
        setScenarios([]);
        try {
            const data = await scenarioService.getByTheme(selectedDifficulty, themeId);
            setScenarios(data.scenarios);
            setStep("scenario"); // On avance à l'étape suivante
        } catch (err) {
            setError("Impossible de charger les scénarios. Veuillez réessayer.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // --- 6. FONCTION UTILITAIRE (Couleurs des Badges) ---
    const getDifficultyColor = (title) => {
        if (!title) return 'primary';
        const t = title.toLowerCase();
        if (t.includes('facile')) return 'success';
        if (t.includes('moyen') || t.includes('intermédiaire')) return 'accent';
        if (t.includes('difficile')) return 'error';
        return 'primary';
    };

    // --- 7. CALCUL DE LA PROGRESSION ---
    let currentStepNum = 1;
    if (step === "theme") currentStepNum = 2;
    if (step === "scenario") currentStepNum = 3;
    if (isPlayMode) currentStepNum = 4; // Si on joue, la barre est à 4/4 !

    //  Titre dynamique
    const getTopBarTitle = () => {
        if (isPlayMode) return activeTitle || "Chargement...";
        if (step === "difficulty") return "Choix du niveau de difficulté";
        if (step === "theme") return "Choix du thème";
        if (step === "scenario") return "Choix du scénario";
        return "Entraînement"; // Valeur par défaut au cas où
    };

    // Retour en arrière
    const handleBack = () => {
        // Si on est en mode jeu, le retour nous ramène à la liste des scénarios
        if (isPlayMode) {
            navigate("/scenarios/play");
            setStep("scenario");
            return;
        }
        // Si on est sur le choix du scénario, on revient au thème
        if (step === "scenario") {
            setStep("theme");
            return;
        }
        // Si on est sur le thème, on revient à la difficulté
        if (step === "theme") {
            setStep("difficulty");
            return;
        }
    };


    return (
        <div className="h-screen overflow-hidden flex flex-col bg-background">

            {/* L'en-tête */}
            <ScenarioTopBar
                title={getTopBarTitle()}
                totalSteps={4}
                currentStep={currentStepNum}
                onClose={() => {
                    setStep("difficulty");
                    navigate("/scenarios");
                }}
                onBack={(step !== "difficulty" || isPlayMode) ? handleBack : null}
            />

            <main className={`flex-1 flex flex-col items-center relative w-full ${isPlayMode ? "p-0 overflow-hidden" : "p-2 md:p-4 overflow-y-auto"}`}>

                {/* Messages globaux (Erreur & Chargement) */}
                {error && <p className="text-error font-bold mb-4 font-nunito">{error}</p>}
                {loading && <p className="text-gray-500 mb-4 font-nunito animate-pulse">Chargement en cours...</p>}

<div className={`w-full flex flex-col items-center h-full ${!isPlayMode ? "max-w-4xl mx-auto" : ""}`}>

                    {/* =========================================
                        ÉTAPE 1 : CHOIX DE LA DIFFICULTÉ
                        ========================================= */}
                    {!isPlayMode && step === "difficulty" && !loading && difficulties.length > 0 && (
                        <div className="text-center animate-fade-in-up w-full mt-8 md:mt-16">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {difficulties.map((difficulty) => (
                                    <Button
                                        variant="outline_primary"
                                        key={difficulty._id}
                                        onClick={() => {
                                            setSelectedDifficulty(difficulty._id);
                                            showTheme(difficulty._id);
                                        }}>
                                        {difficulty.title}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        ÉTAPE 2 : CHOIX DU THÈME
                        ========================================= */}
                    {!isPlayMode && step === "theme" && !loading && (
                        <div className=" flex flex-col gap-16  text-center animate-fade-in-up w-full mt-8 md:mt-12">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {themes.map((theme) => (
                                    <Button
                                        variant="accent"
                                        key={theme._id}
                                        onClick={() => {
                                            setSelectedTheme(theme._id);
                                            showScenario(theme._id);
                                        }}>
                                        {theme.title}
                                    </Button>
                                ))}
                            </div>


                            {/* Rappel du choix précédent (Difficulté) */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 bg-white p-4 rounded-xl shadow-sm border border-gray-100 justify-center max-w-lg mx-auto">
                                <span className="font-semibold text-gray-700 font-nunito">Niveau choisi :</span>
                                <Badge
                                    text={difficulties.find(d => d._id === selectedDifficulty)?.title}
                                    color={getDifficultyColor(difficulties.find(d => d._id === selectedDifficulty)?.title)}
                                />
                            </div>



                        </div>
                    )}

                    {/* =========================================
                        ÉTAPE 3 : CHOIX DU SCÉNARIO
                        ========================================= */}
                    {!isPlayMode && step === "scenario" && !loading && (
                        <div className="animate-fade-in-up w-full mt-4 md:mt-8">

                            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {scenarios.map((scenario) => (
                                    <Card key={scenario._id} className="flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => {
                                            // Ceci change l'URL ! React Router va injecter <ScenarioDetail />
                                            navigate(`/scenarios/${scenario._id}`);
                                        }}>
                                        <h3 className="font-bold text-xl mb-3 font-nunito text-primary">{scenario.title}</h3>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        ÉTAPE 4 : MODE JEU (L'OUTLET)
                        ========================================= */}
                    {isPlayMode && (
                        <div className="w-full h-full animate-fade-in-up flex-1 flex flex-col">
                            {/* React Router injecte <ScenarioDetail /> ici */}
                            {/* + On passe la fonction setActiveTitle à l'Outlet pour que l'enfant l'utilise */}
                            <Outlet context={{ setActiveTitle }} />
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default ScenarioLayout;