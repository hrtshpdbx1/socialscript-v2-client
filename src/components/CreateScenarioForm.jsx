// src/components/CreateScenarioForm.jsx

import Button from './ui/Button';
import { useForm, useFieldArray } from "react-hook-form";
import { useId, useState, useEffect } from "react";
import { FieldError } from './ui/FieldError';
import { useNavigate } from 'react-router-dom';
import { scenarioService } from '../services/scenario.service';
import { difficultyService } from '../services/difficulty.service';
import { themeService } from '../services/theme.service';
import AvatarSelector from './ui/AvatarSelector';
import FormSection from './ui/FormSections';

export const CreateScenarioForm = () => {

    // States
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [difficulties, setDifficulties] = useState([]);
    const [themes, setThemes] = useState([]);

    const id = useId();
    const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
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

    // Charger les difficultés 
    useEffect(() => {
        difficultyService.getAll()
            .then((data) => setDifficulties(data.difficulties))
            .catch((err) => console.error(err));
    }, []);

    // Charger les thèmes 
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

    //  fonction onSubmit 
    const onSubmit = async (data) => {
        // réinitialisation des messages 
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* --- CHAMPS GLOBAUX --- */}
                {/* --- BLOC 1 : INFORMATIONS --- */}
                <FormSection title="Informations générales">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* --- TITRE--- */}
                        <div>
                            <label htmlFor={id + 'title'} className="form-label">Titre </label>
                            <input type="text"
                                id={id + 'title'}
                                className="form-input"
                                {...register('title', { required: 'Le titre est obligatoire' })}
                            />
                            <FieldError error={errors.title} />
                        </div>
                        
                        {/* --- CONTEXTE--- */}
                        <div>
                            <label htmlFor={id + 'context'} className="form-label"> Contexte : </label>
                            <textarea
                                type="text"
                                id={id + 'context'}
                                className="form-input min-h-[100px]"
                                {...register('context', { required: 'Le contexte est obligatoire' })}
                            />
                            <FieldError error={errors.context} />
                        </div>

                        {/* --- CHOIX DU NIVEAU DE DIFFICULTé--- */}
                        <div>
                            <label htmlFor={id + 'difficultyId'} className="form-label">Choix du niveau</label>
                            <select id={id + 'difficultyId'} className="form-input" {...register('difficultyId', { required: 'Le niveau est obligatoire' })}>
                                <option value="">-- Sélectionner --</option>
                                {difficulties.map((d) => (
                                    <option key={d._id} value={d._id}>{d.icon} {d.title}</option>
                                ))}
                            </select>
                            <FieldError error={errors.difficultyId} />
                        </div>

                        {/* ---CHOIX DU THEME --- */}
                        <div>
                            <label htmlFor={id + 'themeId'} className="form-label">Choix du Theme</label>
                            <select id={id + 'themeId'} className="form-input" {...register('themeId', { required: 'Le thème est obligatoire' })}>
                                <option value="">-- Sélectionner --</option>
                                {themes.map((t) => (
                                    <option key={t._id} value={t._id}>{t.icon} {t.title}</option>
                                ))}
                            </select>
                            <FieldError error={errors.themeId} />
                        </div>
                    </div>
                </FormSection>

                {/* --- BLOC 2 : L'INTERLOCUTEUR --- */}
                <FormSection title="L'Interlocuteur">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor={id + 'characterName'} className="form-label">Nom du personnage</label>
                            <input
                                type="text"
                                id={id + 'characterName'}
                                className="form-input"
                                placeholder="Ex: Jean (Collègue)"
                                {...register('characterName', { required: 'Le nom est obligatoire' })}
                            />
                            <FieldError error={errors.characterName} />
                        </div>

                        {/* 💡 INTÉGRATION DU COMPOSANT AVATAR SELECTOR */}
                        <div>
                            <AvatarSelector
                                value={watch('characterAvatarSeed')}
                                onChange={(seed) => setValue('characterAvatarSeed', seed, { shouldValidate: true })}
                            />

                            {/* L'input caché qui s'occupe de faire le lien avec react-hook-form */}
                            <input
                                type="hidden"
                                {...register('characterAvatarSeed', { required: 'Choisissez un avatar' })}
                            />
                            <FieldError error={errors.characterAvatarSeed} />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor={id + 'characterDialogue'} className="form-label">Sa phrase d'accroche (Dialogue initial)</label>
                        <textarea
                            id={id + 'characterDialogue'}
                            className="form-input min-h-[80px]"
                            placeholder="Ex: Hé, tu viens à ma fête samedi soir ?"
                            {...register('characterDialogue', { required: 'Vous devez insérer un dialogue' })}
                        />
                        <FieldError error={errors.characterDialogue} />
                    </div>
                </FormSection>

                {/* --- BLOC 3 : LES OPTIONS DE RÉPONSE --- */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">Les Choix </h3>

                    {fields.map((field, index) => (
                        <fieldset key={field.id} className="border-2 border-gray-200 p-4 rounded-xl relative">
                            <legend className="bg-white px-2 font-bold text-primary">Option {index + 1}</legend>

                            <div className="space-y-4 mt-2">
                                <div>
                                    <label htmlFor={`${id}opt${index}response`} className="form-label">Réponse du joueur</label>
                                    <textarea
                                        id={`${id}opt${index}response`}
                                        className="form-input"
                                        // On utilise l'index dynamiquement : "choices.0.responseText", "choices.1.responseText", etc.
                                        {...register(`choices.${index}.responseText`, { required: 'La réponse est obligatoire' })}
                                    />
                                    {/* Sécurisation de l'affichage de l'erreur pour les tableaux dynamiques */}
                                    <FieldError error={errors?.choices?.[index]?.responseText} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}reaction`} className="form-label">Réaction de l'interlocuteur</label>
                                    <textarea
                                        id={`${id}opt${index}reaction`}
                                        className="form-input"
                                        {...register(`choices.${index}.reactionText`, { required: 'La réaction est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.reactionText} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}analysis`} className="form-label">Analyse</label>
                                    <textarea
                                        id={`${id}opt${index}analysis`}
                                        className="form-input"
                                        {...register(`choices.${index}.analysis`, { required: "L'analyse est obligatoire" })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.analysis} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}consequence`} className="form-label">Conséquence</label>
                                    <textarea
                                        id={`${id}opt${index}consequence`}
                                        className="form-input"
                                        {...register(`choices.${index}.consequence`, { required: 'La conséquence est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.consequence} />
                                </div>

                                <div>
                                    <label htmlFor={`${id}opt${index}takeaway`} className="form-label">Point clé à retenir</label>
                                    <textarea
                                        id={`${id}opt${index}takeaway`}
                                        className="form-input"
                                        {...register(`choices.${index}.keyTakeaway`, { required: 'Le point clé est obligatoire' })}
                                    />
                                    <FieldError error={errors?.choices?.[index]?.keyTakeaway} />
                                </div>
                            </div>

                            {/* Bouton de supprimer d'une option spécifique */}
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