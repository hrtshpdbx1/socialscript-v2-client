// src/components/sections/ExploreSection.jsx

export default function ExploreSection() {
    const cards = [
        {
            id: 1,
            title: "Jouer avec des scénarios",
            description: "Pratiquez des situations courantes (refuser, négocier, poser une limite) et recevez des feedbacks détaillés.",
            bgColor: "bg-[#e5dbff]",
            textColor: "text-gray-900",
            iconSrc: "/illustrations/icon-game.png",
            decorSrc: "/illustrations/decor-spiral.png",
            decorPosition: "-right-12 -top-12 w-64 h-64"
        },
        {
            id: 2,
            title: "Comprendre les codes",
            description: "Découvrez les styles de communication (passif, agressif, assertif) et trouvez celui qui vous correspond.",
            bgColor: "bg-primary",
            textColor: "text-white",
            iconSrc: "/illustrations/icon-bulb.png",
            decorSrc: "/illustrations/decor-cloud.png",
            decorPosition: "-right-4 top-4 w-48 h-48"
        },
        {
            id: 3,
            title: "Explorer les ressources",
            description: "Accédez à des associations, livres et podcasts pour approfondir vos connaissances sur la neurodivergence.",
            bgColor: "bg-accent",
            textColor: "text-gray-900",
            iconSrc: "/illustrations/icon-book.png",
            decorSrc: "/illustrations/decor-dots.png",
            decorPosition: "right-0 top-0 w-48 h-48"
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Explorez SocialScript
                    </h2>
                    <p className="text-lg text-gray-600">
                        Découvrez nos outils conçus pour vous aider à naviguer dans le monde social avec plus de sérénité.
                    </p>
                </div>
                {/* Les 3 Cartes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${card.bgColor} ${card.textColor}`}
                        >

                            <img
                                src={card.decorSrc}
                                alt=""
                                className={`absolute object-contain pointer-events-none opacity-90 ${card.decorPosition}`}
                            />
            
                            <div className="relative z-10 mb-16 lg:mb-24 mt-4">
                                <img
                                    src={card.iconSrc}
                                    alt=""
                                    className="w-32 h-32 md:w-36 md:h-36 object-contain drop-shadow-sm"
                                />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-extrabold mb-3 font-nunito">
                                    {card.title}
                                </h3>
                                <p className="font-medium opacity-90 leading-relaxed font-nunito text-lg">
                                    {card.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}