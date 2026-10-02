import { useState } from "react";
import { Hourglass, X } from "lucide-react";
import Badge from "../ui/Badge";


const STORAGE_KEY = "socialscript-beta-banner-dismissed";

function readDismissed() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

export default function BetaBanner({ feedbackUrl }) {
    const [isVisible, setIsVisible] = useState(() => !readDismissed());

    function handleDismiss() {
        setIsVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, "true");
        } catch {
            // Stockage indisponible : la bannière réapparaîtra au prochain chargement
        }
    }

    if (!isVisible) return null;

    return (
        <aside
            aria-label="Information sur la version bêta"
            className="relative overflow-hidden bg-primary text-white px-4 py-3.5 md:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 font-nunito"
        >
            
            <Badge text="Bêta" color="white" className="relative self-start sm:self-center" />

            <div className="relative flex-1 flex flex-col gap-0.5 pr-8 sm:pr-0">
                <p className="font-extrabold">
                    Bienvenue sur la bêta ! Certaines fonctionnalités arrivent bientôt.
                </p>
                <p className="flex items-start sm:items-center gap-1.5 text-[13px] text-white/85">

                    À la première connexion, le serveur peut mettre quelques dizaines de secondes à démarrer. Merci de votre patience.
                </p>
            </div>


            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Fermer le message sur la version bêta"
                className="absolute top-3 right-3 sm:static shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
                <X className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
        </aside>
    );
}
