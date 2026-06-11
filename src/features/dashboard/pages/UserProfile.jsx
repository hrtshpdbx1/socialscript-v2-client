// src/features/dashboard/pages/UserProfile.jsx
import { useState } from "react";
import { useOutletContext } from "react-router";
import AvatarSelector from "../../../components/ui/AvatarSelector";
import Button from "../../../components/ui/Button";
import { userService } from "../../../services/user.service";
import { getAvatarUrl } from "../../../utils/avatar.utils";

function UserProfile() {
    // On récupère le user chargé par DashboardLayout + sa fonction de maj
    const { user, updateUserState } = useOutletContext();

    // Le seed actuellement appliqué en BDD (notre référence de comparaison)
    const originalSeed = user?.characterAvatarSeed || user?._id;

    // Le seed sélectionné dans le selector (initialisé à l'actuel)
    const [selectedSeed, setSelectedSeed] = useState(originalSeed);

    // États du submit
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Y a-t-il vraiment un changement à sauvegarder ?
    const hasChanged = selectedSeed && selectedSeed !== originalSeed;

    const handleSave = async () => {
        setSaving(true);
        setSuccessMsg(null);
        setErrorMsg(null);

        try {
            const updatedUser = await userService.updateSelf({
                characterAvatarSeed: selectedSeed
            });
            // On met à jour le user dans le layout → la sidebar reflète le changement
            updateUserState(updatedUser);
            setSuccessMsg("Avatar mis à jour avec succès !");
        } catch (err) {
            console.error(err);
            setErrorMsg("Erreur lors de la mise à jour. Réessaie plus tard.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-nunito text-gray-900">
                   Modifier mon profil
                </h1>
               
            </header>

            {/* === Section Avatar === */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold font-nunito mb-4">Personnalisation de l'avatar</h2>

                {/* Avatar actuel */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <img src={getAvatarUrl(originalSeed)}
                        alt="Mon avatar actuel"
                        className="w-24 h-24 rounded-full border-4 border-primary/20 bg-gray-50"
                    />
                    <div>
                        <p className="font-nunito font-bold text-gray-900">Avatar actuel</p>
                        <p className="text-sm text-gray-500 font-nunito">
                           Choisir un nouveau visage ci-dessous, ou utiliser les dés pour en générer d'autres.
                        </p>
                    </div>
                </div>

                {/* Selector */}
                <AvatarSelector
                    value={selectedSeed}
                    onChange={setSelectedSeed}
                />

                {/* Feedback */}
                {successMsg && (
                    <p className="mt-4 text-success font-nunito font-bold">{successMsg}</p>
                )}
                {errorMsg && (
                    <p className="mt-4 text-error font-nunito font-bold">{errorMsg}</p>
                )}

                {/* Bouton sauvegarder */}
                <div className="mt-6 flex justify-end">
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={!hasChanged || saving}
                    >
                        {saving ? "Enregistrement..." : "Sauvegarder"}
                    </Button>
                </div>
            </section>

        </div>
    );
}

export default UserProfile;