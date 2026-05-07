// /pages/ScenarioDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { scenarioService } from "../services/scenario.service";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// CONFIGURATION DES AVATARS (API DICEBEAR)
// ========================================
function getAvatarUrl(seed) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`
}
    
// APPEL DES SCENARIOS
// ========================================
function ScenarioDetail() {
    const { id } = useParams()
    // on récupère l'id dynamique (ex :localhost:5173/scenarios/123a, {id} : 123a)

    // Déclaration variable état
    const [scenarioToDisplay, setScenarioToDisplay] = useState(null) // pas de valeur initiale 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedChoice, setSelectedChoice] = useState(null)

    useEffect(() => {
        const fetchScenario = async () => {
            setLoading(true)
            setError(null) // On réinitialise l'erreur à chaque tentative
            try {
                const data = await scenarioService.getById(id)
                setScenarioToDisplay(data)
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

    }, [id]); // Si 'id' change, useEffect se relance

    // On mémorise l'avatar pour éviter qu'il ne change au clic sur une réponse
    // useMemo "sauvegarde" le résultat et ne le recalcule QUE SI scenarioToDisplay change.
    const avatarUrl = scenarioToDisplay 
    ? getAvatarUrl(scenarioToDisplay.characterAvatarSeed) 
    : null

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>
    if (!scenarioToDisplay) return null

    return <>
        <h1>{scenarioToDisplay.title}</h1>
        <p>{scenarioToDisplay.context}</p>

        {/* Zone de l'interlocuteur */}
        <div className="flex items-center gap-4 my-4">
            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt={`Avatar de ${scenarioToDisplay.characterName}`}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                />
            )}
            <div>
                <p><strong>{scenarioToDisplay.characterName} : </strong></p>
                <p>"{scenarioToDisplay.characterDialogue}"</p>
            </div>
        </div>

        {/* Zone des choix possibles */}
        <div className="flex flex-wrap gap-4 justify-center">
            {scenarioToDisplay.choices.map((choice) => (
                <Button
                    variant="outline_primary"
                    key={choice._id}
                    onClick={() => setSelectedChoice(choice)
                    }>
                    {choice.responseText}
                </Button>
            ))}
        </div>

        {/* Zone de Feedback (Résultats) */}
        {selectedChoice && <div className="flex flex-wrap gap-4 justify-center">
            <p> Reaction : {selectedChoice.reactionText}</p>
            <Card>
                <h2> Analyse : </h2>
                {selectedChoice.analysis}
            </Card>
            <Card>
                <h2> Conséquence : </h2>
                {selectedChoice.consequence}
            </Card>
            <Card>
                <h2> A retenir : </h2>
                {selectedChoice.keyTakeaway}
            </Card>
        </div>
        }
    </>
}
export default ScenarioDetail