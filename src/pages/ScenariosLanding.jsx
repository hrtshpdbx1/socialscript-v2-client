// src/pages/ScenariosLanding.jsx

import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lightbulb, Drama, Sparkles } from "lucide-react";

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
    
            className="text-lg px-8 py-4 shadow-lg   flex items-center gap-3"
            onClick={() => navigate("/scenarios/play")}
          >
            <span>Commencer l'entraînement</span>
            <span className="text-2xl">🚀</span>
          </Button>
        </div>
      </div>

{/* CARTES :  */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mt-20 md:mt-24 px-4 animate-fade-in-up">
        
        {/* CARTE 1 */}
        <div className="group relative bg-white p-8 pt-10 rounded-[2rem] overflow-hidden flex flex-col text-left hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 min-h-[300px]">
          {/* Halo de couleur subtil en fond */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-500"></div>
          
      
          <div className="relative w-14 h-14 mb-8">
            <div className="absolute inset-0 bg-indigo-100 rounded-2xl -rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <ShieldCheck className="w-7 h-7 text-indigo-600" />
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-indigo-400 animate-pulse" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="font-extrabold text-2xl text-gray-900 font-nunito mb-3">100% Sans Jugement</h3>
            <p className="text-gray-600 font-nunito leading-relaxed text-base">
              Un espace sécurisant où vous pouvez tester vos réponses et vous tromper en toute sérénité.
            </p>
          </div>
        </div>

        {/* CARTE 2 */}
        <div className="group relative bg-white p-8 pt-10 rounded-[2rem] overflow-hidden flex flex-col text-left hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 min-h-[300px]">
          {/* Halo de couleur subtil en fond */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>

          <div className="relative w-14 h-14 mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full rotate-12 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Lightbulb className="w-7 h-7 text-primary" />
              <Sparkles className="absolute bottom-0 -left-2 w-4 h-4 text-primary/60 animate-pulse" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="font-extrabold text-2xl text-gray-900 font-nunito mb-3">Feedback Constructif</h3>
            <p className="text-gray-600 font-nunito leading-relaxed text-base">
              Recevez des analyses instantanées pour comprendre l'impact de vos mots sur votre interlocuteur.
            </p>
          </div>
        </div>

        {/* CARTE 3  */}
        <div className="group relative bg-white p-8 pt-10 rounded-[2rem] overflow-hidden flex flex-col text-left hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 min-h-[300px]">
          {/* Halo de couleur subtil en fond */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-50 rounded-full blur-3xl group-hover:bg-amber-100 transition-colors duration-500"></div>

          {/* Icône "Sticker" hybride */}
          <div className="relative w-14 h-14 mb-8">
            <div className="absolute inset-0 bg-amber-100 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Drama className="w-7 h-7 text-amber-600" />
              <Sparkles className="absolute -top-1 -right-3 w-5 h-5 text-amber-500 animate-pulse" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="font-extrabold text-2xl text-gray-900 font-nunito mb-3">Situations du Quotidien</h3>
            <p className="text-gray-600 font-nunito leading-relaxed text-base">
              Du travail aux soirées entre amis, entraînez-vous sur des cas concrets de la vie réelle.
            </p>
          </div>
        </div>

      </div>
      </div>
  );
}