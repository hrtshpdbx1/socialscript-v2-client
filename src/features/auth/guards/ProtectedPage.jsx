//src\features\auth\guards\ProtectedPage.jsx

// composant "enveloppe" qui vérifie si l'utilisateur est connecté
// si oui -> affiche le contenu (les children
// si non -> redirige vers la page de login

import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { isConnectAtom } from '../../../atoms/auth.atom';

export function ProtectedPage({ children }) {

    const isConnect = useAtomValue(isConnectAtom); //  lis l'état de connexion

    if(!isConnect) {
        return <Navigate to='/auth/login' replace />
// replace : évite que l'utilisateur puisse revenir à la page protégée avec le bouton "retour" du navigateur 
    }

    return children;
}
