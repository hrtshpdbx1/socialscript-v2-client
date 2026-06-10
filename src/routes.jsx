// routes.jsx 
// Toutes les routes sont définies dans un seul fichier. Cela permet de modifier une URL à un seul endroit sans toucher aux composants.

import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import UnderConstruction from "./pages/UnderConstruction"
import Resources from "./pages/Resources"

import { Login } from "./features/auth/pages/Login"
import { Register } from "./features/auth/pages/Register"

import { ProtectedPage } from "./features/auth/guards/ProtectedPage"
import { ProtectedRole } from "./features/auth/guards/ProtectedRole"

import ScenariosLanding from "./features/scenarios/pages/ScenariosLanding"
import ScenarioDetail from "./features/scenarios/pages/ScenarioDetail"
import ScenarioLayout from "./components/layout/ScenarioLayout"
import CreateScenario from "./features/scenarios/pages/CreateScenario"

import AdminLayout from "./features/admin/AdminLayout"
import AdminDashboard from "./features/admin/components/AdminDashboard"
import AdminUsers from "./features/admin/components/AdminUsers"

import AdminScenario from "./features/admin/components/AdminScenarios"
import AdminTheme from "./features/admin/components/AdminTheme"
import AdminReports from "./features/admin/components/AdminReports"
import AdminResources from "./features/admin/components/AdminResources"

import UserDashboard from "./features/dashboard/components/UserDasboard"
import UserLayout from "./features/dashboard/UserLayout"
import UserProfile from "./features/dashboard/pages/UserProfile"

/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
    {
        path: '/',
        element: <App />,    // * layout avec Header/Footer
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
                    {
                        path: ':id/edit',
                        element: (
                            <ProtectedRole allowedRoles={['admin']}>
                                <CreateScenario />
                            </ProtectedRole>
                        )
                    }
                ]
            },

            { path: 'resources', element: <Resources /> },

            //* ---- User Dashboard -----*
            {
                path: 'dashboard',
                element: (
                    <ProtectedPage>
                        <UserLayout />
                    </ProtectedPage>
                ),
                children: [
                    { 
                        index: true, 
                        element: <UserDashboard /> 
                    },

                    { 
                        path: 'profile', 
                        element: <UserProfile /> 
                    },
                ]
            },


            //* ---- Admin & Modo Dashboard -----*
            {
                path: 'admin',
                element: (
                    <ProtectedRole allowedRoles={['admin', 'moderator']}>
                        <AdminLayout />
                    </ProtectedRole>

                ),
                children: [
                    { 
                        index: true, 
                        element: <AdminDashboard /> 
                    },
                    {
                        path: 'scenarios',
                        element: <AdminScenario />
                    },
                    {
                        path: 'themes',
                        element: <AdminTheme />
                    },
                    {
                        path: 'reports',
                        element: <AdminReports />
                    },
                    {
                        path: 'resources',
                        element: <AdminResources />
                    },
                    {
                        path: 'users',
                        element: (
                            <ProtectedRole allowedRoles={['admin']}>
                                <AdminUsers />
                            </ProtectedRole>
                        )
                    }
                ]
            },

            // En construction
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
    //* Route top-level (mode focus sans Header/Footer) :
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
    }
]