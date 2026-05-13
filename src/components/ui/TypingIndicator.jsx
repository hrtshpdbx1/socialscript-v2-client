export default function TypingIndicator({ avatarUrl, senderName = "L'interlocuteur" }) {
    return (
        <div className="flex w-full justify-start animate-fade-in-up mb-2" role="status" aria-label={`${senderName} est en train d'écrire`}>
            {avatarUrl && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 mr-3 self-end mb-1 bg-white">
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5 h-[44px]" aria-hidden="true">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    );
}