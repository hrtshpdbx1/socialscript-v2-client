export default function AdminPageHeader({ icon: Icon, title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="bg-primary/10 p-2.5 rounded-xl">
                        <Icon size={22} className="text-primary" />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-nunito">{title}</h1>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>
            </div>
            {action}
        </div>
    );
}