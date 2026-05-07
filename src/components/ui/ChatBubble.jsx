// src/components/ui/ChatBubble.jsx

export default function ChatBubble({ text, isUser, senderName, avatarUrl }) {
    return (
        <div className={`flex w-full animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}>
            
            {/* Affichage de l'avatar UNIQUEMENT si c'est l'IA (isUser = false) */}
            {!isUser && avatarUrl && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 mr-3 self-end mb-1 bg-white">
                    <img src={avatarUrl} alt={`Avatar de ${senderName}`} className="w-full h-full object-cover" />
                </div>
            )}

            {/* La Bulle */}
            <div 
                className={`max-w-[80%] md:max-w-[70%] px-5 py-3 shadow-sm ${
                    isUser 
                    // Style Utilisateur (Bleu/Violet, aligné à droite)
                    ? "bg-primary text-white rounded-2xl rounded-br-sm" 
                    // Style IA (Blanc/Gris, aligné à gauche)
                    : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm"
                }`}
            >
                {/* Affichage du nom au-dessus du texte si c'est l'IA */}
                {!isUser && senderName && (
                    <p className="text-xs font-bold text-gray-400 mb-1 font-nunito">
                        {senderName}
                    </p>
                )}
                
                <p className="font-nunito leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}