// src/features/scenarios/components/NewThemeForm.jsx
import { useState, useId } from "react";
import Button from "../../../components/ui/Button"
import { useForm } from "react-hook-form"
import { themeService } from "../../../services/theme.service";
import { FieldError } from '../../../components/ui/FieldError';
import EmojiPicker from "emoji-picker-react";

// Ce composant a besoin de reçevoir du parent :
//difficultyId  → utilisé pour construire l'URL du POST
// onThemeCreated → appelé avec le nouveau thème quand le POST réussit

export const NewThemeForm = ({ difficultyId, onThemeCreated }) => {

    const { register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();
    const id = useId();
    const [errorMsg, setErrorMsg] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false); // ouverture emoji picker
    const selectedIcon = watch('icon');  // valeur actuelle de 'icon' pour l'afficher dans le bouton

    // Callback appelé quand on clique sur un emoji dans le picker
    const handleEmojiSelect = (emojiData) => {
        // emojiData.emoji contient le caractère emoji directement 
        setValue('icon', emojiData.emoji, { shouldValidate: true });
        setIsPickerOpen(false); // referme le picker après sélection
    };

    const onSubmit = async (formData) => {
        // 1. Appeler le service 
        try {
            const response = await themeService.create(difficultyId, formData);
              console.log('🟢 réponse reçue:', response);      // ← AJOUT
            // 2. Récupérer la réponse { _id, title, icon, ... }
            const newTheme = response.data;
            // 3. Appeler onThemeCreated avec le thème créé
            onThemeCreated(newTheme)
        } catch (error) {
            // console.error(error);
             console.error('🔴 erreur dans onSubmit:', error); // ← AJOUT 
            setErrorMsg("Une erreur est survenue lors de la création du thème.");
        }
    }

console.log('🔍 errors react-hook-form:', errors);
    return <>

    <div className="space-y-4">
            {/* --- TITRE --- */}
            <div>
                <label htmlFor={id + 'title'} className="form-label">Titre </label>
                <input type="text"
                    id={id + 'title'}
                    className="form-input"
                    {...register('title', { required: 'Le titre est obligatoire' })}
                />
                <FieldError error={errors.title} />
            </div>


            {/* --- ICONE (Emoji picker) --- */}
            <div>
                <label className="form-label">Icone</label>

                {/* Bouton qui ouvre/ferme le picker, affiche l'emoji choisi */}
                <button
                    type="button"
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    className="form-input text-left flex items-center gap-2 hover:border-primary"
                >
                    {selectedIcon ? (
                        <>
                            <span className="text-2xl">{selectedIcon}</span>
                            <span className="text-gray-500 text-sm">Cliquer pour changer</span>
                        </>
                    ) : (
                        <span className="text-gray-400">Choisir un emoji...</span>
                    )}
                </button>

                {/* Le picker, conditionnellement affiché */}
                {isPickerOpen && (
                    <div className="mt-2">
                        <EmojiPicker
                            onEmojiClick={handleEmojiSelect}
                            width="100%"
                            height={400}
                        />
                    </div>
                )}

                {/* Input caché pour la validation react-hook-form */}
                <input
                    type="hidden"
                    {...register('icon', { required: 'L\'icone est obligatoire' })}
                />
                <FieldError error={errors.icon} />
            </div>

            {/* --- DESCRIPTION --- */}
            <div>
                <label htmlFor={id + 'description'} className="form-label">Description </label>
                <input type="text"
                    id={id + 'description'}
                    className="form-input"
                    {...register('description', { required: 'Une description obligatoire' })}
                />
                <FieldError error={errors.description} />
            </div>

            {/* Message d'erreur global */}
            {errorMsg && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {errorMsg}
                </div>
            )}

           <Button 
                type="button" 
                onClick={handleSubmit(onSubmit)}
            >
                Suggérer un nouveau thème
            </Button>
        </div>

    </>


    // Quand l'utilisateur soumet le form
    // → react-hook-form valide
    // → appelle la fonction onSubmit avec { title, icon, description }
    //→ appelle themeService.create(difficultyId, formData)
    //→ le backend répond avec le thème créé (avec son _id)
    //→ appelle onThemeCreated(nouveauThème)
    //→ le parent reçoit le thème et met à jour sa liste

}


