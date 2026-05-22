// src/components/AvatarSelector.jsx

import { useState, useEffect } from 'react';
import { Dices } from 'lucide-react';
import Button from './Button';


export default function AvatarSelector({ value, onChange }) {
    const [avatarOptions, setAvatarOptions] = useState([]);

    const generateAvatarOptions = () => {
        const randomNames = ["Felix", "Luna", "Jasper", "Cleo", "Buster", "Oliver", "Milo", "Bella", "Zoe", "Max", "Sam", "Charlie", "Leo", "Mia", "Ava"];
        const getSeed = () => randomNames[Math.floor(Math.random() * randomNames.length)] + Math.floor(Math.random() * 1000);

        const newOptions = [getSeed(), getSeed(), getSeed(), getSeed(), getSeed()];
        setAvatarOptions(newOptions);

        onChange(newOptions[0]);
    };

    useEffect(() => {
        generateAvatarOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <label className="font-bold text-gray-700 font-nunito block">Choisissez un avatar</label>
            <p className="text-sm text-gray-500 mt-2 font-nunito">Cliquez sur les dés pour voir d'autres visages.</p>
            <div className="flex items-center gap-3 overflow-x-auto p-6">
                {/* Les 3 propositions d'avatars */}
                {avatarOptions.map((seed, idx) => {
                    const isSelected = value === seed;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onChange(seed)}
                            aria-pressed={isSelected}
                            aria-label={`Sélectionner l'avatar ${idx + 1}`}

                            className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full overflow-hidden border-4 transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${isSelected
                                ? 'border-primary scale-110 shadow-md'
                                : 'border-transparent hover:border-primary/40 bg-white shadow-sm'
                                }`}
                        >
                            <img
                                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
                                alt=""
                                className="w-full h-full object-cover bg-gray-50"
                            />
                        </button>
                    );
                })}

                {/* Bouton pour rafraîchir les 3 choix */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={generateAvatarOptions}

                    className="ml-2 w-14 h-14 md:w-16 md:h-16 flex-shrink-0 p-0 flex items-center justify-center rounded-full bg-white border-gray-200 hover:bg-gray-50 hover:border-primary shadow-sm"
                    title="Générer 3 autres avatars"
                >
                    <Dices className="w-6 h-6 md:w-8 md:h-8 text-gray-500 hover:text-primary transition-colors" />
                </Button>
            </div>

        </div>
    );
}