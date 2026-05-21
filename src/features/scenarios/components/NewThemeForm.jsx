// src/features/scenarios/components/NewThemeForm.jsx
import { useState, useId } from "react";
import Button from "../../../components/ui/Button"
import { useForm } from "react-hook-form"
import { themeService } from "../../../services/theme.service";
import { FieldError } from '../../../components/ui/FieldError';

// reçoit : difficultyId  → utilisé pour construire l'URL du POST
// reçoit : onThemeCreated → appelé avec le nouveau thème quand le POST réussit

// fait : son propre useForm(), son propre appel API
// puis : appelle onThemeCreated(nouveauTheme)

// utilisateur soumet le form
//     → react-hook-form valide
//     → appelle ta fonction onSubmit avec { title, icon, description }
//         → tu appelles themeService.create(difficultyId, formData)
//             → le backend répond avec le thème créé (avec son _id)
//                 → tu appelles onThemeCreated(nouveauThème)
//                     → le parent reçoit le thème et met à jour sa liste

export const NewThemeForm = ({ difficultyId, onThemeCreated }) => {

const { register, handleSubmit, formState: { errors } } = useForm();
    const id = useId();
    const [errorMsg, setErrorMsg] = useState(null);

    const onSubmit = async (formData) => {
        // 1. Appeler le service 
        try {
            const response = await themeService.create(difficultyId, formData);
            // 2. Récupérer la réponse { _id, title, icon, ... }
            const newTheme = response.data;
            // 3. Appeler onThemeCreated avec le thème créé
            onThemeCreated(newTheme)
        } catch (error) {
            console.error(error);
            setErrorMsg("Une erreur est survenue lors de la création du thème.");
        }
    }

    return <>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor={id + 'title'} className="form-label">Titre </label>
            <input type="text"
                id={id + 'title'}
                className="form-input"
                {...register('title', { required: 'Le titre est obligatoire' })}
            />
            <FieldError error={errors.title} />

            <label htmlFor={id + 'icon'} className="form-label">Icone </label>
            <input type="text"
                id={id + 'icon'}
                className="form-input"
                {...register('icon', { required: 'L\'icone est obligatoire' })}
            />
            <FieldError error={errors.icon} />

            <label htmlFor={id + 'description'} className="form-label">Description </label>
            <input type="text"
                id={id + 'description'}
                className="form-input"
                {...register('description', { required: 'Une description obligatoire' })}
            />
            <FieldError error={errors.description} />

            <Button type="submit"> Ajouter un Theme </Button>
        </form>

    </>



}


