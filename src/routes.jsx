// routes.jsx 
// Toutes les routes sont définies dans un seul fichier. Cela permet de modifier une URL à un seul endroit sans toucher aux composants.


import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ScenariosLanding from "./pages/ScenariosLanding"
import Resources from "./pages/Resources"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import ScenarioDetail from "./pages/ScenarioDetail"
import ScenarioLayout from "./components/layout/ScenarioLayout"
import { ProtectedPage } from "./components/ProtectedPage"
import CreateScenario from "./pages/CreateScenario"
import UnderConstruction from "./pages/UnderConstruction"


/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'scenarios',
                children: [
                    { index: true, element: <ScenariosLanding /> },
                    {
                        path: 'create',
                        element: (
                            <ProtectedPage>
                                <CreateScenario />
                            </ProtectedPage>
                        )
                    },
                ]
            },
            { path: 'resources', element: <Resources /> },
            { path: 'en-construction', element: <UnderConstruction /> },
            // Pour l'utiliser 
            // <NavLink to="/en-construction">
            //  <Button variant="primary">Espace Premium</Button>
            // </NavLink >

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

    // Route admin
    // {
    //     path: 'admin',
    //     element: (
    //         <ProtectedRole allowedRoles={['admin', 'moderator']}>
    //             <AdminLayout />
    //         </ProtectedRole>
    //     )
    // }

    // Route création de scénario (tout utilisateur connecté)
    // {
    //         path: 'scenarios/create',
    //         element: (
    //             <ProtectedPage>
    //                 <CreateScenario />
    //             </ProtectedPage>
    //         )
    //     }

]