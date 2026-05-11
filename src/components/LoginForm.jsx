// LoginForm.jsx

// ? Rôle : 
// Récupérer le token renvoyé par l'API
// Stocker le token dans l'atom Jotai (et dans le localStorage)
// Gérer les erreurs (mauvais email/mot de passe)

import { useId, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetAtom } from 'jotai';
import authService from '../services/auth.service';
import { tokenAtom } from '../atoms/auth.atom';
import Button from './ui/Button';


export function LoginForm() {

    const id = useId();
    const navigate = useNavigate();
    const setToken = useSetAtom(tokenAtom);
    // feedback error/succes
    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null); 

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
            
            // Feedback avant redirection
            setSuccessMsg('Connexion réussie ! Redirection...');

            // Redirection après un court délai
            setTimeout(() => {
                navigate('/');
            }, 1500);
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
                <Button type="submit" className='btn'>Se connecter </Button>
                {errorMsg && (
                    <span className='font-bold text-red-600'>{errorMsg}</span>
                )}
                {successMsg && (
                    <span className='font-bold text-green-600'>{successMsg}</span>
                )}
            </div>
        </form>
    )
}