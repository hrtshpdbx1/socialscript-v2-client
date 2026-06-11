// /scr/features/dashboard/components/MyStats.jsx
import Card from "../../../components/ui/Card";

export default function MyStats({scenarios}) {

    const approved = scenarios.filter((s) => s.status === 'approved').length
    const pending = scenarios.filter((s) => s.status === 'pending').length
    const rejected = scenarios.filter((s) => s.status === 'rejected').length
const total = scenarios.length


    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="text-center">
                <p className="text-3xl font-bold text-primary">{total}</p>
                <p className="text-sm text-gray-500 font-nunito">Propositions</p>
            </Card>
            <Card className="text-center">
                <p className="text-3xl font-bold text-success">{approved}</p>
                <p className="text-sm text-gray-500 font-nunito">Approuvés</p>
            </Card>
            <Card className="text-center">
                <p className="text-3xl font-bold text-accent">{pending}</p>
                <p className="text-sm text-gray-500 font-nunito">En attente</p>
            </Card>
            <Card className="text-center">
                <p className="text-3xl font-bold text-error">{rejected}</p>
                <p className="text-sm text-gray-500 font-nunito">Non retenus</p>
            </Card>
        </div>
    );
}

