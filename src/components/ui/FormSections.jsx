// src/components/ui/FormSection.jsx

export default function FormSection({ title, children, className = "" }) {
    return (
        <div className={`space-y-6 bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 ${className}`}>
            {title && (
                <h3 className="text-xl font-extrabold text-primary font-nunito border-b border-primary/10 pb-4">
                    {title}
                </h3>
            )}
            {/* children représente tout ce qui va être à l'intérieur de la balise FormSection */}
            {children}
        </div>
    );
}