import Button from '../ui/Button';

export default function FaqSection() {
    const faqs = [
        {
            id: 1,
            question: "À qui s'adresse SocialScript ?",
            answer: "SocialScript a été imaginé pour les personnes neurodivergentes (autistes, TDAH, dyspraxiques, etc.) ainsi que toute personne qui souhaite développer son habileté sociale et mieux comprendre les codes implicites de la communication. Si vous avez déjà eu l'impression de \"ne pas comprendre les règles\" ou de devoir constamment deviner ce que les autres attendent, cet outil est pour vous."
        },
        {
            id: 2,
            question: "Comment utiliser efficacement les scénarios ?",
            answer: "Prenez le temps d'explorer toutes les options de réponse, même après avoir fait votre choix initial. Lisez attentivement les feedbacks qui expliquent pourquoi chaque réponse produit un effet différent. N'hésitez pas à rejouer plusieurs fois un même scénario pour bien intégrer les nuances. L'apprentissage se fait par la répétition et l'analyse consciente."
        },
        {
            id: 3,
            question: "Les scénarios sont-ils réalistes ?",
            answer: "Oui. Les situations sont inspirées de la vie quotidienne : conversations professionnelles, échanges amicaux, interactions dans les commerces, contextes familiaux. Elles reflètent les défis sociaux que rencontrent fréquemment les personnes neurodivergentes."
        },
        {
            id: 4,
            question: "Y a-t-il de bonnes ou mauvaises réponses ?",
            answer: "Absolument pas. Les interactions sociales ne sont pas des équations mathématiques et plusieurs approches peuvent fonctionner selon le contexte, vos valeurs et ce que vous cherchez à accomplir. L'objectif de l'outil n'est pas de vous formater, mais de vous donner les outils pour prendre des décisions éclairées et trouver le style qui vous sert le plus."
        },
        {
            id: 5,
            question: "Est-ce que SocialScript remplace un accompagnement thérapeutique ?",
            answer: "Non. C'est un outil complémentaire d'apprentissage. Il ne remplace pas un suivi par un·e professionnel·le spécialisé·e (psychologue, ergothérapeute, etc.). Consultez la page Ressources pour trouver de l'aide adaptée si vous en avez besoin."
        },
        {
            id: 6,
            question: "Le site est-il accessible ?",
            answer: "Nous avons fait de notre mieux pour rendre SocialScript accessible aux personnes en situation de handicap en apportant une attention toute particulière aux contrastes et à la navigation, mais nous ne prétendons pas être parfait·es. Si vous rencontrez des difficultés ou avez des suggestions, contactez-nous via la page Contact ou à info@socialscript.be. Vos retours nous aident à nous améliorer."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* En-tête de la FAQ */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Foire aux Questions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 font-nunito">
                        FAQ
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 font-nunito">
                        Nous avons rassemblé ici les questions que se posent le plus souvent les personnes qui découvrent SocialScript. Si votre question n'apparaît pas, n'hésitez pas à nous contacter.
                    </p>
                    <Button href="mailto:lmoraldy.dev@gmail.com" variant="outline">
                        Nous écrire
                    </Button>
                   
                   
                    <img className="mx-auto mt-8 max-w-200" src="/illustrations/wave_green_2.png" alt="" />
                </div>

                {/* L'Accordéon */}
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        // La classe "group" permet aux enfants de savoir si le parent <details> est ouvert ou fermé
                        <details
                            key={faq.id}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-100 open:shadow-md transition-all duration-200"
                        >
                            {/* Le Titre cliquable */}
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-bold text-gray-900 font-nunito text-lg hover:text-primary transition-colors">
                                {faq.question}

                                {/* icône "+" qui se transforme en "-" avec "group-open:" */}
                                <span className="flex-shrink-0 ml-4 relative w-6 h-6 flex items-center justify-center text-primary">
                                    {/* Barre horizontale du "+" */}
                                    <span className="absolute w-4 h-0.5 bg-current rounded-full"></span>
                                    {/* Barre verticale du "+",  pivote pour s'aligner et former un "-") */}
                                    <span className="absolute w-4 h-0.5 bg-current rounded-full rotate-90 group-open:rotate-0 transition-transform duration-300"></span>
                                </span>
                            </summary>

                            {/* Le contenu caché */}
                            <div className="p-6 pt-0 text-gray-600 font-nunito leading-relaxed animate-fade-in-down">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}