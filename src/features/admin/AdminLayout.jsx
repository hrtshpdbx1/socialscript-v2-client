// src/components/AdminLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AdminNav } from "./AdminNav"
import { userService } from "../../services/user.service";


function AdminLayout() {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const data = await userService.getMe();
                    setUser(data);
                    console.log(data)
                } catch (err) {
                    console.error(err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }, []);


    if (loading) {
        return <div className="p-8 font-nunito">Chargement de ton espace...</div>;
    }
    if (error) {
        return <div className="p-8 text-error font-nunito">Erreur lors du chargement du profil.</div>;
    }

    
    return (
        <div className="flex min-h-screen min-w-full">
            <AdminNav user={user}/>
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <Outlet context={{ user }} />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout