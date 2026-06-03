// src\features\auth\components\BtnLogout.jsx

import { useSetAtom } from 'jotai'
import Button from '../../../components/ui/Button';
import { tokenAtom, userAtom } from '../../../atoms/auth.atom';
import { useNavigate } from 'react-router';

export function BtnLogout() {

    // Récupere le setter de l'atom
    const setToken = useSetAtom(tokenAtom);
    const setUser = useSetAtom(userAtom);

    // Suppression du token
    const handleLogout = () => {
        setToken(null);// Remettre l'atom à zéro
        setUser(null);   // on vide aussi le profil
    }
    return (
        <Button className='btn flex flex-row gap-0.5' onClick={handleLogout}>

            <span className='whitespace-nowrap hidden lg:block'>Se déconnecter</span>
        </Button>
    )
}

