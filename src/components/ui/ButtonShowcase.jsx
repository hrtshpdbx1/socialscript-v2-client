// ButtonShowcase.jsx
import Button from './Button';

const ButtonShowcase = () => {
  return (
    <div className="p-8 bg-background min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Collection de Boutons</h2>
      
      <div className="flex flex-wrap gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        
        {/* Actions principales */}
        <Button variant="primary">Créer un compte</Button>
        <Button variant="secondary">En savoir plus</Button>
        <Button variant="accent">Offre Premium</Button>

        {/* Actions alternatives */}
        <Button variant="outline">Annuler</Button>
          <Button variant="outline_primary">Annuler</Button>
        <Button variant="ghost">Passer cette étape</Button>

        {/* Retours d'état */}
        <Button variant="success">Sauvegardé</Button>
        <Button variant="error">Supprimer définitivement</Button>

        {/* Test de l'état désactivé */}
        <Button variant="primary" disabled>Chargement...</Button>

      </div>
    </div>
  );
};

export default ButtonShowcase;