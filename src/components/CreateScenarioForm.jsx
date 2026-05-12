// CreateScenarioForm.jsx

import Button from './ui/Button';
import { useForm, useFieldArray } from "react-hook-form";
import { useId, useState, useEffect } from "react";
import { FieldError } from './ui/FieldError';
import { useNavigate } from 'react-router-dom';
import { scenarioService } from '../services/scenario.service';
import { difficultyService } from '../services/difficulty.service';
import { themeService } from '../services/theme.service';

export const CreateScenarioForm = () => {

    // States
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [difficulties, setDifficulties] = useState([]);
    const [themes, setThemes] = useState([]);

    const id = useId();
    const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            choices: [
                { responseText: "", reactionText: "", analysis: "", consequence: "", keyTakeaway: "" },
                { responseText: "", reactionText: "", analysis: "", consequence: "", keyTakeaway: "" },
                { responseText: "", reactionText: "", analysis: "", consequence: "", keyTakeaway: "" },
            ]
        }
    });
    //  Initialisation de useFieldArray
    const { fields, append, remove } = useFieldArray({
        control,
        name: "choices"  // clé attendue par ton backend
    });

    // Charger les difficultés au montage
    useEffect(() => {
        difficultyService.getAll()
            .then((data) => setDifficulties(data.difficulties))
            .catch((err) => console.error(err));
    }, []);

    // Charger les thèmes au montage
    const selectedDifficulty = watch('difficultyId');

    useEffect(() => {
        if (!selectedDifficulty) {
            setThemes([]);
            return;
        }
        themeService.getByDifficulty(selectedDifficulty)
            .then((data) => setThemes(data.themes))
            .catch((err) => console.error(err));
    }, [selectedDifficulty]);

    // 💡 3. La fonction onSubmit complète
    const onSubmit = async (data) => {
        // On réinitialise les messages au cas où l'utilisateur renvoie le formulaire
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            // 1. On appelle le service pour créer le scénario
            const response = await scenarioService.create(data);

            // 2. Feedback de succès
            setSuccessMsg("Scénario créé avec succès, l'équipe de modération va maintenant l'étudier ! Redirection en cours...");

            // 3. Redirection après 1.5 secondes
            // On récupère l'ID du scénario créé 
            const newScenarioId = response.data._id;

            setTimeout(() => {
                if (newScenarioId) {
                    navigate(`/scenarios/${newScenarioId}`);
                } else {
                    // Fallback de sécurité si l'API ne renvoie pas l'ID direct
                    navigate('/scenarios');
                }
            }, 1500);

        } catch (error) {
            console.error(error);
            // Affichage de l'erreur
            setErrorMsg("Une erreur est survenue lors de la création du scénario.");
        }
    }




    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Création de scénario</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* --- CHAMPS GLOBAUX --- */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                    <div>
                        <label htmlFor={id + 'title'}>Titre </label>
                        <input type="text"
                            id={id + 'title'}
                            {...register('title',
                                { required: 'Le titre est obligatoire' })}
                        />
                        <FieldError error={errors.title} />
                    </div>

                    <div>
                        <label htmlFor={id + 'context'}> Contexte : </label>
                        <textarea
                            type="text"
                            id={id + 'context'}
                            {...register('context',
                                { required: 'Le contexte est obligatoire' })}
                        />
                        <FieldError error={errors.context} />
                    </div>

                    <div>
                        <label htmlFor={id + 'characterName'}>Nom du personnage</label>
                        <input
                            type="text"
                            id={id + 'characterName'}
                            {...register('characterName',
                                { required: 'Le nom du personnage est obligatoire', })} />
                        <FieldError error={errors.characterName} />
                    </div>


                    <div>
                        <label htmlFor={id + 'characterAvatarSeed'}>Avatar</label>
                        <input type="text"
                            id={id + 'characterAvatarSeed'}
                            {...register('characterAvatarSeed',
                                { required: 'Vous devez choisir un avatar', })} />
                        <FieldError error={errors.characterAvatarSeed} />
                    </div>
                    <div>
                        <label htmlFor={id + 'characterDialogue'}>Dialogue</label>
                        <textarea type="text"
                            id={id + 'characterDialogue'}
                            {...register('characterDialogue',
                                { required: 'Vous devez insérer un dialogue', })} />
                        <FieldError error={errors.characterDialogue} />
                    </div>

                    <div>
                        <label htmlFor={id + 'difficultyId'}>Choix du niveau</label>
                        <select id={id + 'difficultyId'} {...register('difficultyId', { required: 'Le niveau est obligatoire' })}>
                            <option value="">-- Sélectionner --</option>
                            {difficulties.map((d) => (
                                <option key={d._id} value={d._id}>{d.icon} {d.title}</option>
                            ))}
                        </select>
                        <FieldError error={errors.difficultyId} />
                    </div>


                    <div>
                        <label htmlFor={id + 'themeId'}>Choix du Theme</label>
                        <select id={id + 'themeId'} {...register('themeId', { required: 'Le thème est obligatoire' })}>
                            <option value="">-- Sélectionner --</option>
                            {themes.map((t) => (
                                <option key={t._id} value={t._id}>{t.icon} {t.title}</option>
                            ))}
                        </select>

                        <FieldError error={errors.themeId} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">Les Choix </h3>

                    {fields.map((field, index) => (
                        <fieldset key={field.id} className="border-2 border-gray-200 p-4 rounded-xl relative">
                            <legend className="bg-white px-2 font-bold text-primary">Option {index + 1}</legend>

                            <div className="space-y-4 mt-2">
                                <div>
                                    <label htmlFor={`${id}opt${index}response`}>Réponse du joueur</label>
                                    <textarea
                                        id={`${id}opt${index}response`}
                                        className="w-full p-2 border rounded"
                                        // On utilise l'index dynamiquement : "choices.0.responseText", "choices.1.responseText", etc.
                                        {...register(`choices.${index}.responseText`, { required: 'La réponse est obligatoire' })}
                                    />
                                    {/* Sécurisation de l'affichage de l'erreur pour les tableaux dynamiques */}
                                    <FieldError error={errors?.choices?.[index]?.responseText} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}reaction`}>Réaction de l'interlocuteur</label>
                                    <textarea
                                        id={`${id}opt${index}reaction`}
                                        className="w-full p-2 border rounded"
                                        {...register(`choices.${index}.reactionText`, { required: 'La réaction est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.reactionText} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}analysis`}>Analyse</label>
                                    <textarea
                                        id={`${id}opt${index}analysis`}
                                        className="w-full p-2 border rounded"
                                        {...register(`choices.${index}.analysis`, { required: "L'analyse est obligatoire" })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.analysis} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}consequence`}>Conséquence</label>
                                    <textarea
                                        id={`${id}opt${index}consequence`}
                                        className="w-full p-2 border rounded"
                                        {...register(`choices.${index}.consequence`, { required: 'La conséquence est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.consequence} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}takeaway`}>Point clé à retenir</label>
                                    <textarea
                                        id={`${id}opt${index}takeaway`}
                                        className="w-full p-2 border rounded"
                                        {...register(`choices.${index}.keyTakeaway`, { required: 'Le point clé est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.keyTakeaway} />
                                </div>
                            </div>

                            {/* Bouton pour supprimer CETTE option spécifique (sauf s'il n'en reste qu'une) */}
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute -top-3 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-200"
                                >
                                    Supprimer
                                </button>
                            )}
                        </fieldset>
                    ))}

                    {/* Bouton pour AJOUTER une nouvelle option */}
                    {fields.length < 3 && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-dashed"
                            onClick={() => append({ responseText: "", reactionText: "", analysis: "", consequence: "", keyTakeaway: "" })}
                        >
                            + Ajouter une option
                        </Button>
                    )}
                </div>

                {/* BOUTON DE SOUMISSION FINAL */}
                <div className="pt-8 flex flex-col gap-3">
                    <Button type="submit" variant="primary" className="w-full">
                        Soumettre le scénario
                    </Button>

                    {/* Zone de feedback (Messages d'erreur ou de succès) */}
                    {errorMsg && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center font-bold font-nunito">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center font-bold font-nunito">
                            {successMsg}
                        </div>
                    )}
                </div>

            </form>
        </div>
    )
}
