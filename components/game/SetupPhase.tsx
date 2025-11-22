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
        <div className="flex flex-col h-full w-full justify-between py-6 px-2">
            <div className="text-center space-y-1">
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white [-webkit-text-stroke:2px_black]">
                    The Imposter
                </h1>
                <p className="text-xl font-bold">Pass & Play Game</p>
            </div>

            <div className="flex flex-col gap-4 w-full">
                {/* Player Count */}
                <Card className="space-y-4 bg-white rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <label className="font-black text-xl flex items-center gap-2">
                            <Users className="w-6 h-6" /> Players
                        </label>
                        <span className="font-black text-3xl">{settings.playerCount}</span>
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
                        className="w-full h-6 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-4 border-black"
                        style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
                    />
                </Card>

                {/* Imposter Count */}
                <Card className="space-y-4 bg-white rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <label className="font-black text-xl flex items-center gap-2">
                            <UserX className="w-6 h-6" /> Imposters
                        </label>
                        <span className="font-black text-3xl">{settings.imposterCount}</span>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        value={settings.imposterCount}
                        onChange={(e) =>
                            setSettings({ imposterCount: parseInt(e.target.value) })
                        }
                        className="w-full h-6 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black border-4 border-black"
                        style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
                    />
                </Card>

                {/* Category Selection */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase px-2 text-center">Category</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {(Object.keys(CATEGORIES) as CategoryKey[]).map((cat) => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategorySelect(cat)}
                                className={`
                  py-3 px-2 font-black text-lg border-4 border-black shadow-neo transition-colors rounded-full truncate
                  ${settings.category === cat
                                        ? "bg-cyan-300 text-black"
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

            <div className="w-full flex justify-center pt-4">
                <Button onClick={startGame} className="text-2xl py-6 px-12 w-full max-w-xs">
                    START GAME
                </Button>
            </div>
        </div>
    );
}
