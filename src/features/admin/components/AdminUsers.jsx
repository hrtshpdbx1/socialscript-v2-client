// src/features/admin/components/AdminUsers.jsx

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { userService } from "../../../services/user.service";
import AdminPageHeader from "./AdminPageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { getAvatarUrl } from "../../../utils/avatar.utils";

// Libellés et couleurs des rôles
const ROLE_BADGE = {
    user: { text: "Utilisateur", color: "secondary" },
    moderator: { text: "Modérateur", color: "accent" },
    admin: { text: "Admin", color: "primary" },
};

const ROLE_ORDER = { admin: 0, moderator: 1, user: 2 };

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await userService.getAllUsers();
                setUsers(data.users);
            } catch (err) {
                setError("Impossible de charger les utilisateurs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Changement de rôle (promotion / rétrogradation)
    const handleRoleChange = async (userId, newRole) => {
        try {
            await userService.updateUserRole(userId, newRole);
            // Mise à jour locale du rôle
            setUsers((prev) =>
                prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
            );
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des utilisateurs...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;

    const sortedUsers = [...users].sort(
        (a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]
    );

    return (
        <div className="space-y-8">
            <AdminPageHeader
                icon={Users}
                title="Utilisateurs"
                subtitle={`${users.length} compte${users.length > 1 ? "s" : ""} enregistré${users.length > 1 ? "s" : ""}`}
            />

            {users.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-nunito">Aucun utilisateur pour le moment.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4" role="list" aria-label="Liste des utilisateurs">
                    {sortedUsers.map((u) => {
                        const badge = ROLE_BADGE[u.role] ?? ROLE_BADGE.user;
                        const isAdmin = u.role === "admin";

                        return (
                            <Card key={u._id} className="text-left !p-4">
                                <div className="flex items-center justify-between gap-4 flex-wrap">

                                    {/* Identité : avatar + nom + email */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <img
                                                src={getAvatarUrl(u.characterAvatarSeed || u._id)}
                                                alt=""
                                                className="w-12 h-12 rounded-full border-2 border-primary/20 bg-gray-50 shrink-0"
                                            />
                                        </div>
                                       
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-sm text-gray-900 font-nunito">
                                                    {u.firstName} {u.lastName}
                                                </span>
                                                {/* <Badge text={badge.text} color={badge.color} /> */}
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{u.email}</p>
                                        </div>
                                    </div>

                                    {/* Contrôle de rôle */}
                                    {isAdmin ? (
                                        <span className="text-xs text-gray-400 italic">
                                            Rôle non modifiable
                                        </span>
                                    ) : (
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className="form-input bg-white w-auto text-sm"
                                            aria-label={`Modifier le rôle de ${u.firstName} ${u.lastName}`}
                                        >
                                            <option value="user">Utilisateur</option>
                                            <option value="moderator">Modérateur</option>
                                        </select>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}