// /scr/features/admin/components/AdminDashboard.jsx
import { useOutletContext } from "react-router-dom";

export default function AdminDashboard() {


    const { user } = useOutletContext();

    return (
        <div>
            <h2> Coucou {user.firstName}</h2>
            <p> Bienvenues sur ton espace modérateur </p>
            {/* Inserer ici composant "  " ->  .jsx */}

            {/* Inserer ici composant " "  -->  .jsx  */}
        </div>
    )
}

