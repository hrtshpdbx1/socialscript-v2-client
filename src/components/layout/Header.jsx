import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";
import Button from "../ui/Button";
import { isAuthAtom, roleAtom, userAtom } from "../../atoms/auth.atom";
import { userService } from "../../services/user.service";
import { UserMenu } from "./UserMenu";
import { BtnLogout } from '../../features/auth/components/BtnLogout';
import { getAvatarUrl } from "../../utils/avatar.utils";


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isConnect = useAtomValue(isAuthAtom);
    const user = useAtomValue(userAtom);
    const setUser = useSetAtom(userAtom);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Récupère le profil dès qu'on est connecté ; vide l'atom si déconnecté.
    useEffect(() => {
        if (isConnect) {
            userService.getMe()
                .then(setUser)
                .catch((err) => console.error("Impossible de charger le profil :", err));
        } else {
            setUser(null);
        }
    }, [isConnect, setUser]);


    return (
        <header className="relative flex justify-between items-center py-4 px-4 md:px-8 bg-background shadow-md z-50">

            {/* LOGO */}
            <NavLink to="/" onClick={closeMenu} className="flex items-center">
                <img src="/logo_mobile.png" alt="Logo SocialScript" className="w-auto h-10 md:hidden" />
                <img src="/logo_header_desktop.png" alt="Logo SocialScript" className="hidden md:block w-full max-w-56" />
            </NavLink>

            {/* ====== NAVIGATION DESKTOP ====== */}
            <nav className="hidden md:flex items-center">
                <ul className="flex items-center gap-4 text-gray-800 font-bold">
                    <li>
                        <NavLink to="/scenarios"
                            className={({ isActive }) => isActive
                                ? "text-primary font-extrabold border-b-2 border-primary pb-0.5"
                                : "text-gray-800 font-bold hover:text-primary transition-colors"}>
                            Scénarios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/resources"
                            className={({ isActive }) => isActive
                                ? "text-primary font-extrabold border-b-2 border-primary pb-0.5"
                                : "text-gray-800 font-bold hover:text-primary transition-colors"}>
                            Ressources
                        </NavLink>
                    </li>
                    <li>
                        {!isConnect ? (
                            <div className="flex flex-row gap-2">
                                <NavLink to="/auth/login">
                                    <Button variant="outline_primary">Connexion</Button>
                                </NavLink>
                                <NavLink to="/auth/register">
                                    <Button variant="primary">Créer un compte</Button>
                                </NavLink>
                            </div>
                        ) : (
                            <UserMenu />
                        )}
                    </li>
                </ul>
            </nav>

            {/* ====== BOUTON HAMBURGER MOBILE ====== */}
            <button className="md:hidden text-primary focus:outline-none" onClick={toggleMenu} aria-label="Ouvrir le menu">
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {/* ====== MENU DÉROULANT MOBILE ====== */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-background shadow-lg border-t border-gray-200 flex flex-col items-center gap-6 py-8 md:hidden">

                    {/* Touche d'identité mobile */}
                    {isConnect && user && (
                        <div className="flex items-center gap-3">
                            <img
                                src={getAvatarUrl(user.characterAvatarSeed || user._id)}
                                alt={`Avatar de ${user.firstName}`}
                                className="w-12 h-12 rounded-full border-2 border-primary/30 bg-gray-50"
                            />
                            <span className="font-bold text-gray-800 text-lg">{user.firstName}</span>
                        </div>
                    )}

                    <NavLink to="/scenarios" onClick={closeMenu} className="text-xl font-bold text-gray-800 hover:text-primary">
                        Scénarios
                    </NavLink>
                    <NavLink to="/resources" onClick={closeMenu} className="text-xl font-bold text-gray-800 hover:text-primary">
                        Ressources
                    </NavLink>


                    {!isConnect ? (
                        <div className="flex flex-col gap-4 mt-4 w-3/4">
                            <NavLink to="/auth/login" onClick={closeMenu} className="w-full flex">
                                <Button variant="outline_primary" className="w-full">Connexion</Button>
                            </NavLink>
                            <NavLink to="/auth/register" onClick={closeMenu} className="w-full flex">
                                <Button variant="primary" className="w-full">Créer un compte</Button>
                            </NavLink>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <BtnLogout />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};