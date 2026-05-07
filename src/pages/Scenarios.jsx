// Scenarios.jsx
import { useState } from "react"
import { difficultyService } from "../services/difficulty.service"
import Button from "../components/ui/Button"
import { themeService } from "../services/theme.service"
import { scenarioService } from "../services/scenario.service"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"




export const Scenarios = () => {

  // * 1. Initialisation des states
  const [difficulties, setDifficulties] = useState([])
  const [themes, setThemes] = useState([])
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // State pour la difficulté/thème sélectionné 
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [selectedScenario, setSelectedScenario] = useState(null)

  // * 2. Fonctions de récupération des données

  // * SHOW DIFFICULTY 
  async function showDifficulty() {
    setLoading(true)
    setError(null) // On réinitialise l'erreur à chaque tentative

    try {
      // appeler le service 
      const data = await difficultyService.getAll()
      console.log("data reçue :", data)
      setDifficulties(data.difficulties)
    }

    catch (err) {
      setError("Impossible de charger les difficultés. Veuillez réessayer.")
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  };

  // * SHOWTHEME
  // ⚠️
  // setSelectedTheme --> pour stocker le thème que l'utilisateur cliquera ensuite.
  // setThemes -->  pour stocker la liste reçue de l'API

  async function showTheme(difficultyId) {
    setLoading(true)
    setError(null)
    setThemes([]) // nettoyer l'affichage
    setSelectedTheme(null)

    try {
      // appeler le service 
      const data = await themeService.getByDifficulty(difficultyId)
      console.log("difficultyId envoyé:", difficultyId)
      console.log("URL complète:", `/difficulties/${difficultyId}/themes`)
      setThemes(data.themes)
    }

    catch (err) {
      setError("Impossible de charger les thèmes. Veuillez réessayer.")
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  };

  // * SHOW SCENARIO 
  async function showScenario(themeId) {
    setLoading(true)
    setError(null)
    setScenarios([])
    setSelectedScenario(null)

    try {
      console.log("selectedDifficulty:", selectedDifficulty)
      console.log("themeId reçu:", themeId)
     
      const data = await scenarioService.getByTheme(selectedDifficulty, themeId)
      console.log("scenarios data:", data)
      setScenarios(data.scenarios)
    }

    catch (err) {
      setError("Impossible de charger le scénario. Veuillez réessayer.")
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  };

  // Fonction utilitaire pour mapper le titre à la couleur du badge
  const getDifficultyColor = (title) => {
    const t = title.toLowerCase();
    if (t.includes('facile')) return 'success';
    if (t.includes('moyen') || t.includes('intermédiaire')) return 'accent';
    if (t.includes('difficile')) return 'error'; // ou une couleur "error" si tu en as une
    return 'primary';
  };


  // * 3. Rendu conditionnel
  return (
    <>
      <div className="flex flex-col items-center justify-evenly min-h-[70vh] px-4 text-center bg-background " >
        <h2 className="text-3xl md:text-2xl text-gray-700 font-nunito mb-2 max-w-6xl">Entraînez-vous à gérer des situations sociales courantes et observez comment différentes manières de répondre peuvent être perçues. Il n’y a ni piège, ni bonne ou mauvaise réponse, ni jugement, simplement un espace pour expérimenter, prendre du recul et mieux comprendre les dynamiques sociales.</h2>
        <p className="font-extrabold text-2xl max-w-6xl">Choissisez un niveau de difficulté et un thème.</p>



        {/* Bouton pour lancer l'appel */}
        {/* affiché seulement si on n'a pas encore de difficultés dans le tableau */}
        {difficulties.length === 0 && (
          <Button
            variant="accent"
            onClick={showDifficulty}
            disabled={loading}>
            {loading ? "Chargement..." : "Commencer l'entraînement"}
          </Button>
        )}

        {/* Une fois que le tableau contient des éléments, le bouton disparaît et on affiche les boutons de difficulté à la place */}
        {!selectedDifficulty && difficulties.length > 0 && (
          <div className="difficulty-selector space-y-4">
            <h4 className="text-xl font-bold">Choisissez un niveau :</h4>
            <div className="flex gap-4 justify-center">
            {difficulties.map((difficulty) => (
              <Button
                variant="outline_primary"
                key={difficulty._id}
                onClick={() => {
                  setSelectedDifficulty(difficulty._id)
                  showTheme(difficulty._id)
                }}>
                {difficulty.title}
              </Button>

            ))}
          </div>
          </div>
        )}

        {/* 2. Message et Badge difficulté choisie : Affiché seulement si une difficulté est sélectionnée */}
        {selectedDifficulty && (
          <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Difficulté choisie :</p>

            <Badge
              text={difficulties.find(d => d._id === selectedDifficulty)?.title}
              color={getDifficultyColor(difficulties.find(d => d._id === selectedDifficulty)?.title || "")}
            />

            <Button
              variant="outline"
              className="text-xs"
              onClick={() => {
                setSelectedDifficulty(null);
                setThemes([]);    // On vide les thèmes pour revenir à zéro
                setScenarios([]); // On vide les scénarios aussi
              }}
            >
              Modifier le niveau
            </Button>
          </div>
        )}

        {selectedDifficulty && themes.length > 0 && (
          <div className="theme-selector animate-in fade-in duration-500">
            <h4 className="text-xl font-bold mb-4">Choisissez un thème :</h4>
            <div className="flex flex-wrap gap-4 justify-center">
            {themes.map((theme) => (
              <Button
                variant="accent"
                key={theme._id}
                onClick={() => {
                  setSelectedTheme(theme._id)
                  showScenario(theme._id)
                }}>
                {theme.title}
                {/*  ici il faudra aussi récupérer = context, characterName, characterDialogue, characterAvatarSeed, choices */}
              </Button>

            ))}
          </div>
          </div>
        )}

        {scenarios.length > 0 && (
          <div>
            {scenarios.map((scenario) => (
            <Card
                key={scenario._id}> 
              {scenario.title}
              {scenario.context}
            </Card>
            ))}
          </div>
        )}




        {/* Affichage de l'erreur */}
        {error && <p style={{ color: 'red' }}>{error}</p>}


      

      </div>

    </>

  )
}

export default Scenarios


// return (< ul >
//   {
//     difficulties.map(difficulty =>
//       <li key={difficulty}>{difficulty}</li>
//     )}
// </ul >)