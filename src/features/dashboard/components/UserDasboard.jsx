// scr/features/dashboard/components/UserDashboard.jsx
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { scenarioService } from "../../../services/scenario.service";
import { getAvatarUrl } from "../../../utils/avatar.utils";
import MyScenarioList from "./MyScenariosList";
import MyStats from "./MyStats";

export default function UserDashboard() {
    const { user } = useOutletContext();
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScenarios = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await scenarioService.getByAuthor(user._id);
                setScenarios(data.scenarios);
            } catch (err) {
                setError("Impossible de charger les scénarios.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchScenarios();
    }, [user._id]);

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

      const avatarUrl = getAvatarUrl(user?.characterAvatarSeed || user?._id);

    return (
             <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1 pb-6 border-b border-primary/20">
                <h1 className="text-3xl font-bold font-nunito text-gray-900">
                  Mon espace
                </h1>
                <p className="text-gray-700 font-nunito">
                 Aperçu de l'activité
                </p>
            </div>

            {/* === Informations personnelles === */}
            <section>
                <h2 className="font-bold text-lg font-nunito mb-4 text-primary-700">Mes informations</h2>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                    <img
                        src={avatarUrl}
                        alt="Mon avatar"
                        className="w-20 h-20 rounded-full border-4 border-primary/20 bg-gray-50 shrink-0"
                    />
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 flex-1">
                        <div>
                            <dt className="text-sm text-gray-500 font-nunito">Prénom</dt>
                            <dd className="font-nunito">{user?.firstName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500 font-nunito">Nom</dt>
                            <dd className="font-nunito">{user?.lastName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500 font-nunito">Email</dt>
                            <dd className="font-nunito">{user?.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500 font-nunito">Rôle</dt>
                            <dd className="font-nunito capitalize">{user?.role}</dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* === Statistiques === */}
            <section>
                <h2 className="font-bold text-lg font-nunito mb-4 text-primary-700">Mes statistiques</h2>
                <MyStats scenarios={scenarios} />
            </section>

            {/* === Scénarios === */}
            <section>
                <h2 className="font-bold text-lg font-nunito mb-4 text-primary-700">Mes propositions de scénarios</h2>
                <MyScenarioList scenarios={scenarios} />
            </section>
        </div>
    );
}