// Button.jsx
import { NavLink } from 'react-router';

// Classes de base
const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-4xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

// Dictionaire des variantes
const variants = {
    primary: "bg-primary text-white hover:opacity-90 shadow-sm",
    secondary: "bg-secondary text-gray-900 hover:opacity-90",
    outline: "border-1 border-gray-700 text-gray-700 hover:bg-secondary ",
    outline_primary: "border-1 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200",
    success: "bg-success text-gray-900 hover:opacity-90",
    error: "bg-error text-white hover:opacity-90",
    accent: "bg-accent text-gray-900 hover:opacity-90 shadow-sm",
};

const Button = (props) => {
    // * Destructuration des props
    // Ajout de la prop 'to'
    const {
        children,
        variant = "primary",
        className,
        id,
        onClick,
        disabled = false,
        type = "button",
        to,
        href,
        ...rest
    } = props;

    // * Récupération du style spécifique
    const variantClasses = variants[variant] || variants.primary;

    // * Gestion du disabled pour les liens
    const linkDisabledClasses = (disabled && to)
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "";

    // On regroupe les props communes pour éviter de se répéter
    const commonProps = {
        onClick,
        id,
        "aria-disabled": disabled,
        className: `${baseClasses} ${variantClasses} ${linkDisabledClasses} ${className ?? ""}`,
        ...rest
    };

    //  Si la prop 'to' existe -> on rend un <NavLink>
    if (to) {
        return (
            <NavLink to={to} {...commonProps}>
                {children}
            </NavLink>
        );
    }

    // Si la prop 'href' existe -> on rend une balise <a> classique
    if (href) {
        return (
            <a href={href} {...commonProps}>
                {children}
            </a>
        );
    }
    // Sinon, on rend un bouton classique
    return (
        <button
            type={type}
            disabled={disabled}
            {...commonProps}
        >
            {children}
        </button>
    );
};

export default Button;