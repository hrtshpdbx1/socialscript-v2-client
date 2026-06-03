// src/features/admin/components/ResourceForm.jsx

import { useState, useEffect, useId } from "react";
import Button from "../../../components/ui/Button";

// Listes issues de ton modèle backend (enums)
const THEMES = [
    'validisme', 'communauté', 'féminisme', 'pour débuter',
    'intersectionnalité', 'santé mentale & bien-être',
    'diagnostic & cheminement', 'milieu professionnel / études',
    'vie quotidienne & outils', 'vulgarisation scientifique',
    'parentalité / proches'
];

const LANGUAGES = ['anglais', 'français', 'néerlandais', 'allemand'];

const LOCATIONS = [
    'Belgique', 'France', 'Suisse', 'Québec', 'International / En ligne'
];

export default function ResourceForm({ initialData, categories, onSubmit, onCancel }) {
    const id = useId();
    const isEditMode = Boolean(initialData);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
        categoryId: "",
        theme: "",
        language: "",
        location: "",
        link1: "",
        link2: "",
        isPublished: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                icon: initialData.icon || "",
                categoryId: initialData.categoryId?._id || initialData.categoryId || "",
                theme: initialData.theme || "",
                language: initialData.language || "",
                location: initialData.location || "",
                link1: initialData.link1 || "",
                link2: initialData.link2 || "",
                isPublished: initialData.isPublished || false
            });
        } else {
            setFormData({
                title: "", description: "", icon: "", categoryId: "",
                theme: "", language: "", location: "", link1: "", link2: "", isPublished: false
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Gestion spécifique pour la checkbox "isPublished"
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Optionnel : on peut nettoyer les champs vides pour ne pas envoyer de chaînes vides au backend si ce n'est pas requis
        const dataToSend = { ...formData };
        if (!dataToSend.location) delete dataToSend.location;
        if (!dataToSend.link2) delete dataToSend.link2;
        if (!dataToSend.icon) delete dataToSend.icon;

        onSubmit(dataToSend);
    };

    // Mettre majuscule à chaque nom de Catégorie / menu d"roulant
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 animate-fade-in-up">
            <h2 className="text-2xl font-extrabold text-primary font-nunito border-b border-gray-100 pb-4">
                {isEditMode ? "Modifier la ressource" : "Nouvelle ressource"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- COLONNE 1 : Infos de base --- */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor={`${id}-title`} className="form-label">Titre *</label>
                        <input id={`${id}-title`} name="title" type="text" value={formData.title} onChange={handleChange} required className="form-input" />
                    </div>

                    <div>
                        <label htmlFor={`${id}-category`} className="form-label">Catégorie *</label>
                        <select id={`${id}-category`} name="categoryId" value={formData.categoryId} onChange={handleChange} required className="form-input bg-white">
                            <option value="" disabled>-- Choisir une catégorie --</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{capitalize(cat.name)}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor={`${id}-theme`} className="form-label">Thème *</label>
                        <select id={`${id}-theme`} name="theme" value={formData.theme} onChange={handleChange} required className="form-input bg-white">
                            <option value="" disabled>-- Choisir un thème --</option>
                            {THEMES.map(theme => (
                                <option key={theme} value={theme}>{capitalize(theme)}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor={`${id}-icon`} className="form-label">
                            Image (URL) <span className="text-gray-400 font-normal">- Optionnel</span>
                        </label>
                        <input id={`${id}-icon`} name="icon" type="url" value={formData.icon} onChange={handleChange}
                            className="form-input" placeholder="https://..." />
                    </div>
                </div>

                {/* --- COLONNE 2 : Liens et Détails --- */}
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor={`${id}-language`} className="form-label">Langue *</label>
                            <select id={`${id}-language`} name="language" value={formData.language} onChange={handleChange} required className="form-input bg-white">
                                <option value="" disabled>-- Langue --</option>
                                {LANGUAGES.map(lang => (
                                    <option key={lang} value={lang}>{capitalize(lang)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor={`${id}-location`} className="form-label">Localisation <span className="text-gray-400 font-normal">- Opt.</span></label>
                            <select id={`${id}-location`} name="location" value={formData.location} onChange={handleChange} className="form-input bg-white">
                                <option value="">Toutes</option>
                                {LOCATIONS.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor={`${id}-link1`} className="form-label">Lien principal (URL) *</label>
                        <input id={`${id}-link1`} name="link1" type="url" value={formData.link1} onChange={handleChange} required className="form-input" placeholder="https://..." />
                    </div>

                    <div>
                        <label htmlFor={`${id}-link2`} className="form-label">Lien secondaire (URL) <span className="text-gray-400 font-normal">- Optionnel</span></label>
                        <input id={`${id}-link2`} name="link2" type="url" value={formData.link2} onChange={handleChange} className="form-input" placeholder="https://..." />
                    </div>
                </div>

                {/* --- PLEINE LARGEUR : Description et Statut --- */}
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <label htmlFor={`${id}-desc`} className="form-label">Description *</label>
                        <textarea id={`${id}-desc`} name="description" rows="3" value={formData.description} onChange={handleChange} required className="form-input resize-none" />
                    </div>

                        {!isEditMode && (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <input
                                    id={`${id}-isPublished`}
                                    name="isPublished"
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <label htmlFor={`${id}-isPublished`} className="font-bold text-gray-900 cursor-pointer select-none">
                                    Publier cette ressource immédiatement
                                </label>
                            </div>
                        )}
                </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <Button variant="ghost" onClick={onCancel}>Annuler</Button>
                <Button type="submit" variant="primary">
                    {isEditMode ? "Mettre à jour" : "Créer la ressource"}
                </Button>
            </div>
        </form>
    );
}