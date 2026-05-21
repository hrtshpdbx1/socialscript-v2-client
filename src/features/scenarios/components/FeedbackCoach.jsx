// src/features/scenarios/components/FeedbackCoach.jsx
export default function FeedbackCoach({ analysis, consequence, keyTakeaway }) {
    return (
        <div className="flex w-full justify-center my-6 animate-fade-in-up">
            <div 
                className="bg-[#fff9e6] border-2 border-accent rounded-2xl p-5 md:p-6 max-w-3xl w-full shadow-sm relative overflow-hidden"
                role="status"
                aria-label="Feedback du coach"
            >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-xl border border-accent/30" aria-hidden="true">
                        💡
                    </div>
                    <h3 className="font-bold text-gray-900 font-nunito text-lg">Analyse</h3>
                </div>

                <p className="text-gray-800 font-nunito leading-relaxed mb-2 relative z-10">
                    {analysis}
                </p>
                
                {consequence && (
                    <p className="text-gray-800 font-nunito leading-relaxed mb-5 relative z-10">
                        <strong>Conséquence :</strong> {consequence}
                    </p>
                )}

                {keyTakeaway && (
                    <div className="bg-white/80 p-4 rounded-xl border border-accent/20 relative z-10">
                        <h4 className="font-bold text-gray-900 font-nunito mb-1 flex items-center gap-2">
                            <span aria-hidden="true">📌</span> À retenir :
                        </h4>
                        <p className="text-gray-700 font-nunito">{keyTakeaway}</p>
                    </div>
                )}
            </div>
        </div>
    );
}