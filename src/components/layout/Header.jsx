// Header.jsx 

import { NavLink } from "react-router" // NavLink ajoute automatiquement une classe active sur le lien de la page courante

import Button from "../ui/Button";
export const Header = () => {
    return (
        <header className="flex justify-between py-4 px-8 bg-background">
            <NavLink to="/"> <img src="/logo_header_desktop.png" alt="Logo" className="w-full max-w-56" /></NavLink>
            <nav className="flex items-center">
                <ul className="flex items-center gap-4  text-gray-800">
                    <li><NavLink to="/scenarios">Scenarios</NavLink></li>
                    <li><NavLink to="/resources">Ressources</NavLink></li>
                    <li>
                        <NavLink to="/auth/login"><Button variant="outline_primary" >Connexion</Button>
                        </NavLink>
                    </li>
                    <li><NavLink to="/auth/register">
                        <Button variant="primary">Créer un compte</Button>
                    </NavLink></li>

                </ul>
            </nav>
        </header>
    )
}


