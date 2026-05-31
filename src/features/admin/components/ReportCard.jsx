// src/features/admin/components/ReportCard.jsx
// Carte d'affichage d'un signalement avec actions Reviewed / Dismissed

import { Eye, XCircle } from "lucide-react";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";

// Labels lisibles pour les types de signalement
const REPORT_TYPE_LABELS = {
    offensive_content: "Contenu offensant",
    unrealistic_scenario: "Scénario irréaliste",
    unclear_instructions: "Instructions peu claires",
    other: "Autre",
};

// Mapping statut → props du Badge (couleur + texte)
const STATUS_BADGE = {
    pending: { text: "En attente", color: "accent" },
    reviewed: { text: "Traité", color: "success" },
    dismissed: { text: "Rejeté", color: "error" },
};

export default function ReportCard({ report, onReviewed, onDismissed }) {
    const formattedDate = new Date(report.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const reviewedDate = report.reviewedAt
        ? new Date(report.reviewedAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : null;

    const isPending = report.status === "pending";
    const badgeProps = STATUS_BADGE[report.status] ?? STATUS_BADGE.pending;

    return (
        // ! On remplace le p-8 text-center de Card par !p-5 text-left pour notre layout
        <Card className="!p-5 text-left transition-all duration-200 hover:shadow-md">
            {/* En-tête : type + statut à gauche, actions à droite */}
            <div className="flex items-start justify-between gap-4">

                {/* Infos principales */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* Type de signalement + badge statut */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-base text-gray-900 font-nunito">
                            {REPORT_TYPE_LABELS[report.reportType] ?? report.reportType}
                        </span>
                        <Badge text={badgeProps.text} color={badgeProps.color} />
                    </div>

                    {/* Date de création */}
                    <div className="text-xs text-gray-500 font-medium">
                        Signalé le {formattedDate}
                    </div>
                </div>

                {/* Actions — uniquement si le signalement est encore pending */}
                {isPending && (
                    <div className="flex gap-2 flex-shrink-0">
                        <Button
                            onClick={() => onReviewed(report._id)}
                            variant="success"
                            aria-label="Marquer comme traité"
                            title="Traité"
                            className="!px-3"
                        >
                            <Eye size={16} strokeWidth={2.5} />
                            <span className="text-xs font-semibold hidden sm:inline">Traité</span>
                        </Button>
                        <Button
                            onClick={() => onDismissed(report._id)}
                            variant="error"
                            aria-label="Rejeter le signalement"
                            title="Rejeter"
                            className="!px-3"
                        >
                            <XCircle size={16} strokeWidth={2.5} />
                            <span className="text-xs font-semibold hidden sm:inline">Rejeter</span>
                        </Button>
                    </div>
                )}
            </div>

            {/* Raison du signalement */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2.5 rounded-lg leading-relaxed font-nunito italic">
                    « {report.reason} »
                </p>
            </div>

            {/* Footer : reporter + reviewedBy si applicable */}
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-400 font-medium flex-wrap">
                <span>
                    Signalé par{" "}
                    <span className="text-gray-600 font-semibold">
                        {report.reporterId
                            ? `${report.reporterId.firstName} ${report.reporterId.lastName}`
                            : "utilisateur inconnu"}
                    </span>
                </span>

                {reviewedDate && (
                    <span>
                        Traité le <span className="text-gray-600">{reviewedDate}</span>
                        {report.reviewedBy?.firstName && (
                            <>
                                {" "}par{" "}
                                <span className="text-gray-600 font-semibold">
                                    {`${report.reporterId.firstName} ${report.reporterId.lastName}`}
                                </span>
                            </>
                        )}
                    </span>
                )}
            </div>
        </Card>
    );
}