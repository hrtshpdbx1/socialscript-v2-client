// src/pages/ScenariosLanding.jsx

import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom"; // Attention: "-dom" est recommandé

export default function ScenariosLanding() {
  const navigate = useNavigate();

  return (
    // Le conteneur principal prend toute la place, on ajoute 'relative' et 'overflow-hidden' pour les effets de fond
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 md:py-20 bg-background relative overflow-hidden">

      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        
     
        <span className="bg-primary/10 text-primary font-extrabold px-4 py-1.5 rounded-full text-xs md:text-sm mb-6 uppercase tracking-widest font-nunito animate-fade-in-up">
          Simulateur interactif
        </span>


        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 font-nunito leading-tight animate-fade-in-up">
          Expérimentez les codes sociaux <br className="hidden md:block" />
          <span className="text-primary">sans aucune pression</span>
        </h1>

       
        <p className="text-base md:text-lg text-gray-600 font-nunito mb-10 max-w-2xl leading-relaxed animate-fade-in-up">
          Entraînez-vous à gérer des situations sociales courantes. Il n’y a ni piège, ni bonne ou mauvaise réponse, ni jugement : simplement un espace pour expérimenter et mieux comprendre les dynamiques sociales.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up">
          <Button 
            variant="accent"
            // On le rend un peu plus gros (py-4 px-8) avec un effet de survol
            className="text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
            onClick={() => navigate("/scenarios/play")}
          >
            <span>Commencer l'entraînement</span>
            <span className="text-2xl">🚀</span>
          </Button>
        </div>
      </div>

      {/* Cartes */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-20 md:mt-24 px-4 animate-fade-in-up">
        
        {/* Carte 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-success-200/50 text-success-600 rounded-full flex items-center justify-center text-2xl mb-4">
            🛡️
          </div>
          <h3 className="font-bold text-gray-900 font-nunito mb-2">100% Sans Jugement</h3>
          <p className="text-sm text-gray-500 font-nunito">Un espace sécurisant où vous pouvez tester vos réponses et vous tromper en toute sérénité.</p>
        </div>

        {/* Carte 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center text-2xl mb-4">
            💡
          </div>
          <h3 className="font-bold text-gray-900 font-nunito mb-2">Feedback Constructif</h3>
          <p className="text-sm text-gray-500 font-nunito">Recevez des analyses instantanées pour comprendre l'impact de vos mots sur votre interlocuteur.</p>
        </div>

        {/* Carte 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mb-4">
            🎭
          </div>
          <h3 className="font-bold text-gray-900 font-nunito mb-2">Situations du Quotidien</h3>
          <p className="text-sm text-gray-500 font-nunito">Du travail aux soirées entre amis, entraînez-vous sur des cas concrets de la vie réelle.</p>
        </div>

      </div>

    </div>
  );
}