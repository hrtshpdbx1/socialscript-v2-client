// src/components/sections/ProcessTimeline.jsx

export default function ProcessTimeline() {
    const steps = [
        {
            id: 1,
            title: "Choix du scénario",
            description: "Trouvez une situation qui vous pose problème ou que vous souhaitez travailler au quotidien."
        },
        {
            id: 2,
            title: "Face à la situation",
            description: "Vous êtes immergé dans une conversation interactive avec notre IA bienveillante."
        },
        {
            id: 3,
            title: "Sélection des réactions",
            description: "Face à chaque réplique, choisissez la réaction qui vous semble la plus adaptée (ou pas !)."
        },
        {
            id: 4,
            title: "Analyse et feedback",
            description: "Obtenez un retour doux et constructif pour comprendre les codes de la situation abordée."
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left col */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                            Un processus simple pour progresser à votre rythme
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Pas de pression, pas de chronomètre. Prenez le temps d'analyser chaque situation et d'essayer différentes approches.
                        </p>
                        {/* Le petit bouton jaune ("Créer un compte") */}
                        <button className="bg-accent text-gray-900 font-bold px-8 py-3 rounded-full hover:brightness-95 transition-all shadow-sm">
                            Créer un compte
                        </button>
                    </div>

                    {/* Right Col : La Timeline */}
                    <div className="relative">
                        {/* ligne verticale continue ( */}
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                        <div className="space-y-12 relative">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex gap-6 relative">

                                    {/* Le point sur la timeline */}
                                    <div className="relative mt-1">
                                        <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold z-10 shadow-sm">
                                            {step.id}
                                        </div>
                                    </div>

                                    {/* Le contenu de l'étape */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}