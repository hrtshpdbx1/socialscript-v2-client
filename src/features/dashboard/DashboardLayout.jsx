// src/features/dashboard/DashboardLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { DashboardNav } from "./DashboardNav";
import { userService } from "../../services/user.service";

function DashboardLayout() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getMe();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Permet aux pages enfants (UserProfile) de mettre à jour
    // le user dans le layout après une modification
    const updateUserState = (newUser) => setUser(newUser);

    if (loading) {
        return <div className="p-8 font-nunito">Chargement de ton espace...</div>;
    }
    if (error) {
        return <div className="p-8 text-error font-nunito">Erreur lors du chargement du profil.</div>;
    }

    return (
        <div className="flex min-h-screen min-w-full">
            <DashboardNav user={user} />
            <main className="flex-1 p-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <Outlet context={{ user, updateUserState }} />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;