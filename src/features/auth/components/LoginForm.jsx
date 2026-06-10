// src\features\auth\components\LoginForm.jsx

// ? Rôle : 
// Récupérer le token renvoyé par l'API
// Stocker le token dans l'atom Jotai (et dans le localStorage)
// Gérer les erreurs (mauvais email/mot de passe)

import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import authService from '../../../services/auth.service';
import { tokenAtom } from '../../../atoms/auth.atom';
import Button from '../../../components/ui/Button';
import FormSection from '../../../components/ui/FormSections';

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
            console.log(token);
            

            // Mise à jour de l'atom (synchronise les composants React)
            //? Persistance dans le navigateur réaliser par l'atom
            setToken(token);
            
            // Feedback avant redirection
            setSuccessMsg('Connexion réussie ! Redirection...');
            setErrorMsg(null); // On efface les erreurs précédentes au cas où

            // Redirection après un court délai
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
        catch {
            setErrorMsg('Une erreur est survenue durant la connexion ! Vérifiez vos identifiants.');
            setSuccessMsg(null);
        }
    };

    return (
        // On limite la largeur du formulaire pour qu'il ne s'étire pas trop sur grand écran
        <form action={handleLoginSubmit} className="w-full max-w-md mx-auto mt-8 animate-fade-in-up">

            <FormSection title="Se connecter">

                {/* Conteneur principal des champs */}
                <div className="flex flex-col gap-5">

                    {/* Champ Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id + 'email'} className="form-label">
                            Email :
                        </label>
                        <input
                            id={id + 'email'}
                            type="email"
                            className="form-input"
                            name="email"
                            required // Petite sécurité HTML5
                        />
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id + 'password'} className="form-label">
                            Mot de passe :
                        </label>
                        <input
                            id={id + 'password'}
                            type="password"
                            className="form-input"
                            name="password"
                            required
                        />
                    </div>

                    {/* Zone d'action et Feedbacks */}
                    <div className="flex flex-col gap-4 mt-2">
                        <Button type="submit" className="w-full justify-center py-3 text-lg">
                            Se connecter
                        </Button>

                        {/* Alertes d'erreur ou de succès */}
                        {errorMsg && (
                            <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-sm font-bold text-center font-nunito">
                                {errorMsg}
                            </div>
                        )}

                        {successMsg && (
                            <div className="p-3 bg-success/20 border border-success/30 text-emerald-800 rounded-xl text-sm font-bold text-center font-nunito">
                                {successMsg}
                            </div>
                        )}
                    </div>

                </div>
            </FormSection>
        </form>
    );
}