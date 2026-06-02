// src/features/admin/components/AdminReports.jsx
// Page d'administration : modération des signalements

import { useEffect, useState } from "react";
import { Flag, Loader2, ServerCrash, Inbox } from "lucide-react";
import { reportService } from "../../../services/report.service";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import ReportCard from "./ReportCard";
import { scenarioService } from "../../../services/scenario.service";
import { useNavigate } from "react-router";


// Filtres disponibles (correspondent aux statuts du modèle + 'all')
const FILTERS = [
    { key: "pending", label: "En attente" },
    { key: "reviewed", label: "Traités" },
    { key: "dismissed", label: "Rejetés" },
    { key: "all", label: "Tous" },
];

export default function AdminReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("pending");
    const navigate = useNavigate();

    // * Chargement initial des signalements
    useEffect(() => {
        async function fetchReports() {
            try {
                setLoading(true);
                setError(null);
                const data = await reportService.getReports();
                setReports(data.reports);
            } catch (err) {
                setError("Impossible de charger les signalements.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    // Met à jour le statut localement après action admin (mise à jour optimiste)
    function updateLocalStatus(reportId, newStatus) {
        setReports((prev) =>
            prev.map((r) =>
                r._id === reportId
                    ? { ...r, status: newStatus, reviewedAt: new Date().toISOString() }
                    : r
            )
        );
    }

    async function handleReviewed(reportId) {
        try {
            await reportService.updateReportStatus(reportId, { status: "reviewed" });
            updateLocalStatus(reportId, "reviewed");
        } catch (err) {
            console.error("Erreur lors du traitement du signalement :", err);
        }
    }

    async function handleDismissed(reportId) {
        try {
            await reportService.updateReportStatus(reportId, { status: "dismissed" });
            updateLocalStatus(reportId, "dismissed");
        } catch (err) {
            console.error("Erreur lors du rejet du signalement :", err);
        }
    }

    // Edition
    // 1. Reçoit le report 
    // 2. Navigue vers l'édition avec le reportId dans le state 
   function handleEdited(report) {
    navigate(`/scenarios/${report.scenarioId}/edit`, {
        state: { reportId: report._id },
    });
}
    // Filtrage côté client (on a déjà toute la liste)
    const filtered =
        activeFilter === "all"
            ? reports
            : reports.filter((r) => r.status === activeFilter);

    // Compteurs par statut pour les badges des filtres
    const counts = {
        all: reports.length,
        pending: reports.filter((r) => r.status === "pending").length,
        reviewed: reports.filter((r) => r.status === "reviewed").length,
        dismissed: reports.filter((r) => r.status === "dismissed").length,
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-8 font-nunito">

            {/* En-tête de la page */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                    <Flag size={22} className="text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Signalements</h1>
                    <p className="text-sm text-gray-500">
                        {counts.pending} en attente de modération
                    </p>
                </div>
            </div>

            {/* Barre de filtres — on utilise Button en variant primary/outline_primary */}
            <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="Filtrer les signalements">
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

            {/* États : chargement / erreur / vide / liste */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <span className="text-sm">Chargement des signalements…</span>
                </div>
            )}

            {!loading && error && (
                <div className="flex flex-col items-center justify-center py-20 text-error gap-3">
                    <ServerCrash size={32} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {!loading && !error && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                    <Inbox size={32} />
                    <span className="text-sm">Aucun signalement dans cette catégorie.</span>
                </div>
            )}

            {!loading && !error && filtered.length > 0 && (
                <ul className="flex flex-col gap-4 list-none p-0" aria-label="Liste des signalements">
                    {filtered.map((report) => (
                        <li key={report._id}>
                            <ReportCard
                                report={report}
                                onReviewed={handleReviewed}
                                onDismissed={handleDismissed}
                                onEdit={handleEdited}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}