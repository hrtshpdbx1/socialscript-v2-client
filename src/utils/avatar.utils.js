// Utility centralisée pour générer les URLs d'avatars DiceBear
// Centralise pour pouvoir changer le style ou les couleurs globalement

// Palette de fonds pastel qui s'accordent bien avec le thème
const AVATAR_BG_COLORS = [
    "e8e0fc", // lavande clair (proche du primary)
    "ffe9c4", // crème (proche de l'accent)
    "d4f5e0", // vert d'eau (proche du success)
    "ffd5dc", // rose poudré
    "b6e3f4", // bleu ciel
    "ffdfbf", // pêche
];

/**
 * Génère l'URL d'un avatar DiceBear à partir d'un seed.
 * Le fond est choisi de manière déterministe par DiceBear selon le seed.
 * 
 * @param {string} seed - L'identifiant qui détermine l'avatar (ex: user._id ou characterAvatarSeed)
 * @returns {string} L'URL complète de l'avatar SVG
 */
export function getAvatarUrl(seed) {
    if (!seed) return null;
    
    const params = new URLSearchParams({
        seed,
        backgroundColor: AVATAR_BG_COLORS.join(",")
    });
    
    return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}