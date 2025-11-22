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
        <div className="flex flex-col h-full w-full justify-between gap-6">
            <div className="text-center space-y-2 mt-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter">
                    The Imposter
                </h1>
                <p className="text-xl font-bold">Pass & Play Game</p>
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-4">
                {/* Player Count */}
                <Card className="space-y-4 bg-white">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-lg flex items-center gap-2">
                            <Users className="w-6 h-6" /> Players
                        </label>
                        <span className="font-black text-2xl">{settings.playerCount}</span>
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
                        className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-2 border-black"
                    />
                </Card>

                {/* Imposter Count */}
                <Card className="space-y-4 bg-white">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-lg flex items-center gap-2">
                            <UserX className="w-6 h-6" /> Imposters
                        </label>
                        <span className="font-black text-2xl">{settings.imposterCount}</span>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        value={settings.imposterCount}
                        onChange={(e) =>
                            setSettings({ imposterCount: parseInt(e.target.value) })
                        }
                        className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-2 border-black"
                    />
                </Card>

                {/* Category Selection */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase px-2">Category</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {(Object.keys(CATEGORIES) as CategoryKey[]).map((cat) => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategorySelect(cat)}
                                className={`
                  p-4 font-bold text-lg border-4 border-black shadow-neo transition-colors rounded-2xl
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

            <div className="space-y-4 pt-4 border-t-4 border-black bg-yellow-300 z-10">
                <div className="text-center font-bold text-lg border-2 border-black bg-white rounded-xl p-2 mx-4 shadow-[2px_2px_0px_0px_#000]">
                    {settings.playerCount} Players | {settings.imposterCount} Imposter{settings.imposterCount > 1 ? 's' : ''} | {settings.category}
                </div>
                <Button onClick={startGame} className="w-full text-2xl py-6 rounded-full">
                    START GAME
                </Button>
            </div>
        </div>
    );
}
