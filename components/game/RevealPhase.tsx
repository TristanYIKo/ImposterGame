"use client";

import { useState } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RevealPhase() {
    const { players, currentRevealIndex, secretWord, settings, nextReveal } =
        useGameStore();
    const [isFlipped, setIsFlipped] = useState(false);

    const currentPlayer = players[currentRevealIndex];

    const handleReveal = () => {
        setIsFlipped(true);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            nextReveal();
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative gap-8">
            {/* Card Container - Big & Centered */}
            <div className="relative w-[340px] h-[420px] perspective-1000 z-10">
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front (Safety Screen) */}
                    <Card
                        className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-6 bg-white rounded-3xl border-4 border-black shadow-neo"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-black uppercase">
                                Player {currentPlayer.id}
                            </h2>
                            <p className="text-xl font-bold">Tap to Reveal</p>
                        </div>
                        <Eye className="w-24 h-24" />
                        <Button onClick={handleReveal} className="w-auto px-8 py-4 text-xl">
                            REVEAL
                        </Button>
                    </Card>

                    {/* Back (Secret Screen) */}
                    <Card
                        className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-6 rounded-3xl border-4 border-black ${currentPlayer.role === "imposter" ? "bg-pink-400 text-white" : "bg-cyan-300 text-black"
                            }`}
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            boxShadow: "-4px 4px 0px 0px #000", // Counteract rotation so shadow stays bottom-right visually
                        }}
                    >
                        <div className="text-center space-y-4 w-full px-4">
                            <h2 className="text-3xl font-black uppercase">
                                {currentPlayer.role === "imposter" ? "YOU ARE THE" : "SECRET WORD"}
                            </h2>

                            {currentPlayer.role === "imposter" ? (
                                <div className="space-y-2">
                                    <h1 className="text-5xl font-black uppercase tracking-tighter [-webkit-text-stroke:2px_black]">
                                        IMPOSTER
                                    </h1>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-xl font-bold uppercase opacity-80">
                                        Category: {settings.category}
                                    </p>
                                    <h1 className="text-4xl font-black uppercase tracking-tighter break-words [-webkit-text-stroke:2px_black] text-white">
                                        {secretWord}
                                    </h1>
                                </div>
                            )}
                        </div>

                        <EyeOff className="w-16 h-16" />

                        <Button
                            onClick={handleNext}
                            variant={currentPlayer.role === "imposter" ? "secondary" : "primary"}
                            className="w-auto px-8 py-4 text-xl"
                        >
                            GOT IT
                        </Button>
                    </Card>
                </motion.div>
            </div>

            {/* Player Counter Text (Relative Below Card) */}
            <div className="text-center pointer-events-none z-0">
                <p className="font-black text-xl bg-white border-4 border-black px-8 py-3 rounded-full shadow-neo inline-block">
                    Player {currentRevealIndex + 1} of {players.length}
                </p>
            </div>
        </div>
    );
}
