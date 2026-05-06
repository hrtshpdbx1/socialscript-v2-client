// src/pages/NotFound.jsx
import { NavLink } from "react-router-dom"; // ou "react-router" selon tes imports
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-background">

      {/* 😿 */}
      <img
        src="/illustrations/cryingcatpixel.png"
        alt="Petit chat pixelisé qui pleure"
        // drop-shadow + flottement doux
        className="w-48 h-48 md:w-56 md:h-56 object-contain mb-8 drop-shadow-md hover:scale-105 transition-transform duration-300"
      />

      <h1 className="text-6xl md:text-8xl font-extrabold text-primary font-nunito mb-2 drop-shadow-sm">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-nunito mb-4">
        Oups... Cette page s'est égarée.
      </h2>

      <p className="text-lg text-gray-600 font-nunito max-w-lg mb-10 leading-relaxed">
        Il semblerait que la page que vous cherchez n'existe pas (ou pas encore !). Pas de panique, on peut toujours revenir en lieu sûr.
      </p>

      {/* Le bouton de sauvetage */}
      <NavLink to="/">
        <Button variant="primary" className="shadow-sm">
          Retourner à l'accueil
        </Button>
      </NavLink>

    </div>
  );
}