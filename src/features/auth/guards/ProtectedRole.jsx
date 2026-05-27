// components/ProtectedRole.jsx
// composant "enveloppe" qui vérifie l'accès à une page selon le rôle
// - si non connecté → redirige vers /auth/login
// - si connecté mais rôle insuffisant → redirige vers /
// - si connecté avec un rôle autorisé → affiche le contenu (children)

import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { roleAtom, isAuthAtom } from '../../../atoms/auth.atom';

export function ProtectedRole({ children, allowedRoles }) {
    const role = useAtomValue(roleAtom);
    const isAuth = useAtomValue(isAuthAtom);

    // 1.  User pas connecté → redirection login
    if (!isAuth) {
        return <Navigate to='/auth/login' replace />
    }
// replace empeche de revenir en arrière

    //2. Connecté mais mauvais rôle
    if (!allowedRoles.includes(role)) {
        return <Navigate to='/' replace />
    }

    // 3. Tout est bon
    return children
}
