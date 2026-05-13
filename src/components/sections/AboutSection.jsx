// src/components/sections/AboutSection.jsx

export default function AboutSection() {
    return (
        <section id="aboutAnchor" className="py-24 bg-primary text-white overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* En-tête*/}
                <div className="text-center mb-16 md:mb-20">
                    <span className="font-bold text-white tracking-widest uppercase text-sm mb-4 block  font-nunito">
                        À propos
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-nunito">
                        Issu d'une expérience vécue
                    </h2>
                </div>

                {/* Contenu : Grille Image (gauche) / Texte (droite) */}
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Col : La Photo */}
                    <div className="relative flex-shrink-0 mx-auto">
                        <img
                            src="/illustrations/louise.png"
                            alt="Louise Moraldy"
                            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Right Col : La Citation */}
                    <div className="flex-1 text-center md:text-left">
                        <blockquote className="text-xl md:text-xl lg:text-xl font-nunito italic font-light leading-relaxed mb-8 drop-shadow-sm">
                            « C'est par la répétition et l'analyse consciente des interactions que j'ai acquis des compétences sociales qui ne me venaient pas naturellement. J'ai toujours rêvé d'un environnement où m'entraîner sans craindre les malentendus ou les faux pas du temps réel. Ce projet est cette réalisation : un simulateur où les personnes neurodivergentes peuvent expérimenter, analyser et progresser dans un cadre structuré et bienveillant. »
                        </blockquote>

                        <p className="text-lg md:text-xl font-nunito font-medium opacity-90">
                            Louise Moraldy, créatrice du site et elle-même autiste et TDAH.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}