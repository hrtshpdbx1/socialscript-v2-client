// src/components/AdminNav.jsx

import { NavLink } from "react-router-dom";
import { roleAtom } from "../../atoms/auth.atom";
import { useAtomValue } from "jotai";
import {
    LayoutDashboard,
    MessageSquare,
    Layers,
    Flag,
    BookOpen,
    Users,
    ArrowLeft
} from "lucide-react";
import Badge from "../../components/ui/Badge";


export const AdminNav = () => {
    const role = useAtomValue(roleAtom);

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-nunito font-bold transition-all duration-200 ${isActive
            ? "bg-white text-primary shadow-md scale-105"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <aside className="w-64 min-h-screen bg-primary flex flex-col p-6 shadow-xl z-10">

            {/* En-tête de la sidebar */}
            <div className="mb-10 text-center">
                {/* 💡 Le message de Bienvenue */}
                <p className="text-white/80 font-nunito mb-3">
                    Bienvenue👋
                </p>

                {/* Badge rôle */}
                <Badge text={role === 'admin' ? 'Administrateur' : 'Modérateur'}
                    color="white"
                    className="mb-4 font-nunito" />
                  
             
            </div>

            {/* Menu de navigation */}
            <nav className="flex-1">
                <ul className="flex flex-col gap-2">
                    <li>
                        <NavLink to="/admin" end className={linkClasses}>
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/scenarios" className={linkClasses}>
                            <MessageSquare className="w-5 h-5" />
                            Scénarios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/themes" className={linkClasses}>
                            <Layers className="w-5 h-5" />
                            Thèmes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/reports" className={linkClasses}>
                            <Flag className="w-5 h-5" />
                            Signalements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/resources" className={linkClasses}>
                            <BookOpen className="w-5 h-5" />
                            Ressources
                        </NavLink>
                    </li>

                    {/* Section réservée aux administrateurs purs */}
                    {role === 'admin' && (
                        <>
                            <div className="h-px bg-white/20 my-4 rounded-full"></div>
                            <li>
                                <NavLink to="/admin/users" className={linkClasses}>
                                    <Users className="w-5 h-5" />
                                    Utilisateurs
                                </NavLink>
                            </li>
                        </>
                    )}
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