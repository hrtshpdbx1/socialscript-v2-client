// scr/features/dashboard/components/UserDashboard.jsx
import { useOutletContext } from "react-router-dom";

export default function UserDashboard() {

    const { user } = useOutletContext();

    return (
        <div>
            <h2> Coucou {user.firstName}</h2>
<p> Bienvenues sur ton profil </p>
            {/* Inserer ici composant "Mes scénarios proposés" -> MyScenarioList.jsx */}

            {/* Inserer ici composant "Mes stats"  --> MyStats.jsx  */}
        </div>
    )
}

