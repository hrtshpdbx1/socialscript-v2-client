// src/components/ui/TypingIndicator.jsx

export default function TypingIndicator({ avatarUrl }) {
    return (
        <div className="flex w-full justify-start animate-fade-in-up mb-2">
            
            {/* Avatar de l'IA */}
            {avatarUrl && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 mr-3 self-end mb-1 bg-white">
                    <img src={avatarUrl} alt="En train d'écrire..." className="w-full h-full object-cover" />
                </div>
            )}

            {/* Bulle avec les 3 points */}
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5 h-[44px]">
                {/* Délais d'animation différents créent l'effet de vague */}
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            
        </div>
    );
}