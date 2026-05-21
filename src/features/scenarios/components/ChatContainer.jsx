// src/features/scenarios/components/ChatContainer.jsx


export default function ChatContainer({ children }) {
    return (
        // flex-1 pour prendre l'espace, overflow-y-auto pour le défilement interne
        // tabIndex={0} permet au clavier de "rentrer" dans la zone et de scroller avec les flèches
        // role="log" + aria-live="polite" : les lecteurs d'écran annoncent les nouvelles bulles
        <div
            className="flex-1 w-full overflow-y-auto px-4 py-6 md:px-8 bg-background flex flex-col space-y-6 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset"
            tabIndex={0}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
        >
            {children}
        </div>
    );
}