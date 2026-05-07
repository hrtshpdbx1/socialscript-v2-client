// routes.jsx 
// Toutes les routes sont définies dans un seul fichier. Cela permet de modifier une URL à un seul endroit sans toucher aux composants.


import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ScenariosLanding from "./pages/ScenariosLanding"
import Resources from "./pages/Resources"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ScenarioDetail from "./pages/ScenarioDetail"
import ScenarioLayout from "./components/layout/ScenarioLayout"


/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'scenarios', element: <ScenariosLanding /> },
            { path: 'resources', element: <Resources /> },
            {
                path: 'auth',
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                ]
            },
            { path: "*", element: <NotFound /> },
        ]
    },
    {
        path: 'scenarios/play',
        element: <ScenarioLayout />   // menu de sélection
    },
    {
        path: 'scenarios/:id',
        element: <ScenarioLayout />,  // mode jeu
        children: [
            { index: true, element: <ScenarioDetail /> }
        ]
    },
]