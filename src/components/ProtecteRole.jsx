// components/ProtectedRole.jsx
// composant "enveloppe" qui vérifie si l'utilisateur a le bon rôle
// si oui -> affiche le contenu (les children)
// si non -> redirige vers la page de login

import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { tokenAtom } from '../atoms/auth.atom';

export function ProtectedRole({ children, allowedRoles }) {
    const token = useAtomValue(tokenAtom);

    // 1. Pas connecté → redirection login
    if (!token) {
        return <Navigate to='/auth/login' replace />
    }

    // 2. Décoder le payload du JWT
    const payload = JSON.parse(atob(token.split('.')[1]));

    // 3. Vérifier si le rôle est autorisé
    // les rôles autorisés viennent de la prop allowedRoles

    //    allowedRoles = ['admin', 'moderator']
    //    payload.role = 'user'
    if (!allowedRoles.includes(payload.role)) { 
        // si le rôle n'est PAS dans la liste des rôles autorisé
        return (
            <>
                <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
            </>
        );
    }

    // 4. Tout est bon
    return children;
}