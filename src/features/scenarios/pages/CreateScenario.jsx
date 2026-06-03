// src/scenario/pages/CreateScenario.jsx

import { CreateScenarioForm } from "../components/CreateScenarioForm";
import Badge from '../../../components/ui/Badge';

export default function CreateScenario() {
    return (
        <div className="min-h-screen bg-background py-4 px-4">
            <div className="max-w-4xl mx-auto bg-white pt-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up">

                {/* En-tête de la page */}
                <div className="text-center">
                 <Badge 
                        text="Espace Créateur" 
                        color="primary" 
                        className="mb-4 font-nunito" 
                    />
                </div>

                {/* Le composant de formulaire  */}
                <CreateScenarioForm />

            </div>
        </div>
    );
}