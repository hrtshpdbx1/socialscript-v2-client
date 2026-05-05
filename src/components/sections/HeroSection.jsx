// src/components/sections/HeroSection.jsx
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-24 md:pb-32">
            {/* Conteneur principal qui centre le contenu et gère les marges */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Grid 50/50 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

                    {/* Left col : text + CTA */}
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                            Pratiquez et décodez les
                            {/* Le mot clé mis en valeur avec ta couleur principale */}
                            <span className="text-primary"> codes sociaux </span>
                            dans un simulateur bienveillant.<br className="hidden md:block" /> </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                            SocialScript est un espace d'entraînement bienveillant, conçu pour les personnes neuro-atypiques, TSA, TDAH, souhaitant développer leurs habiletés sociales.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Button variant="primary">
                                Commencer l'entraînement
                            </Button>
                            <Button variant="outline">
                                Découvrir le projet
                            </Button>
                        </div>
                    </div>

                    {/* Right Col : Illustration */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        {/* Img */}
                        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                            <span className="text-gray-400 font-medium">
                              <img src="illustrations/hero-img.avif" alt="" className="w-full h-full object-cover" />
                            </span>
                         
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}