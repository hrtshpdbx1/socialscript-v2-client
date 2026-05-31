// src/features/scenarios/components/ReportModal.jsx
import { useState } from "react";
import Button from "./Button";
import { FieldError } from "./FieldError";
import { reportService } from "../../services/report.service";


// Valeurs du select : lien entre valeur backend (enum) et label français
const REPORT_TYPES = [
    { value: 'offensive_content',    label: 'Contenu offensant' },
    { value: 'unrealistic_scenario', label: 'Situation irréaliste' },
    { value: 'unclear_instructions', label: 'Instructions peu claires' },
    { value: 'other',                label: 'Autre' },
];

// Ce composant a besoin de recevoir du parent :
// scenarioId  → pour construire l'URL du POST
// onClose     → appelé quand l'utilisateur ferme la modale (bouton × ou Annuler)
// onSuccess   → appelé quand le signalement est envoyé avec succès
export const ReportModal = ({ scenarioId, onClose, onSuccess }) => {

    // État du formulaire (validation manuelle — 2 champs seulement, pas besoin de react-hook-form)
    const [reportType, setReportType] = useState('');
    const [reason, setReason] = useState('');

    // États de feedback
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation manuelle
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!reportType) {
            newErrors.reportType = 'Veuillez choisir un type de signalement';
        }
        if (!reason || reason.trim().length < 10) {
            newErrors.reason = 'Veuillez expliquer le problème (10 caractères minimum)';
        }
        setErrors(newErrors);
        // Retourne true si pas d'erreurs (objet vide)
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        setErrorMsg(null);

        // On valide avant d'envoyer
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await reportService.create(scenarioId, { reportType, reason });
            // On prévient le parent que le signalement a réussi
            onSuccess();
        } catch (error) {
            console.error(error);
            setErrorMsg("Une erreur est survenue lors du signalement.");
        } finally {
            // finally s'exécute toujours, succès ou erreur
            setIsSubmitting(false);
        }
    };

    return (
        // Overlay : fond sombre semi-transparent qui couvre toute la page
        // onClick sur l'overlay → ferme la modale si on clique en dehors
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Conteneur de la modale */}
            {/* stopPropagation : empêche le clic sur la modale de remonter à l'overlay */}
            {/* cf. Doc React. Event bubbling. */}
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-gray-900 font-nunito">
                        Signaler ce scénario
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center text-xl"
                        aria-label="Fermer"
                    >
                        ×
                    </button>
                </div>

                <p className="text-sm text-gray-500">
                    Ton signalement sera examiné par notre équipe de modération.
                </p>

                {/* Champ reportType */}
                <div>
                    <label className="form-label">Type de problème</label>
                    <select
                        className="form-input"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="">-- Choisir --</option>
                        {REPORT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    <FieldError error={errors.reportType ? { message: errors.reportType } : null} />
                </div>

                {/* Champ reason */}
                <div>
                    <label className="form-label">Explique le problème</label>
                    <textarea
                        className="form-input min-h-[100px]"
                        placeholder="Ex: Ce scénario contient des propos blessants envers..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <FieldError error={errors.reason ? { message: errors.reason } : null} />
                </div>

                {/* Message d'erreur global */}
                {errorMsg && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                {/* Footer */}
                <div className="flex gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        className="flex-1"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Envoi...' : 'Envoyer le signalement'}
                    </Button>
                </div>

            </div>
        </div>
    );
};