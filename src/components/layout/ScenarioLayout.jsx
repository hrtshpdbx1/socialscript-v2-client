// src/components/layout/ScenarioLayout.jsx
// Ce composant orchestre : il sait à quelle étape on en est
// et passe le relais au bon composant-enfant.

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ScenarioTopBar from "./ScenarioTopBar";
import DifficultyStep from "../scenarios/DifficultyStep";
import ThemeStep from "../scenarios/ThemeStep";
import ScenarioStep from "../scenarios/ScenarioStep";

function ScenarioLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // --- MODE : Menu vs Jeu ---
    // true quand l'URL contient un ID de scénario (ex: "/scenarios/abc123")
    const isGameActive = location.pathname !== "/scenarios/play";

    // --- NAVIGATION PAR ÉTAPES ---
    const [step, setStep] = useState("difficulty");
    // On stocke l'objet entier (pas juste l'ID) pour que les enfants aient accès au titre etc.
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [activeTitle, setActiveTitle] = useState("");

    // --- PROGRESSION ---
    const stepNumber = { difficulty: 1, theme: 2, scenario: 3 };
    const currentStepNum = isGameActive ? 4 : (stepNumber[step] || 1);

    // --- TITRE DYNAMIQUE ---
    const titles = {
        difficulty: "Choix du niveau de difficulté",
        theme: "Choix du thème",
        scenario: "Choix du scénario",
    };
    const topBarTitle = isGameActive
        ? (activeTitle || "Chargement...")
        : (titles[step] || "Entraînement");

    // --- RETOUR EN ARRIÈRE ---
    const handleBack = () => {
        if (isGameActive) {
            navigate("/scenarios/play");
            setStep("scenario");
            return;
        }
        if (step === "scenario") { setStep("theme"); return; }
        if (step === "theme") { setStep("difficulty"); return; }
    };

    const showBackButton = step !== "difficulty" || isGameActive;

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-background">

            <ScenarioTopBar
                title={topBarTitle}
                totalSteps={4}
                currentStep={currentStepNum}
                onClose={() => {
                    setStep("difficulty");
                    setSelectedDifficulty(null);
                    setSelectedTheme(null);
                    navigate("/scenarios");
                }}
                onBack={showBackButton ? handleBack : null}
            />

            <main className={`flex-1 flex flex-col items-center relative w-full ${isGameActive ? "p-0 overflow-hidden" : "p-2 md:p-4 overflow-y-auto"}`}>
                <div className={`w-full flex flex-col items-center h-full ${!isGameActive ? "max-w-4xl mx-auto" : ""}`}>

                    {/* ÉTAPE 1 : Difficulté */}
                    {!isGameActive && step === "difficulty" && (
                        <DifficultyStep
                            onSelect={(difficulty) => {
                                setSelectedDifficulty(difficulty);
                                setStep("theme");
                            }}
                        />
                    )}

                    {/* ÉTAPE 2 : Thème */}
                    {!isGameActive && step === "theme" && selectedDifficulty && (
                        <ThemeStep
                            selectedDifficulty={selectedDifficulty}
                            onSelect={(theme) => {
                                setSelectedTheme(theme);
                                setStep("scenario");
                            }}
                            //  fonction pour revenir en arrière
                            onEditDifficulty={() => setStep("difficulty")}
                        />
                    )}

                    {/* ÉTAPE 3 : Scénario */}
                    {!isGameActive && step === "scenario" && selectedDifficulty && selectedTheme && (
                        <ScenarioStep
                            selectedDifficulty={selectedDifficulty}
                            selectedTheme={selectedTheme}
                            // fonctions pour le fil d'ariane
                            onEditDifficulty={() => setStep("difficulty")}
                            onEditTheme={() => setStep("theme")}
                        />
                    )}

                    {/* ÉTAPE 4 : Mode Jeu */}
                    {isGameActive && (
                        <div className="w-full h-full animate-fade-in-up flex-1 flex flex-col">
                            <Outlet context={{ setActiveTitle }} />
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default ScenarioLayout;
