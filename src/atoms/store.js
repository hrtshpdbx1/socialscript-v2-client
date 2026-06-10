import { createStore } from "jotai";
import { timeAtom } from "./auth.atom";

// Container qui contiendra les atoms
// - Connecter le store et l'app React (Provider → main.jsx)
// - Consommer les atoms depuis un service (hors React) via le store
export const store = createStore();


setInterval(() => {
    store.set(timeAtom, Date.now())
}, 60_000); 
// Determeine à quelle fréquence on demande « est-ce que le token est expiré ? »
//3000 = 30sec, 60 000 = 1min