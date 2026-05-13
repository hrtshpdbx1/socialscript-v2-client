// src/pages/Resources.jsx

import { useState, useEffect } from "react";
import { Search, ExternalLink, Loader2 } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { resourceService } from "../services/resource.service";

export default function Resources() {

  // --- ÉTATS ---
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingResources, setLoadingResources] = useState(false);
  const [error, setError] = useState(null);

  // --- 1. CHARGEMENT INITIAL (Catégories) ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await resourceService.getCategories();
        const cats = data.categories;
        setCategories(cats);

       setSelectedCategory('all');

      } catch (err) {
        console.error(err); 
        setError("Impossible de charger les catégories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // --- 2. CHARGEMENT DES RESSOURCES ---
  // fetchResources
useEffect(() => {
    if (!selectedCategory) return;

    const fetchResources = async () => {
      setLoadingResources(true);
      try {
        let data;
        // 👇 On vérifie si on veut tout ou juste une catégorie
        if (selectedCategory === 'all') {
            data = await resourceService.getAll();
        } else {
            data = await resourceService.getByCategory(selectedCategory);
        }
        
        setResources(data.resources || data); 

      } catch (err) {
        console.error(err);
        setError("Impossible de charger les ressources.");
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, [selectedCategory]);

  // --- 3. RECHERCHE CÔTÉ CLIENT ---
  const filteredResources = resources.filter((res) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = (res.title || "").toLowerCase().includes(searchLower);
    const descMatch = (res.theme || res.description || "").toLowerCase().includes(searchLower);
    return titleMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-16">

      {/* Titre principal */}
      <div className="w-full text-center mt-12 md:mt-16 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-nunito">Ressources</h1>
      </div>

      {/* SECTION 1 */}
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 mb-20">

        {/* BIG CARD 1 */}
        <div className="flex-1 flex flex-col items-center text-center p-2 max-w-[500px] mx-auto w-full gap-3 z-10">
            <img 
              src="/illustrations/help.jpg" 
              alt="Etre accompagné·e" 
            
              className="w-full h-auto object-cover max-h-56 md:max-h-64 mb-4 rounded-3xl shadow-sm"
            />
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-nunito mt-2">
              Etre accompagné·e
            </h2>
            <h3 className="text-2xl font-extrabold text-gray-900 font-nunito mb-1">
              Praticien·nes et pair-aidant·es
            </h3>
            <p className="text-gray-600 font-nunito text-sm leading-relaxed mb-6 flex-1">
              Liste collaborative élaborée par le <a href="https://collectifautiste.be/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Collectif Autisme de Belgique</a> regroupant les praticien·nes spécialisé·es, les centres pluridisciplinaires, les services d'accompagnement et d'aide à l'intégration et des groupes d'adultes autistes.
            </p>
            <Button 
              variant="primary" 
              className="w-full sm:w-auto px-8 flex items-center justify-center gap-2"
              onClick={() => window.open('https://docs.google.com/spreadsheets/d/1isN4nbu5W6_UckRKyDF2Pm7B4lyfk_hVZ2w0WHcuWAU/edit?gid=0#gid=0', '_blank')}
            >
              Consulter la liste complète
              <ExternalLink className="w-4 h-4" />
            </Button>
        </div>

        {/* BIG CARD 2 */}
        <div className="flex-1 flex flex-col items-center text-center p-2 max-w-[500px] mx-auto w-full gap-3 z-10">
            <img 
              src="/illustrations/understand.jpg" 
              alt="S'informer" 
              // 👇 Ajout de rounded-3xl et object-cover
              className="w-full h-auto object-cover max-h-56 md:max-h-64 mb-4 rounded-3xl shadow-sm"
            />
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-nunito mt-2">
              S'informer
            </h2>
            <h3 className="text-2xl font-extrabold text-gray-900 font-nunito mb-1">
              Comprendre l'autisme
            </h3>
            <p className="text-gray-600 font-nunito text-sm leading-relaxed mb-6 flex-1">
              Plateforme en ligne qui propose des articles de vulgarisation scientifique et des synthèses de recherches récentes sur l'autisme. Le site démystifie de nombreuses idées reçues et offre des informations fiables, accessibles et régulièrement mises à jour.
            </p>
            <Button 
              variant="primary" 
              className="w-full sm:w-auto px-12 flex items-center justify-center gap-2"
              onClick={() => window.open('https://comprendrelautisme.com/', '_blank')}
            >
              Vers le site
              <ExternalLink className="w-4 h-4" />
            </Button>
        </div>

      </div>


      {/* SECTION 2 : FILTRES & GRILLE DE RESSOURCES */}
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">

        {/* SIDEBAR GAUCHE */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">

          <h4 className="font-extrabold text-xl text-gray-900 font-nunito hidden md:block">
            Parcourir les ressources
          </h4>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-nunito"
            />
          </div>

          {/* Filtres Façon "Badge" */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 font-nunito px-2 md:px-0">
              Catégories
            </h2>

            {loadingCategories ? (
              <div className="flex justify-center p-4 md:justify-start"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : (
            
              <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`inline-block px-4 py-2 text-xs font-bold rounded-full uppercase tracking-wide transition-all ${
                    selectedCategory === 'all'
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105"
                    }`}
                >
                    Tout afficher
                </button>
                
                {categories.map(category => {
                  const isActive = selectedCategory === category._id;
                  return (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                    
                      className={`inline-block px-4 py-2 text-xs font-bold rounded-full uppercase tracking-wide transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md scale-105" // Actif : Fond plein
                          : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105" // Inactif : Style Badge par défaut
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* CONTENU PRINCIPAL DROIT */}
        <main className="flex-1">
          {error && <p className="text-error font-nunito bg-error-100 p-4 rounded-xl">{error}</p>}

          {loadingResources ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="font-nunito">Chargement des ressources...</p>
            </div>
          ) : (
            <>
              {filteredResources.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                  <p className="text-gray-500 font-nunito text-lg">Aucune ressource ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                  {filteredResources.map((resource) => (
                    <Card key={resource._id} className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">

                  
                      <div className="w-full h-16 mb-4 flex items-center justify-center">
                        <img 
                          // Si l'API renvoie une image on l'utilise, sinon on met un placeholder
                          src={resource.imageUrl || "https://placehold.co/300x150/f8fafc/94a3b8?text=Image"} 
                          alt={resource.title}
                          className="max-h-[60px] max-w-full object-contain"
                          style={{ filter: "grayscale(100%) contrast(1.1)" }}
                        />
                      </div>

                      {/* Contenu textuel */}
                      <h3 className="font-extrabold text-lg text-gray-900 font-nunito mb-2 line-clamp-2 text-center">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 font-nunito text-sm mb-6 flex-1 line-clamp-3 text-center">
                        {resource.theme || resource.description}
                      </p>

                      {/* Bouton d'action */}
                      <Button
                        variant="outline_primary"
                        className="w-full mt-auto flex items-center justify-center gap-2"
                        onClick={() => window.open(resource.link1, '_blank')}
                      >
                        Visiter
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
}