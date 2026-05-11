import { useId, useState } from 'react'; // ? pour l'accessibilité des labels
import authService from '../services/auth.service';
import { useNavigate } from 'react-router'; // pour la redirection
import Button from './ui/Button';

export function RegisterForm() {

    const id = useId(); // Id d'accessibilité 
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null);

    const handleRegisterSubmit = async (formData) => {
        // Les données sont récupéré sous la forme d'une FormData -> Necessite un name !!!
        console.log('FormData', formData);

        // Conversion des données vers un objet JS
        //* Attention, se base sur la valeur des champs (checkbox → "on")
        const data = Object.fromEntries(formData.entries());
        console.log('Data', data);
        // Dans notre cas, il faut transformer le formData en object JS car la WebAPI ne s'attend pas a recevoir des données du type "FormData"

        // Utiliser le service qui permet de contacter la WebAPI

        try {
            await authService.register(data);
            // Feedback avant redirection
            setSuccessMsg('Inscription réussie ! Redirection vers la connexion...');
            setTimeout(() => {
                navigate('/auth/login');
            }, 1500);
        } catch {
            setErrorMsg("Une erreur est survenue lors de l'inscription !");
        }
    };


    return (
        <form action={handleRegisterSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'email'} className='label-form'>Email d'utilisateur :</label>
                <input id={id + 'email'} type='email' className='input-form' name='email' />
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'firstname'} className='label-form'>Prénom :</label>
                <input id={id + 'firstname'} type='text' className='input-form' name='firstName' />
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'lastname'} className='label-form'>Nom :</label>
                <input id={id + 'lastname'} type='text' className='input-form' name='lastName' />
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <label htmlFor={id + 'password'} className='label-form'>Mot de passe :</label>
                <input id={id + 'password'} type='password' className='input-form' name='password' />
            </div>
            <div>

                <Button type="submit" className='btn'>S'enregistrer</Button>
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