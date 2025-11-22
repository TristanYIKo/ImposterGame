"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { CATEGORIES, CategoryKey } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Users, UserX } from "lucide-react";

export default function SetupPhase() {
    const { settings, setSettings, startGame } = useGameStore();

    const handleCategorySelect = (category: CategoryKey) => {
        setSettings({ category });
    };

    return (
        <div className="flex flex-col h-full w-full justify-center gap-4 py-2">
            <div className="text-center space-y-1">
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                    The Imposter
                </h1>
                <p className="text-lg font-bold">Pass & Play Game</p>
            </div>

            <div className="flex flex-col gap-3 w-full">
                {/* Player Count */}
                <Card className="space-y-2 bg-white rounded-3xl p-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-base flex items-center gap-2">
                            <Users className="w-5 h-5" /> Players
                        </label>
                        <span className="font-black text-xl">{settings.playerCount}</span>
                    </div>
                    <input
                        type="range"
                        min={3}
                        max={15}
                        value={settings.playerCount}
                        onChange={(e) => {
                            const count = parseInt(e.target.value);
                            setSettings({
                                playerCount: count,
                                imposterCount: Math.min(settings.imposterCount, Math.ceil(count / 2) - 1),
                            });
                        }}
                        className="w-full h-5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-4 border-black"
                    />
                </Card>

                {/* Imposter Count */}
                <Card className="space-y-2 bg-white rounded-3xl p-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-base flex items-center gap-2">
                            <UserX className="w-5 h-5" /> Imposters
                        </label>
                        <span className="font-black text-xl">{settings.imposterCount}</span>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        value={settings.imposterCount}
                        onChange={(e) =>
                            setSettings({ imposterCount: parseInt(e.target.value) })
                        }
                        className="w-full h-5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-4 border-black"
                    />
                </Card>

                {/* Category Selection */}
                <div className="space-y-1">
                    <h2 className="text-xl font-black uppercase px-2 text-center">Category</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(CATEGORIES) as CategoryKey[]).map((cat) => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategorySelect(cat)}
                                className={`
                  py-2 px-1 font-bold text-base border-4 border-black shadow-neo transition-colors rounded-2xl truncate
                  ${settings.category === cat
                                        ? "bg-blue-400 text-black"
                                        : "bg-white text-gray-500 hover:bg-gray-50"
                                    }
                `}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-2 z-10 flex flex-col items-center">
                <div className="text-center font-bold text-base border-4 border-black bg-white rounded-2xl p-2 px-4 shadow-neo w-fit">
                    {settings.playerCount} Players | {settings.imposterCount} Imposter{settings.imposterCount > 1 ? 's' : ''} | {settings.category}
                </div>
                <Button onClick={startGame} className="text-xl py-4 px-10 w-auto">
                    START GAME
                </Button>
            </div>
        </div>
    );
}
