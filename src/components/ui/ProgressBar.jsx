// src/components/ui/ProgressBar.jsx

export default function ProgressBar({ totalSteps = 5, currentStep = 1 }) {
    // Array.from crée un tableau de la taille 'totalSteps'. 
    // Si totalSteps = 4, ça crée [1, 2, 3, 4]
    // C'est l'astuce classique en React pour faire une boucle "X fois" sans utiliser de 'for'
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        // 'w-full' s'assure que la barre prend toute la largeur disponible
        <div className="flex gap-2 w-full items-center">

            {steps.map((step) => (
                <div
                    key={step}
                    // 'flex-1' dit à chaque segment de prendre une part égale de l'espace
                    // On ajoute une transition pour que le remplissage soit doux à l'œil
                    className={`h-2.5 flex-1 rounded-full transition-colors duration-500 ease-out ${step <= currentStep
                            ? "bg-primary" // Rempli avec ta couleur Fuchsia Blue
                            : "bg-gray-200" // Vide avec ton gris clair
                        }`}
                />
            ))}

        </div>
    );
}