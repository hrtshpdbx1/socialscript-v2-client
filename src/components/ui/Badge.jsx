// src/components/ui/Badge.jsx

export default function Badge({ text, color = 'primary' }) {
  // On mappe (associe) les couleurs à leurs classes Tailwind exactes
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/30 text-blue-900", 
    accent: "bg-accent/30 text-yellow-900",
    success: "bg-success/20 text-green-900",
  };

  // Si on passe une couleur qui n'existe pas, on met primary par défaut
  const appliedStyle = colorStyles[color] || colorStyles.primary;

  return (
    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${appliedStyle}`}>
      {text}
    </span>
  );
}

// Comment l'utiliser
{/* <Badge text="Nouveau" color="accent" />
<Badge text="Facile" color="success" /> */}