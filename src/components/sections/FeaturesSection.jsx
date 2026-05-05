// src/components/sections/FeaturesSection.jsx

export default function FeaturesSection() {
    const features = [
        {
            id: 1,
            title: "Comprendre les règles implicites",
            description: "Apprenez à décoder les attentes sociales non-dites et les nuances de la communication dans un cadre sécurisant."
        },
        {
            id: 2,
            title: "Pratiquer sans conséquences",
            description: "Testez différentes approches d'interaction sans la pression du regard des autres. Le droit à l'erreur est garanti."
        },
        {
            id: 3,
            title: "Développer votre style",
            description: "Trouvez votre propre manière d'interagir, en respectant vos limites et votre fonctionnement neuro-atypique."
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* En-tête de la section centré */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Comment ça marche ?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Un espace d'entraînement sans jugement
                    </h2>
                </div>

                {/* Grille 50/50 inversée */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Col */}
                    <div className="order-2 md:order-1 relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-lg">
                        <img src="/illustrations/personne_fleur_serein.png" alt="Illustration représentant une personne avec une tête de fleur, allégorie pour la neurodivergence" srcset=""
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Righ Col */}
                    <div className="order-1 md:order-2 space-y-10 lg:space-y-12">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex gap-6 items-start">

                                {/* numéro */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/40 text-primary flex items-center justify-center font-black text-xl shadow-sm">
                                    {feature.id}
                                </div>

                                {/* Le texte */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}