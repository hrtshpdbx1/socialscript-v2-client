// Scenarios.jsx
import { useState } from "react"
import { difficultyService } from "../services/difficulty.service"
import Button from "../components/ui/Button"


//todo
//  Créer un state difficulties (tableau vide au départ)
//  Créer un state loading(true au départ)
//  Créer un state error(null au départ)

//  Au montage du composant, appeler difficultyService.getAll()
//  Stocker le résultat dans le state difficulties
//  Gérer le loading(false quand c'est fini)
//  Gérer l'error si l'appel échoue

//  Si loading → afficher "Chargement..."
//  Si error → afficher le message d'erreur
//  Si data → afficher un bouton par difficulté

//  Créer un state pour la difficulté sélectionnée
//  Créer un state pour les thèmes
//  Au clic sur un bouton → appeler themeService.getByDifficulty(id)
//  Afficher les thèmes en dessous


export const Scenarios = ()  => {
  // * 1. Initialisation des states
  const [difficulties, setDifficulties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // State pour la difficulté sélectionnée 
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  // * 2. Logique de récupération des données
  async function showDifficulty() {
    setLoading(true)
    setError(null) // On réinitialise l'erreur à chaque tentative

    try {
      // appeler le service 
      const data = await difficultyService.getAll()
      setDifficulties(data) }

    catch (err) { 
      setError("Impossible de charger les difficultés. Veuillez réessayer.")
      console.error(err)
    }
    finally { 
      setLoading(false) 
    }
  }
  // * 3. Rendu conditionnel
  return (
<>
      <h2>Scenarios</h2>
      <h3>Entraînez-vous à gérer des situations sociales courantes et observez comment différentes manières de répondre peuvent être perçues.</h3>
      <p>Il n’y a ni piège, ni bonne ou mauvaise réponse, ni jugement — simplement un espace pour expérimenter, prendre du recul et mieux comprendre les dynamiques sociales.</p>

      <p>Choissisez un niveau de difficulté et un thème.</p>
     
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

      {/* Une fois que le tableau contient des éléments, le bouton disparaît 
    et on affiche les boutons de difficulté à la place */}
      {difficulties.length > 0 && (
        <div className="difficulty-selector">
          <h4>Choisissez un niveau :</h4>
          {difficulties.map((difficulty) => (
            <Button 
              variant="outline_primary"  
            key={difficulty._id} 
            onClick={() => setSelectedDifficulty(difficulty._id)} >
              {difficulty.title}
            </Button>
            
          ))}
        </div>
      )}

      {/* Affichage de l'erreur */}
      {error && <p style={{ color: 'red' }}>{error}</p>}


      {/* Message si une difficulté est sélectionnée */}
      {selectedDifficulty && (
        <p>Difficulté choisie : {selectedDifficulty}</p>
      )}

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