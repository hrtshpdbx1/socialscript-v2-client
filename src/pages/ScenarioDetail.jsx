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

    // 💡 2. Effet pour déclencher le scroll au bon endroit quand on fait un choix
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
        <div className="flex flex-col h-full w-full max-w-3xl mx-auto relative"> 
            
            {/* LA DISCUSSION */}
            <ChatContainer>
                
                {/* 💡 3. Le Contexte est maintenant une carte d'intro DANS le chat */}
                {/* Elle glissera vers le haut au défilement, libérant la vue ! */}
                <div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-4 animate-fade-in-up">
                    <p className="text-gray-600 font-nunito leading-relaxed">
                        <strong>Contexte :</strong> {scenarioToDisplay.context}
                    </p>
                </div>

                {/* Message initial de l'IA */}
                <ChatBubble 
                    isUser={false} 
                    text={scenarioToDisplay.characterDialogue} 
                    senderName={scenarioToDisplay.characterName} 
                    avatarUrl={avatarUrl} 
                />

                {/* Si l'utilisateur a fait un choix */}
                {selectedChoice && (
                    // 💡 4. On place le Ref ICI : Le scroll s'arrêtera au niveau de la réponse utilisateur
                    <div ref={reactionRef} className="space-y-6 pt-2">
                        
                        {/* A. La réponse de l'utilisateur */}
                        <ChatBubble 
                            isUser={true} 
                            text={selectedChoice.responseText} 
                        />

                        {/* B. La réaction de l'IA */}
                        <ChatBubble 
                            isUser={false} 
                            text={selectedChoice.reactionText} 
                            senderName={scenarioToDisplay.characterName} 
                            avatarUrl={avatarUrl} 
                        />

                        {/* C. L'intervention du Coach */}
                        <FeedbackCoach 
                            analysis={
                                <>
                                    {selectedChoice.analysis}
                                    <br/><br/>
                                    <strong>Conséquence :</strong> {selectedChoice.consequence}
                                </>
                            } 
                            keyTakeaway={selectedChoice.keyTakeaway} 
                        />
                    </div>
                )}
            </ChatContainer>

            {/* ZONE D'INTERACTION (Les boutons) */}
     {/* ZONE D'INTERACTION (Les boutons) */}
            <div className="bg-white border-t border-gray-200 p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-20">
                
                {!selectedChoice ? (
                    // 1. On affiche la liste des choix
                    <ChoiceList 
                        choices={scenarioToDisplay.choices} 
                        onSelectChoice={setSelectedChoice} 
                    />
                ) : (
                    // 2. On affiche les actions de fin
                    <ActionControls 
                        onReplay={() => setSelectedChoice(null)} 
                    />
                )}
                
            </div>

        </div>
    )
}

export default ScenarioDetail;