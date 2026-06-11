// /scr/features/dashboard/components/MyScenarioList.jsx
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { ArrowRight } from "lucide-react";

// Libellés et couleurs des rôles
const ROLE_BADGE = {
    pending: { text: "En attente", color: "secondary" },
    approved: { text: "Approuvé", color: "accent" },
    rejected: { text: "Rejeté", color: "error" },
};


export default function MyScenarioList({ scenarios }) {
    // --- RENDU PRINCIPAL ---
    return (
        <div>
            {/* Condition A : Le tableau des scénarios est vide */}
            {scenarios.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    {/* Gérer le cas vide  */}
                    <p className="text-gray-500 font-nunito">Aucune proposition de scénario pour le moment</p>
                    <Button to="/scenarios/create">Créer un scénario</Button>
                </div>
            ) : (
                < div
                    className="flex flex-col gap-6"
                    role="list"
                    aria-label="Liste des scénarios"
                >
                    {/* Condition B : Le tableau contient des scénarios, on les boucle */}
                    {scenarios.map((s) => {
                        // On récupère le bon badge selon le statut.
                        const badge = ROLE_BADGE[s.status] || { text: "Inconnu", color: "gray" };

                        return (

                            <Card key={s._id} className="text-left">

                                <div className="flex items-center justify-between gap-4">
                                    {/* Titre et Badge */}
                                    <h3>{s.title}</h3>
                                    <Badge text={badge.text} color={badge.color} />
                                </div>

                                {/* Lien conditionnel */}
                                {/* si s.status === 'approved', afficher un lien, sinon rien.  */}
                                {s.status === 'approved' && (
                                    <div className="flex justify-end mt-2">
                                        <Button to={`/scenarios/${s._id}`} variant="ghost" className="!text-primary !px-2">
                                           Accéder au Scenario
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}