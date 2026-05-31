import { useEffect, useState } from "react";
import { themeService } from "../../../services/theme.service";
import PendingItemCard from "./PendingItemCard";

// scr/features/admin/components/AdminTheme.jsx

export default function AdminTheme() {
 const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [theme, setTheme] = useState([]) // tableau vide pour empecher map de crasher


    useEffect(() => {
        const fetchTheme = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await themeService.getPending()
                setTheme(data.themes)

            } catch (err) {
                setError("Impossible de charger le theme. Veuillez réessayer.")
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchTheme()
    }, []) // appel au mount

    // handleApprove(id) 
    // Fonction pour valider un theme pending

    const handleApprove = async (id) => {
        try {
            //1. Appel API
            await themeService.update(id, { status: "approved" })
            //2. Retire le theme de la liste
            // remplace la liste par la liste filtrée, en gardant chaque s dont le _id n'est pas égal à id
            setTheme(theme.filter((s) => s._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    //handleReject(id) 
    // Fonction pour rejeter un theme pending
    const handleReject = async (id) => {
        try {
            //1. Appel API
            await themeService.reject(id)
            //2. Retire le theme de la liste
            // remplace la liste par la liste filtrée, en gardant chaque s dont le _id n'est pas égal à id
            setTheme(theme.filter((s) => s._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des thèmes...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;


    return (
        <div>
            {/*Liste des themes */}
            {theme.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-nunito">Aucun thème à modérer pour le moment.</p>
                </div>
            ) : (
                <div
                    className="flex flex-col gap-6"
                    role="list"
                    aria-label="Liste des scénarios"
                >

                    {theme.map((s) => (
                        <PendingItemCard
                            key={s._id}
                            theme={s}
                            onApprove={() => handleApprove(s._id)}
                            onReject={() => handleReject(s._id)}
                        />

                    ))}
                </div>)
            }
        </div>
    )
}