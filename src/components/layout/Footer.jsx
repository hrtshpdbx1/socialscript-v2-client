import { NavLink } from "react-router";


export const Footer = () => {
    return (
        <footer className="bg-gray-900 py-10 px-8">
            <div className="max-w-7xl mx-auto">

                {/* Grille principale du footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Colonne 1 : Branding */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <img src="/logo_footer_desktop.png" alt="Logo" className="w-full max-w-56" />
                        </div>
                        <p className="text-gray-100 mt-1">Simulateur d'interactions sociales</p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div>
                        <h3 className="text-success font-bold mb-4">Navigation</h3>
                        <ul className="flex flex-col gap-2 text-gray-100">
                            <li><NavLink to="/" className="hover:text-primary transition-colors">Accueil</NavLink></li>
                            <li><NavLink to="/scenarios" className="hover:text-primary transition-colors">Scénarios interactifs</NavLink></li>
                            <li><NavLink to="/resources" className="hover:text-primary transition-colors">Ressources</NavLink></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Legal */}
                    <div>
                        <h3 className="text-success font-bold mb-4">Legal</h3>
                        <ul className="flex flex-col gap-2 text-gray-100">
                            <li><NavLink to="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</NavLink></li>
                            <li><NavLink to="/confidentialite" className="hover:text-primary transition-colors">Politique de confidentialité</NavLink></li>
                            <li><NavLink to="/accessibilite" className="hover:text-primary transition-colors">Accessibilité</NavLink></li>
                            <li><NavLink to="/contact" className="hover:text-primary transition-colors">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>

                {/* Ligne de séparation violette */}
                <hr className="border-primary border-t-2 opacity-80 mb-6" />

                {/* Mentions du bas */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-100 text-sm">
                    <p>© 2025 SocialScript — Tous droits réservés</p>
                    <p>Contact : <a href="mailto:info@socialscript.be" className="hover:text-primary transition-colors">lmoraldy.dev@gmail.com</a></p>
                </div>

            </div>
        </footer>
    );
};