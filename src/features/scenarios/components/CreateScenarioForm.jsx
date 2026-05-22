// src/features/scenarios/components/CreateScenarioForm.jsx

import Button from '../../../components/ui/Button';
import { useForm, useFieldArray } from "react-hook-form";
import { useId, useState, useEffect } from "react";
import { FieldError } from '../../../components/ui/FieldError';
import { useNavigate } from 'react-router-dom';
import { scenarioService } from '../../../services/scenario.service';
import { difficultyService } from '../../../services/difficulty.service';
import { themeService } from '../../../services/theme.service';
import AvatarSelector from '../../../components/ui/AvatarSelector';
import FormSection from '../../../components/ui/FormSections';
import { NewThemeForm } from './NewThemeForm';
import Badge from '../../../components/ui/Badge';


export const CreateScenarioForm = () => {

    // States
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [difficulties, setDifficulties] = useState([]);
    const [themes, setThemes] = useState([]);
    const [isNewThemeOpen, setIsNewThemeOpen] = useState(false);
    const [createdScenarioId, setCreatedScenarioId] = useState(null); //  état conditionnel post-submit
    const id = useId();
    const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

    const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            context: "",
            keyTakeaway: "",
            choices: [
                { responseText: "", reactionText: "", analysis: "", consequence: "" },
                { responseText: "", reactionText: "", analysis: "", consequence: "" },
                { responseText: "", reactionText: "", analysis: "", consequence: "" },
            ]
        }
    });

    //  Initialisation de useFieldArray
    const { fields, append, remove } = useFieldArray({
        control,
        name: "choices"  // clé attendue par le back
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
            setSuccessMsg("Scénario créé avec succès !");

            // 3. Redirection après 1.5 secondes
            // On récupère l'ID du scénario créé 
            const newScenarioId = response.data._id;
            setCreatedScenarioId(newScenarioId); // ← on stocke l'ID

        } catch (error) {
            console.error(error);
            // Affichage de l'erreur
            setErrorMsg("Une erreur est survenue lors de la création du scénario.");
        }
    }

    // Ajouter un Theme
    const AddNewTheme = (newTheme) => {
        // 1. Ajouter le nouveau thème à la liste themes
        setThemes([...themes, newTheme])// copie tableau + ajout d'un élément à la fin
        // 2. Sélectionner automatiquement dans le select
        // setValue permet de modifier programmatiquement la valeur d'un champ
        setValue('themeId', newTheme._id)
    }


    return (
        <div className="max-w-3xl mx-auto p-4">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* --- CHAMPS GLOBAUX --- */}
                {/* --- BLOC 1 : INFORMATIONS --- */}
                <FormSection title="Informations générales">
                    <div className="flex flex-col gap-4">

                        {/* --- TITRE--- */}
                        <div>
                            <label htmlFor={id + 'title'} className="form-label">Titre </label>
                            <input type="text"
                                id={id + 'title'}
                                className="form-input"
                                placeholder="Ex: Refuser une invitation sans blesser"
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
                                placeholder="Ex: Un collègue t'invite à une fête, tu ne veux pas y aller mais tu ne sais pas comment le dire sans le vexer."
                                {...register('context', { required: 'Le contexte est obligatoire' })}
                            />
                            <FieldError error={errors.context} />
                        </div>
                    </div>



                    {/* --- CHOIX DU NIVEAU DE DIFFICULTé--- */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor={id + 'difficultyId'} className="form-label">Choix du niveau</label>
                            <select id={id + 'difficultyId'}
                                className="form-input"
                                {...register('difficultyId',
                                    { required: 'Le niveau est obligatoire' }
                                )}>
                                <option value="">-- Sélectionner --</option>
                                {difficulties.map((d) => (
                                    <option key={d._id} value={d._id}>{d.icon} {d.title}</option>
                                ))}
                            </select>
                            <FieldError error={errors.difficultyId} />
                        </div>

                        {/* ---CHOIX DU THEME --- */}
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor={id + 'themeId'} className="form-label">Choix du Theme</label>
                            <div className="flex items-center gap-2">

                                <select id={id + 'themeId'}
                                    className="form-input"
                                    disabled={!selectedDifficulty}
                                    {...register('themeId',
                                        { required: 'Le thème est obligatoire' }
                                    )}>
                                    <option value="">-- Sélectionner --</option>

                                    {themes.map((t) => (
                                        <option key={t._id} value={t._id}>
                                            {t.icon}
                                            {t.title}
                                            {t.status === 'pending' ? ' - en attente' : ''}
                                        </option>
                                    ))}
                                </select>

                                {/* Bouton + */}
                                {/* Disable  si une difficulté non sélectionnée  */}
                                <button
                                    type="button"
                                    onClick={() => setIsNewThemeOpen(!isNewThemeOpen)}
                                    disabled={!selectedDifficulty}
                                    className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                                    title="Proposer un nouveau thème"
                                >
                                    {isNewThemeOpen ? '×' : '+'}
                                </button>
                            </div>

                        </div>
                        <FieldError error={errors.themeId} />
                    </div>

                    {/* ---AJOUTER UN THEME --- */}
                    {/* Section dépliante */}
                    {/* L'enfant NewThemeForm a besoin de connaitre :
                        -  dans quelle difficulté créer le thème (pour l'URL du POST) → difficultyId 
                        - → une fonction callback pour prévenir le parent quand un thème est créé */}

                    {isNewThemeOpen && (
                        <div className="mt-4 p-5 bg-white border-l-4 border-primary rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-extrabold text-primary font-nunito flex items-center gap-2">
                                    ✨ Proposer un nouveau thème
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => setIsNewThemeOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 text-xl leading-none w-6 h-6 flex items-center justify-center"
                                    aria-label="Fermer le formulaire"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Ton thème sera visible immédiatement <span className="font-bold">pour toi</span>, le temps qu'un modérateur le valide pour les autres utilisateurs.
                            </p>
                            <NewThemeForm
                                difficultyId={selectedDifficulty}
                                onThemeCreated={(newTheme) => {
                                    AddNewTheme(newTheme);
                                    setIsNewThemeOpen(false);
                                }}
                            />
                        </div>
                    )}
                </FormSection>

                {/* --- BLOC 2 : L'INTERLOCUTEUR --- */}
                < FormSection title="L'Interlocuteur" >
                    <div className="flex flex-col  gap-6">
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
                        {/*  PHRASE D'ACCROCHE */}
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
                        {/*  AVATAR SELECTOR */}
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


                </FormSection >

                {/* --- BLOC 3 : LES OPTIONS DE RÉPONSE --- */}
                < FormSection title="Les Choix" >

                    {
                        fields.map((field, index) => (
                            <fieldset key={field.id} className="mt-4 p-5 bg-white border-l-4 border-primary rounded-xl shadow-sm">
                                <div className="flex flex-col  mb-3">
                                    {/* <legend className="font-extrabold text-primary font-nunito flex items-center gap-2">Option {index + 1}</legend> */}
                                    <legend className="flex items-center gap-2 mb-4">
                                        <Badge
                                            text={`Option ${index + 1}`}
                                            color={['primary', 'accent', 'success'][index]}
                                        />
                                    </legend>
                                    <div className="space-y-4 mt-2">
                                        {/*  REPONSE DU JOUEUR */}
                                        <div>
                                            <label htmlFor={`${id}opt${index}response`} className="form-label">Réponse du joueur</label>
                                            <textarea
                                                id={`${id}opt${index}response`}
                                                className="form-input"
                                                placeholder="Ex: Désolé, j'ai déjà quelque chose de prévu ce soir-là."
                                                // On utilise l'index dynamiquement : "choices.0.responseText", "choices.1.responseText", etc.
                                                {...register(`choices.${index}.responseText`, { required: 'La réponse est obligatoire' })}
                                            />
                                            {/* Sécurisation de l'affichage de l'erreur pour les tableaux dynamiques */}
                                            <FieldError error={errors?.choices?.[index]?.responseText} />
                                        </div>

                                        <div>
                                            {/*  REACTION INTERLOCUTEUR */}
                                            <label htmlFor={`${id}opt${index}reaction`} className="form-label">Réaction de l'interlocuteur</label>
                                            <textarea
                                                id={`${id}opt${index}reaction`}
                                                className="form-input"
                                                placeholder="Ex: Ah, dommage ! Une autre fois alors."
                                                {...register(`choices.${index}.reactionText`, { required: 'La réaction est obligatoire' })}
                                            />
                                            <FieldError error={errors?.choices?.[index]?.reactionText} />
                                        </div>

                                        <div>
                                            {/* ANALYSE */}
                                            <label htmlFor={`${id}opt${index}analysis`} className="form-label">Analyse</label>
                                            <textarea
                                                id={`${id}opt${index}analysis`}
                                                className="form-input"
                                                placeholder="Ex: Cette réponse est polie et directe sans donner trop de détails."
                                                {...register(`choices.${index}.analysis`, { required: "L'analyse est obligatoire" })}
                                            />
                                            <FieldError error={errors?.choices?.[index]?.analysis} />
                                        </div>

                                        <div>
                                            {/* CONSEQUENCE */}
                                            <label htmlFor={`${id}opt${index}consequence`} className="form-label">Conséquence</label>
                                            <textarea
                                                id={`${id}opt${index}consequence`}
                                                className="form-input"
                                                placeholder="Ex: La relation est préservée, l'autre personne n'est pas blessée."
                                                {...register(`choices.${index}.consequence`, { required: 'La conséquence est obligatoire' })}
                                            />
                                            <FieldError error={errors?.choices?.[index]?.consequence} />
                                        </div>
                                    </div>
                                </div>




                                {/* Bouton de supprimer d'une option spécifique */}
                                {/* {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute -top-3 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-200"
                                    >
                                        Supprimer
                                    </button>
                                )} */}
                            </fieldset>

                        ))
                    }

                </FormSection>

                <FormSection title="Point clé à retenir">
                    <div className="flex flex-col  mb-3">

                        <div className="space-y-4 mt-2">
                            <div>
                                <label htmlFor={id + 'keyTakeaway'} className="form-label">
                                    La leçon principale de ce scénario
                                </label>
                                <textarea
                                    id={id + 'keyTakeaway'}
                                    className="form-input min-h-[80px]"
                                    placeholder="Ex: Il est normal de poser des limites poliment mais fermement."
                                    {...register('keyTakeaway', { required: 'Le point clé est obligatoire' })}
                                />
                                <FieldError error={errors.keyTakeaway} />
                            </div>


                        </div>
                    </div>

                </FormSection>



                {/* BOUTON DE SOUMISSION FINAL */}
                < div className="pt-8 flex flex-col gap-3" >
                    <Button type="submit" variant="primary" className="w-full">
                        Soumettre le scénario
                    </Button>

                    {/* Zone de feedback */}
                    {errorMsg && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center font-bold font-nunito">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && createdScenarioId && (
                        <div className="p-4 bg-success/20 rounded-xl flex flex-col gap-3">
                            <p className="text-center font-bold text-green-900 font-nunito">
                                {successMsg}
                            </p>
                            <p className="text-center text-sm text-gray-600">
                                Ton scénario est en attente de validation par notre équipe de modération.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        // Réinitialiser le form et les états pour créer un nouveau scénario
                                        setSuccessMsg(null);
                                        setCreatedScenarioId(null);
                                        // reset() de react-hook-form remet tous les champs à leurs defaultValues
                                        reset();
                                    }}
                                >
                                    Créer un nouveau scénario
                                </Button>
                                <Button
                                    type="button"
                                    variant="primary"
                                    className="flex-1"
                                    onClick={() => navigate(`/scenarios/${createdScenarioId}`)}
                                >
                                    Tester mon scénario
                                </Button>
                            </div>
                        </div>
                    )}
                </div >

            </form >
        </div >
    )
}