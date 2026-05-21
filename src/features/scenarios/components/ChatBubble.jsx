// src/features/scenarios/components/ChatBubble.jsx

export default function ChatBubble({ text, isUser, senderName, avatarUrl }) {
    const label = isUser ? "Vous" : senderName || "Interlocuteur";
    
    return (
        <div 
            className={`flex w-full animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}
            role="log"
        >
            {!isUser && avatarUrl && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 mr-3 self-end mb-1 bg-white">
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            <div 
                className={`max-w-[80%] md:max-w-[70%] px-5 py-3 shadow-sm ${
                    isUser 
                    ? "bg-primary text-white rounded-2xl rounded-br-sm" 
                    : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm"
                }`}
                aria-label={`${label} dit :`}
            >
                {!isUser && senderName && (
                    <p className="text-xs font-bold text-gray-500 mb-1 font-nunito" aria-hidden="true">
                        {senderName}
                    </p>
                )}
                <p className="font-nunito leading-relaxed">{text}</p>
            </div>
        </div>
    );
}