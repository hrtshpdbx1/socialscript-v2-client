// routes.jsx 
// Toutes les routes sont définies dans un seul fichier. Cela permet de modifier une URL à un seul endroit sans toucher aux composants.

import App from "./App"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ScenariosLanding from "./features/scenarios/pages/ScenariosLanding"
import Resources from "./pages/Resources"
import { Login } from "./features/auth/pages/Login"
import { Register } from "./features/auth/pages/Register"
import ScenarioDetail from "./features/scenarios/pages/ScenarioDetail"
import ScenarioLayout from "./components/layout/ScenarioLayout"
import { ProtectedPage } from "./features/auth/guards/ProtectedPage"
import CreateScenario from "./features/scenarios/pages/CreateScenario"
import UnderConstruction from "./pages/UnderConstruction"
import AdminLayout from "./features/admin/AdminLayout"
import { ProtectedRole } from "./features/auth/guards/ProtectedRole"
import AdminScenario from "./features/admin/components/AdminScenarios"
import AdminTheme from "./features/admin/components/AdminTheme"
import AdminReports from "./features/admin/components/AdminReports"
import AdminResources from "./features/admin/components/AdminResources"
import AdminUsers from "./features/admin/components/AdminUsers"
import AdminDashboard from "./features/admin/components/AdminDashboard"
import Dashboard from "./features/dashboard/pages/Dashboard"
import UserProfile from "./features/dashboard/pages/UserProfile"
import DashboardLayout from "./features/dashboard/DashboardLayout"

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

            // Route Dashboard - (TOUS les connectés)
            {
                path: 'dashboard',
                element: (
                    <ProtectedPage>
                        <DashboardLayout />
                    </ProtectedPage>
                ),
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'profile', element: <UserProfile /> },
                ]
            },

            // Route admin (modo + admin uniquement)
            {
                path: 'admin',
                element: (
                    <ProtectedRole allowedRoles={['admin', 'moderator']}>
                        <AdminLayout />
                    </ProtectedRole>

                ),
                children: [
                    { index: true, element: <AdminDashboard /> },
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