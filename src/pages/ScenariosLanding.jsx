// Scenarios.jsx
import { useState } from "react"
import Button from "../components/ui/Button"
import { useNavigate } from "react-router"

export const ScenariosLanding = () => {

  // * 1. Initialisation des states
  const navigate = useNavigate()


  // * Rendu conditionnel
  return (
    <>
      <div className="flex flex-col items-center justify-evenly min-h-[70vh] px-4 text-center bg-background " >
        <h2 className="text-3xl md:text-2xl text-gray-700 font-nunito mb-2 max-w-6xl">Entraînez-vous à gérer des situations sociales courantes et observez comment différentes manières de répondre peuvent être perçues. Il n’y a ni piège, ni bonne ou mauvaise réponse, ni jugement, simplement un espace pour expérimenter, prendre du recul et mieux comprendre les dynamiques sociales.</h2>
        <p className="font-extrabold text-2xl max-w-6xl">Choissisez un niveau de difficulté et un thème.</p>

<Button variant="accent"
onClick={() => navigate("/scenarios/play")}> Commencer l'entraînement</Button>
      </div>
    </>

  )
}

export default ScenariosLanding

