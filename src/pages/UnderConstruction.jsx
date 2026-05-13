// src/pages/UnderConstruction.jsx
import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";

export default function UnderConstruction() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center bg-background animate-fade-in">

       
            <div className="relative mb-8">
                <img
                    src="https://media.tenor.com/X5ATMhUr7PgAAAAi/blu-zushi-cat.gif" 
                    alt="Loading"
                    className="w-56 h-56 md:w-64 md:h-64 object-contain drop-shadow-xl"
                />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-nunito mb-4">
                Chantier en cours
            </h1>


            <p className="text-lg text-gray-600 font-nunito max-w-lg mb-10 leading-relaxed">
                Cette fonctionnalité est en train d'être codée avec amour (et beaucoup de café ☕). Revenez très bientôt pour découvrir cette nouvelle page !
            </p>

            {/* Bouton de sortie */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <NavLink to="/">
                    <Button variant="primary" className="shadow-md px-8 py-3">
                        Retourner à l'accueil
                    </Button>
                </NavLink>

                <NavLink to="/scenarios">
                    <Button variant="ghost" className="text-gray-500 hover:text-primary">
                        Explorer les scénarios existants
                    </Button>
                </NavLink>
            </div>

        </div>
    );
}