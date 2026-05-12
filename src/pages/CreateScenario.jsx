// src/pages/CreateScenario.jsx

import { CreateScenarioForm } from "../components/CreateScenarioForm"; // Ajuste le chemin si besoin

export default function CreateScenario() {
    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up">
                
                {/* En-tête de la page */}
                <div className="mb-8 text-center">
                    <span className="bg-primary/10 text-primary font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-nunito mb-4 inline-block">
                        Espace Créateur
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-nunito mb-3">
                        Proposer un scénario
                    </h1>
                    <p className="text-gray-600 font-nunito max-w-2xl mx-auto">
                        Partagez vos propres mises en situation pour enrichir la plateforme. Votre scénario sera visible par la communauté.
                    </p>
                </div>

                {/* Le composant de formulaire  */}
                <CreateScenarioForm />
                
            </div>
        </div>
    );
}