// src\features\auth\components\BtnLogout.jsx

import { useSetAtom } from 'jotai'
import Button from '../../../components/ui/Button';
import { tokenAtom } from '../../../atoms/auth.atom';

export function BtnLogout() {

    // Récupere le setter de l'atom
    const setToken = useSetAtom(tokenAtom);

    // Suppression du token
 const handleLogout = () => {
    localStorage.removeItem('token');  // Supprimer la persistance
    setToken(null);                    // Remettre l'atom à zéro
}
    return (
        <Button className='btn flex flex-row gap-0.5' onClick={handleLogout}>
        
            <span className='whitespace-nowrap hidden lg:block'>Se déconnecter</span>
        </Button>
    )
}

  