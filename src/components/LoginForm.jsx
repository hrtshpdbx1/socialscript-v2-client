// LoginForm.jsx

// ? Rôle : 
// Récupérer le token renvoyé par l'API
// Stocker le token dans l'atom Jotai (et dans le localStorage)
// Gérer les erreurs (mauvais email/mot de passe)

import { useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetAtom } from 'jotai';
import { tokenAtom } from '../../../atoms/auth.atom';
import authService from '../services/auth.service';

export function LoginForm() {

    const id = useId();
    const navigate = useNavigate();
    const setToken = useSetAtom(tokenAtom);
    const [errorMsg, setErrorMsg] = useState(null)

    const handleLoginSubmit = async (formData) => {
        // Conversion des données vers un objet JS
        const data = Object.fromEntries(formData.entries());

        try {
            // Utiliser le service qui permet de contacter la WebAPI
            const token = await authService.login(data);

            // Persistance dans le navigateur (survit au refresh)
            localStorage.setItem('token', token);

            // Mise à jour de l'atom (synchronise les composants React)
            // Sauvegarder le token dans un Atom (via Jotai)
            setToken(token);

            // Redirection vers la page d'accueil
            navigate('/');
        }
        catch {
            setErrorMsg('Une erreur est survenu durant la connexion !')
        }
    };

    return (
        <form action={handleLoginSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'email'} className='label-form'>Email :</label>
                <input id={id + 'email'} type='email' className='input-form' name='email' />
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'password'} className='label-form'>Mot de passe :</label>
                <input id={id + 'password'} type='password' className='input-form' name='password' />
            </div>
            <div className='flex gap-1 items-center'>
                <button type="submit" className='btn'>Se connecter </button>
                {errorMsg && (
                    <span className='font-bold'>{errorMsg}</span>
                )}
            </div>
        </form>
    )
}