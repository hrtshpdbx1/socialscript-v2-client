import { useEffect, useState } from "react";
import { themeService } from "../../../services/theme.service";
import PendingThemeCard from "../components/PendingThemeCard";
import { Layers } from "lucide-react";
import AdminPageHeader from "./AdminPageHeader";
// scr/features/admin/components/AdminTheme.jsx

export default function AdminTheme() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [themes, setThemes] = useState([]) // tableau vide pour empecher map de crasher


    useEffect(() => {
        const fetchTheme = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await themeService.getPending()
                setThemes(data.themes)

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

    const handleApprove = async (themeId) => {
        await themeService.approveTheme(themeId, { status: "approved" });
        setThemes((prev) => prev.filter((t) => t._id !== themeId)); // retire l'item validé de la liste
    };


    //handleReject(id) 
    // Fonction pour rejeter un theme pending

    const handleReject = async (themeId) => {
        await themeService.approveTheme(themeId, { status: "rejected" });
        setThemes((prev) => prev.filter((t) => t._id !== themeId));
    };
    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des thèmes...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;


    return (
        <div>
             {/* Header  */}
            <AdminPageHeader
                icon={Layers}
                title="Thèmes"
                subtitle={`${themes.length} en attente de validation`}
            />

            {/*Liste des themes */}
            {themes.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-nunito">Aucun thème à modérer pour le moment.</p>
                </div>
            ) : (
                <div
                    className="flex flex-col gap-6"
                    role="list"
                    aria-label="Liste des thèmes"
                >

                    {themes.map((t) => (
                        <PendingThemeCard
                            key={t._id}
                            theme={t}
                            onApprove={() => handleApprove(t._id)}
                            onReject={() => handleReject(t._id)}
                        />
                    ))}
                </div>)
            }
        </div>
    )
}