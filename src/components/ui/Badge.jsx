// src/components/ui/Badge.jsx

export default function Badge({ text, color = 'primary', className = '' }) {
  // On mappe (associe) les couleurs à leurs classes Tailwind exactes
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/30 text-blue-900", 
    accent: "bg-accent/30 text-yellow-900",
    success: "bg-success/20 text-green-900",
    darkSuccess: "bg-success text-white",
    error: "bg-error/20 text-red-900",
    white: "bg-white/20 text-white border border-white/40",
      onSuccess: "bg-white text-success-600 shadow-sm",
  };

  // Si on passe une couleur qui n'existe pas, on met primary par défaut
  const appliedStyle = colorStyles[color] || colorStyles.primary;

  // On ajoute ${className} à la fin pour permettre d'ajouter des marges spécifiques (ex: mb-4)
  return (
    <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider ${appliedStyle} ${className}`}>
      {text}
    </span>
  );
}