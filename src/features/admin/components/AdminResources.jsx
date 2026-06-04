// src/features/admin/components/AdminResources.jsx

import { useEffect, useState } from "react";
import { resourceService } from "../../../services/resource.service";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import ResourceForm from "./ResourceForm";
import { BookOpen } from "lucide-react";
import AdminPageHeader from "./AdminPageHeader";


// Majuscule sur la première lettre (affichage uniquement)
const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

const PLACEHOLDER = "https://placehold.co/200x200/f8fafc/94a3b8?text=Ressource";

export default function AdminResources() {
    const [resources, setResources] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [resourceToEdit, setResourceToEdit] = useState(null);
    const [activeFilter, setActiveFilter] = useState("false");
    
    // * Chargement initial des ressources
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [resData, catData] = await Promise.all([
                    resourceService.getAllAdmin(),
                    resourceService.getCategories()
                ]);
                setResources(resData.resources || resData);
                setCategories(catData.categories || catData);
            } catch (err) {
                setError("Impossible de charger les données.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    //* Create and update
    const handleFormSubmit = async (formData) => {
        try {
            if (resourceToEdit) {
                const updatedRes = await resourceService.update(resourceToEdit._id, formData);
                setResources(resources.map(r => r._id === resourceToEdit._id ? (updatedRes.data || updatedRes) : r));
            } else {
                const newRes = await resourceService.create(formData);
                setResources([(newRes.data || newRes), ...resources]);
            }
            closeForm();
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue lors de la sauvegarde.");
        }
    };

    //* Delete 
    const handleDelete = async (id) => {
        if (!window.confirm("Es-tu sûr de vouloir supprimer cette ressource ?")) return;
        try {
            await resourceService.remove(id);
            setResources(resources.filter(r => r._id !== id));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression.");
        }
    };

    const openCreateForm = () => {
        setResourceToEdit(null);
        setIsFormVisible(true);
    };

    const openEditForm = (resource) => {
        setResourceToEdit(resource);
        setIsFormVisible(true);
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setResourceToEdit(null);
    };


    //* TOGGLE PUBLISH/UNPUBLISH
    const handleTogglePublish = async (res) => {
        const newStatus = !res.isPublished;
        try {
            await resourceService.publishResource(res._id, { isPublished: newStatus });
            // On met à jour seulement le flag localement, en gardant l'objet existant
            setResources(resources.map(r =>
                r._id === res._id ? { ...r, isPublished: newStatus } : r
            ));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-gray-500 font-nunito animate-pulse text-center mt-10">Chargement des ressources...</p>;
    if (error) return <p className="text-error font-bold font-nunito text-center mt-10">{error}</p>;


    // FILTER 
    const FILTERS = [
        { key: "false", label: "Brouillon" },
        { key: "true", label: "En Ligne" },
        { key: "all", label: "Tous" },
    ];
    
    // Filtrage côté client 
    const filtered =
        activeFilter === "all"
            ? resources
            // : resources.filter(String(r.isPublished) === activeFilter);
            : resources.filter(r => String(r.isPublished) === activeFilter);

    // Compteurs par statut pour les badges des filtres
    // transformation en string()
    const counts = {
        all: resources.length,
        false: resources.filter((r) => String(r.isPublished) === "false").length,
        true: resources.filter((r) => String(r.isPublished) === "true").length,
       
    };

    return (
        
        <div className="space-y-8">
            <AdminPageHeader
    icon={BookOpen}
    title="Ressources"
subtitle={`${resources.filter((ressource) => ressource.isPublished===false).length} ressource(s) en attente de modération`}
 
    action={!isFormVisible && (
        <Button variant="primary" onClick={openCreateForm}>+ Nouvelle ressource</Button>
    )}
/>
            {isFormVisible ? (
                <ResourceForm
                    initialData={resourceToEdit}
                    categories={categories}
                    onSubmit={handleFormSubmit}
                    onCancel={closeForm}
                />
            ) : (

                
                <div className="flex flex-col gap-4">
                        {/* Barre de filtres */}
                        <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="Filtrer les ressources">
                            {FILTERS.map(({ key, label }) => {
                                const isActive = activeFilter === key;
                                return (
                                    <Button
                                        key={key}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveFilter(key)}
                                        variant={isActive ? "primary" : "outline_primary"}
                                        className="!py-1.5 !px-4 text-sm"
                                    >
                                        {label}
                                        {counts[key] > 0 && (
                                            <Badge
                                                text={counts[key]}
                                                color={isActive ? "onSuccess" : "primary"}
                                                className="!px-2 !py-0.5 !text-[10px]"
                                            />
                                        )}
                                    </Button>
                                );
                            })}
                        </div>

                    {resources.length === 0 ? (
                        <p className="text-center text-gray-400 py-10">Aucune ressource pour le moment.</p>
                    ) : (
                                filtered.map((res) => (
                            <Card key={res._id} className="text-left relative">
                                {/* Badge de statut, en haut à droite */}
                                <div className="absolute top-4 right-4">
                                    {res.isPublished ? (
                                        <Badge text="En ligne" color="success" />
                                    ) : (
                                        <Badge text="Brouillon" color="error" />
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    {/* ZONE GAUCHE : vignette fixe */}
                                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                                        <img
                                            src={res.icon || PLACEHOLDER}
                                            alt={res.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                                        />
                                    </div>

                                    {/* ZONE DROITE : contenu */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base text-gray-900 mb-1.5 pr-20 line-clamp-1">
                                            {res.title}
                                        </h3>

                                        <div className="flex gap-2 items-center mb-2 flex-wrap">
                                            <Badge text={capitalize(res.categoryId?.name) || "Sans catégorie"} color="secondary" />
                                            <Badge text={capitalize(res.theme)} color="primary" />
                                        </div>

                                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{res.description}</p>

                                        <a href={res.link1} target="_blank" rel="noreferrer"
                                            className="text-xs text-primary hover:underline truncate block mb-0.5">
                                            🔗 {res.link1}
                                        </a>
                                        {res.link2 && (
                                            <a href={res.link2} target="_blank" rel="noreferrer"
                                                className="text-xs text-gray-400 hover:text-primary hover:underline truncate block">
                                                🔗 {res.link2}
                                            </a>
                                        )}

                                        <div className="flex gap-2 justify-end mt-3">

                                            <div className="flex gap-2 justify-end mt-3">
                                                <Button
                                                    variant={res.isPublished ? "ghost" : "success"}
                                                    onClick={() => handleTogglePublish(res)}
                                                    className="text-sm !py-1 !px-4"
                                                >
                                                    {res.isPublished ? "Dépublier" : "Publier"}
                                                </Button>
                                                <Button variant="outline_primary" onClick={() => openEditForm(res)}
                                                    className="text-sm !py-1 !px-4">
                                                    Modifier
                                                </Button>
                                                <Button variant="error" onClick={() => handleDelete(res._id)}
                                                    className="text-sm !py-1 !px-4">
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}