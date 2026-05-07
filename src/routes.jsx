// routes.jsx 
// Toutes les routes sont définies dans un seul fichier. Cela permet de modifier une URL à un seul endroit sans toucher aux composants.


import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Scenarios from "./pages/Scenarios"
import Resources from "./pages/Resources"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ScenarioDetail from "./pages/ScenarioDetail"


/** @type {import('react-router-dom').RouteObject[]} */

export const routes = [
    {
        path: '/',
        element: <App />,        // layout global
        children: [
            { index: true, element: <Home /> }, // index: true = désigne la route affichée par défaut = /
            { path: 'scenarios', element: <Scenarios /> },
            { path: 'scenarios/:id', element: <ScenarioDetail /> },
            { path: 'resources', element: <Resources /> },
            {
                path: 'auth',
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ]
            },
            {
                path: "*", // widlcard capture toutes les URLs non reconnues
                element: <NotFound />,
            },
            
        ]
    }
]