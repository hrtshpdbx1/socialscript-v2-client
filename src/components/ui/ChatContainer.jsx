// src/components/ui/ChatContainer.jsx

export default function ChatContainer({ children }) {
    return (
        // flex-1 pour prendre l'espace, overflow-y-auto pour le défilement interne
        <div className="flex-1 w-full overflow-y-auto px-4 py-6 md:px-8 bg-background flex flex-col space-y-6">
            {children}
        </div>
    );
}