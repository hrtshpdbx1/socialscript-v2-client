// src/pages/ScenarioDetail.jsx

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { scenarioService } from "../services/scenario.service";
import Button from "../components/ui/Button";
import { useOutletContext } from "react-router-dom";
import ChatContainer from "../components/ui/ChatContainer";
import ChatBubble from "../components/ui/ChatBubble";
import FeedbackCoach from "../components/ui/FeedbackCoach";
import ChoiceList from "../components/ui/ChoiceList";
import ActionControls from "../components/ui/ActionControls";
import TypingIndicator from "../components/ui/TypingIndicator";


// CONFIGURATION DES AVATARS (API DICEBEAR)
function getAvatarUrl(seed) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`
}

function ScenarioDetail() {
    const { id } = useParams()
    // On récupère la fonction envoyée par le parent (ScenarioLayout)
    const { setActiveTitle } = useOutletContext();
    const [scenarioToDisplay, setScenarioToDisplay] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [isAiTypingInitial, setIsAiTypingInitial] = useState(true);
    const [isAiTypingReaction, setIsAiTypingReaction] = useState(false);

    // 💡 1. On crée une référence pour le scroll intelligent
    const reactionRef = useRef(null)

    // Chargement du scénario
    useEffect(() => {
        const fetchScenario = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await scenarioService.getById(id)
                setScenarioToDisplay(data)
                // on envoit le titre au parent
                setActiveTitle(data.title);
            }
            catch (err) {
                setError("Impossible de charger le scenario. Veuillez réessayer.")
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchScenario()
    }, [id]);

    useEffect(() => {
        if (scenarioToDisplay) {
            setIsAiTypingInitial(true);
            // On fait "réfléchir" l'IA pendant 1.5 seconde avant d'afficher son 1er message
            const timer = setTimeout(() => {
                setIsAiTypingInitial(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [scenarioToDisplay]);

    useEffect(() => {
        if (selectedChoice) {
            setIsAiTypingReaction(true);

            // Le scroll intelligent se déclenche immédiatement sur le message de l'utilisateur
            if (reactionRef.current) {
                setTimeout(() => {
                    reactionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
            }
            // Et 1.5 seconde plus tard, réponse
            const timer = setTimeout(() => {
                setIsAiTypingReaction(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [selectedChoice]);

    //  2. Effet pour déclencher le scroll au bon endroit quand on fait un choix
    useEffect(() => {
        if (selectedChoice && reactionRef.current) {
            // Un petit setTimeout de 100ms laisse le temps à React de dessiner 
            // les bulles à l'écran avant de calculer la position du scroll
            setTimeout(() => {
                // block: "start" aligne le haut de la réaction avec le haut de l'écran
                reactionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, [selectedChoice]);

    const avatarUrl = scenarioToDisplay
        ? getAvatarUrl(scenarioToDisplay.characterAvatarSeed || scenarioToDisplay.characterName)
        : null

    if (loading) return <p className="text-center mt-10 font-nunito animate-pulse">Chargement de la conversation...</p>
    if (error) return <p className="text-center mt-10 text-error font-nunito">{error}</p>
    if (!scenarioToDisplay) return null

    return (
        <div className="flex flex-col h-full w-full relative">

            {/* LA DISCUSSION */}
            <ChatContainer>
                {/* On enveloppe le contenu du chat dans une div centrée pour garder la lisibilité */}
                <div className="max-w-3xl mx-auto w-full space-y-6">
                    {/* Carte de Mise en situation  */}
                    <div className="bg-gray-100/80 border-l-4 border-l-primary rounded-r-2xl rounded-l-sm p-4 md:p-6 mb-6 animate-fade-in-up shadow-sm">
                        <div className="flex items-start gap-3">
                            <span className="text-xl mt-0.5">📍</span>
                            <div>
                                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 font-nunito">
                                    Mise en situation
                                </h2>
                                <p className="text-gray-800 font-nunito leading-relaxed">
                                    {scenarioToDisplay.context}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 💡 Affichage conditionnel : Animation OU Vrai message initial */}
                    {isAiTypingInitial ? (
                        <TypingIndicator avatarUrl={avatarUrl} />
                    ) : (
                        <div className="animate-fade-in-up">
                            <ChatBubble
                                isUser={false}
                                text={scenarioToDisplay.characterDialogue}
                                senderName={scenarioToDisplay.characterName}
                                avatarUrl={avatarUrl}
                            />
                        </div>
                    )}

                    {/* Suite de la discussion (Si on a fait un choix) */}
                    {selectedChoice && (
                        <div ref={reactionRef} className="space-y-6 pt-2">
                            {/* Le message de l'utilisateur (apparaît tout de suite) */}
                            <ChatBubble isUser={true} text={selectedChoice.responseText} />

                            {/* 💡 Affichage conditionnel : Animation OU Réaction de l'IA + Feedback */}
                            {isAiTypingReaction ? (
                                <TypingIndicator avatarUrl={avatarUrl} />
                            ) : (
                                <div className="space-y-6 animate-fade-in-up">
                                    <ChatBubble
                                        isUser={false}
                                        text={selectedChoice.reactionText}
                                        senderName={scenarioToDisplay.characterName}
                                        avatarUrl={avatarUrl}
                                    />
                                    <FeedbackCoach
                                        analysis={selectedChoice.analysis}
                                        consequence={selectedChoice.consequence}
                                        keyTakeaway={selectedChoice.keyTakeaway}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ChatContainer>

            {/* ZONE D'INTERACTION PLEINE LARGEUR */}
            <div className="w-full bg-white border-t border-gray-200 py-3 px-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-3xl mx-auto w-full">
                    {!selectedChoice ? (
                        <ChoiceList
                            choices={scenarioToDisplay.choices}
                            onSelectChoice={setSelectedChoice}
                        />
                    ) : (
                        <ActionControls
                            onReplay={() => setSelectedChoice(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScenarioDetail;