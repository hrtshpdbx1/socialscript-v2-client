// /scr/features/admin/components/AdminScenarios.jsx


import { useEffect, useState } from "react"
import { scenarioService } from "../../../services/scenario.service"
import PendingItemCard from "./PendingItemCard"
import { MessageSquare } from "lucide-react";
import AdminPageHeader from "./AdminPageHeader";


export default function AdminScenario() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [scenario, setScenario] = useState([]) // tableau vide pour empecher map de crasher


    useEffect(() => {
        const fetchScenario = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await scenarioService.getPending()
                setScenario(data.scenarios)

            } catch (err) {
                setError("Impossible de charger le scenario. Veuillez réessayer.")
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchScenario()
    }, []) // appel au mount

    // handleApprove(id) 
    // Fonction pour valider un scenario pending

    const handleApprove = async (id) => {
        try {
            //1. Appel API
            await scenarioService.update(id, { status: "approved" })
            //2. Retire le scenario de la liste
            // remplace la liste par la liste filtrée, en gardant chaque s dont le _id n'est pas égal à id
            setScenario(scenario.filter((s) => s._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    //handleReject(id) 
    // Fonction pour rejeter un scenario pending
    const handleReject = async (id) => {
        try {
            //1. Appel API
            await scenarioService.reject(id)
            //2. Retire le scenario de la liste
            // remplace la liste par la liste filtrée, en gardant chaque s dont le _id n'est pas égal à id
            setScenario(scenario.filter((s) => s._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des scénarios...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;


    return (
        <div>
             <AdminPageHeader
            icon={MessageSquare}
            title="Scénarios"
            subtitle={`${scenario.length} en attente de validation`}
        />

            {/*Liste des scenarios */}
            {scenario.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-nunito">Aucun scénario à modérer pour le moment.</p>
                </div>
            ) : (
                <div
                    className="flex flex-col gap-6"
                    role="list"
                    aria-label="Liste des scénarios"
                >

                    {scenario.map((s) => (
                        <PendingItemCard
                            key={s._id}
                            scenario={s}
                            onApprove={() => handleApprove(s._id)}
                            onReject={() => handleReject(s._id)}
                        />

                    ))}
                </div>)
            }
        </div>
    )

}





