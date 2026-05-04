// Header.jsx 

import { NavLink } from "react-router" // NavLink ajoute automatiquement une classe active sur le lien de la page courante

export const Header = () => {
    return (
        <header className="flex justify-between py-4 px-8 bg-secondary">
            <span className="font-bold text-xl text-primary">SocialScript</span>
            <nav className="flex items-center">
                <ul className="flex items-center gap-4 font-bold text-gray-800">
                    <li><NavLink to="/">Accueil</NavLink></li>
                    <li><NavLink to="/resources">Ressources</NavLink></li>
                    <li><NavLink to="/scenarios">Scenarios</NavLink></li>
                    <li><NavLink className="btn" to="/auth/login">Me Connecter</NavLink></li>
                    <li><NavLink className="btn-2" to="/auth/register">Créer un compte</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}


