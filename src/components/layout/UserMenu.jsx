// src/components/layout/UserMenu.jsx
// Dropdown utilisateur : avatar-initiale + menu déroulant.
// Le contenu du menu s'adapte au rôle (user / moderator / admin).
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { LayoutDashboard, PlusCircle, LogOut, User } from "lucide-react";
import { userAtom, roleAtom, tokenAtom } from "../../atoms/auth.atom";
import Badge from "../ui/Badge";
import { getAvatarUrl } from "../../utils/avatar.utils";

export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const user = useAtomValue(userAtom);
    const role = useAtomValue(roleAtom);
    const setToken = useSetAtom(tokenAtom);
    const setUser = useSetAtom(userAtom);

    const canModerate = role === "admin" || role === "moderator";

    // Ferme le menu si on clique en dehors de lui
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        // Nettoyage : on retire l'écouteur quand le composant disparaît
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        setIsOpen(false);
    };

    // Classe commune pour chaque ligne du menu
    const itemClass = "flex items-center gap-3 px-4 py-2.5 text-gray-800 font-bold hover:bg-secondary transition-colors w-full text-left";

    if (!user) return null; // rien tant que le profil n'est pas chargé

    // Mappe le rôle vers un libellé lisible + une couleur de badge
    const roleBadge = {
        admin: { text: "Admin", color: "primary" },
        moderator: { text: "Modo", color: "accent" },
        user: { text: "Membre", color: "secondary" },
    };
    const currentBadge = roleBadge[role] || roleBadge.user;
    return (
        <div className="relative" ref={menuRef}>
            {/* Bouton avatar*/}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 bg-gray-50 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Menu utilisateur"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <img
                    src={getAvatarUrl(user.characterAvatarSeed || user._id)}
                    alt={`Avatar de ${user.firstName}`}
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Le dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">

                    {/* En-tête : identité */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                        <img
                            src={getAvatarUrl(user.characterAvatarSeed || user._id)}
                            alt=""
                            className="w-12 h-12 rounded-full border-2 border-primary/20 bg-gray-50 shrink-0"
                        />
                        <div className="flex flex-col items-start gap-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                            <Badge text={currentBadge.text} color={currentBadge.color} />
                        </div>
                    </div>

                    {/* Actions communes */}
                    <div className="py-1">
                        <NavLink to="/scenarios/create" onClick={() => setIsOpen(false)} className={itemClass}>
                            <PlusCircle size={18} strokeWidth={2.5} />
                            Créer un scénario
                        </NavLink>

                        <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={itemClass}>
                            <User size={18} strokeWidth={2.5} />
                            Mon profil
                        </NavLink>

                        {/* Lien modération : admin + modérateur */}
                        {canModerate && (
                            <NavLink to="/admin" onClick={() => setIsOpen(false)} className={itemClass}>
                                <LayoutDashboard size={18} strokeWidth={2.5} />
                                Espace modération
                            </NavLink>
                        )}
                    </div>

                    {/* Déconnexion */}
                    <div className="py-1 border-t border-gray-100">
                        <button onClick={handleLogout} className={`${itemClass} text-error hover:bg-error/10`}>
                            <LogOut size={18} strokeWidth={2.5} />
                            Se déconnecter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}