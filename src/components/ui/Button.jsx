// Button.jsx


// Classes de base
const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-4xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";;

// Dictionaire des variantes
// object dont chaque clé (default, cta) correspond à un type de bouton et contient ses styles spécifiques.
const variants = {
    // Principal (Violet) - Texte blanc pour le contraste
    primary: "bg-primary text-white hover:opacity-90 shadow-sm",

    // Secondaire (Bleu pastel) - Texte foncé (gray-900) car le fond est clair
    secondary: "bg-secondary text-gray-900 hover:opacity-90",

    // Contour (Bordure grise fond transparent)
    outline: "border-1 border-gray-700 text-gray-700 hover:bg-secondary ",

      // Contour (Bordure violette, fond transparent)
    outline_primary: "border-1 border-primary text-primary hover:bg-primary hover:text-white",


    // Discret (Pas de fond, fond gris clair au survol)
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200",

    // Succès (Vert pastel)
    success: "bg-success text-gray-900 hover:opacity-90",

    // Erreur / Danger (Rouge) - Texte blanc
    error: "bg-error text-white hover:opacity-90",

    // Mise en avant (Jaune / Goldenrod)
    accent: "bg-accent text-gray-900 hover:opacity-90 shadow-sm",
};

const Button = (props) => {
    // * Desctructuration des props
    // + variant définit par défaut
    const { children,
        variant = "primary",
        className,
        id,
        onClick,
        disabled = false,
        type = "button"
    } = props;


    // * Récupération style spécifique
    // On utilise la prop `variant` pour aller piocher la bonne ligne dans l'objet `variants` défini plus haut.
   const variantClasses = variants[variant] || variants.primary; // Sécurité si on se trompe de nom

    return (
        <button
        type={type}
            onClick={onClick}
            id={id}
            disabled={disabled}
           className={`${baseClasses} ${variantClasses} ${className ?? ""}`}
        >
            {children}
        </button>
    )

};

export default Button

{/* Class merging)
On assemble 3 couches de style en une seule chaîne :
 - `baseClasses`    : Les fondations
 - `variantClasses` : Les couleurs de la variante .
 // - `className`      : Les finitions (les classes supplémentaires passées par le parent au cas par cas). */}