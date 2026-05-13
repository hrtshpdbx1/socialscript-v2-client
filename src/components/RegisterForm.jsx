// src/pages/auth/RegisterForm.jsx

import { useId, useState } from 'react'; // ? pour l'accessibilité des labels
import { useNavigate } from 'react-router-dom'; // pour la redirection
import authService from '../services/auth.service';
import Button from '../components/ui/Button'; // Ajuste le chemin selon ton arborescence
import FormSection from '../components/ui/FormSections'; // Ajuste le chemin 

export function RegisterForm() {
    const id = useId(); // Id d'accessibilité 
    const navigate = useNavigate();

    // feedback error/succes
    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null);

    const handleRegisterSubmit = async (formData) => {
        // Conversion des données vers un objet JS
        // * Attention, se base sur la valeur des champs (checkbox → "on")
        const data = Object.fromEntries(formData.entries());

        try {
            // Utiliser le service qui permet de contacter la WebAPI
            await authService.register(data);

            // Feedback avant redirection
            setSuccessMsg('Inscription réussie ! Redirection vers la connexion...');
            setErrorMsg(null); // On efface d'éventuelles anciennes erreurs

            setTimeout(() => {
                navigate('/auth/login');
            }, 1500);
        } catch {
            setErrorMsg("Une erreur est survenue lors de l'inscription ! Vérifiez vos informations.");
            setSuccessMsg(null);
        }
    };

    return (
        // Limitation de la largeur et centrage
        <form action={handleRegisterSubmit} className="w-full max-w-md mx-auto mt-8 animate-fade-in-up">

            <FormSection title="Créer un compte">

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
                            required
                        />
                    </div>

                    {/* Champ Prénom */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id + 'firstname'} className="form-label">
                            Prénom :
                        </label>
                        <input
                            id={id + 'firstname'}
                            type="text"
                            className="form-input"
                            name="firstName"
                            required
                        />
                    </div>

                    {/* Champ Nom */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id + 'lastname'} className="form-label">
                            Nom :
                        </label>
                        <input
                            id={id + 'lastname'}
                            type="text"
                            className="form-input"
                            name="lastName"
                            required
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
                            S'enregistrer
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