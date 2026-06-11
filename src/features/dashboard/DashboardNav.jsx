// src/features/dashboard/DashboardNav.jsx
import { NavLink } from "react-router";
import { LayoutDashboard, User, ArrowLeft } from "lucide-react";
import { getAvatarUrl } from "../../utils/avatar.utils";

export const DashboardNav = ({ user }) => {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-nunito font-bold transition-all duration-200 ${isActive
            ? "bg-white text-primary shadow-md scale-105"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`;

    const avatarUrl = getAvatarUrl(user?.characterAvatarSeed || user?._id);

    return (
        <aside className="w-64 min-h-screen bg-primary flex flex-col p-6 shadow-xl z-10">
            {/* En-tête : avatar + accueil + badge */}
            <div className="mb-10 text-center">
                {user && (
                    <img
                        src={avatarUrl}
                        alt={`Avatar de ${user.firstName}`}
                        className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-white/30 shadow-md bg-white/10"
                    />
                )}

                <p className="text-white/80 font-nunito text-sm">
                    Bienvenue 👋
                </p>
                {user && (
                    <p className="text-white font-bold font-nunito mb-3">
                        {user.firstName}
                    </p>
                )}

            </div>

            {/* Menu de navigation */}
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li>
                        <NavLink to="/dashboard" end className={linkClasses}>
                            <LayoutDashboard className="w-5 h-5" />
                            Vue d'ensemble
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className={linkClasses}>
                            <User className="w-5 h-5" />
                            Profil
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Bouton de retour au site */}
            <div className="mt-auto pt-8">
                <NavLink
                    to="/"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-black/20 text-white rounded-xl font-nunito font-bold hover:bg-black/30 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au site
                </NavLink>
            </div>
        </aside>
    );
};