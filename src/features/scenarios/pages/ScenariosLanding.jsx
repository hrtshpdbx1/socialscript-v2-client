// src/scenario/pages/ScenarioLanding.jsx

import { NavLink } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

export default function ScenariosLanding() {
  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* En-tête aligné à gauche */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-nunito mb-2">
              Centre d'entraînement
            </h1>
            <p className="text-gray-500 font-nunito max-w-xl">
              Choisissez un mode de jeu, créez vos propres situations ou aidez-nous à modérer la communauté.
            </p>
          </div>
        </div>

        {/* Grille d'actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

          {/* Carte principale  2 col*/}
          <div className="md:col-span-2 bg-primary rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden flex flex-col justify-between items-start">

            <div className="relative z-10 mb-8">
                 <Badge
                  text="Recommandé"
                  color="white"
                  className="mb-4 font-nunito"
                />

              <h2 className="text-3xl font-extrabold font-nunito mb-3">Simulation Guidée</h2>
              <p className="text-primary-50 max-w-md font-nunito leading-relaxed">
                Laissez-vous guider étape par étape. Choisissez votre niveau, un thème du quotidien, et entraînez-vous à répondre sans aucune pression.
              </p>
            </div>

            <NavLink to="/scenarios/play" className="relative z-10 w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto text-primary font-extrabold px-8 py-3 text-lg shadow-sm hover:-translate-y-1 transition-transform">
                Commencer l'entraînement
              </Button>
            </NavLink>
          </div>

          {/* Cartes secondaires  */}
          <div className="flex flex-col gap-6">

            {/* Carte Création  */}
            <div className="bg-success-200 rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col hover:shadow-md hover:border-success/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Badge
                  text="Connexion requise"
                  color="onSuccess"
                  className="mb-4 font-nunito"
                />
              </div>
              <h3 className="font-bold text-gray-900 font-nunito text-lg mb-2">Créer un scénario</h3>
              <p className="text-gray-500 text-sm font-nunito mb-4 flex-1 line-clamp-3">
                Inventez vos propres situations pour vous entraîner ou défier la communauté.
              </p>
              <NavLink to="/scenarios/create" className="text-success-600 font-bold text-sm font-nunito flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto w-fit">
                Créer maintenant <span aria-hidden="true">→</span>
              </NavLink>
            </div>

            {/* Carte Signalement */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm  flex-1 flex flex-col hover:shadow-md hover:border-error/30 transition-all group">
              <h3 className="font-bold text-gray-900 font-nunito text-lg mb-2">Signaler un problème</h3>
              <p className="text-gray-500 text-sm font-nunito mb-4 flex-1 line-clamp-3">
                Contenu offensant, situation irréaliste ou instructions peu claires ? Aidez-nous à modérer.
              </p>
              <NavLink to="/en-construction" className="text-rose-600 font-bold text-sm font-nunito flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto w-fit">
                Faire un rapport <span aria-hidden="true">→</span>
              </NavLink>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}