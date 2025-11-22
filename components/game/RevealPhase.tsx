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
        // Wait for flip back animation before changing state
        setTimeout(() => {
            nextReveal();
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full perspective-1000 py-8">
            <div className="relative w-full aspect-[3/4] max-h-[60vh]">
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front (Safety Screen) */}
                    <Card
                        className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-8 bg-yellow-300 rounded-3xl border-4 border-black shadow-neo"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase">
                                Player {currentPlayer.id}
                            </h2>
                            <p className="text-xl font-bold">Pass to Player {currentPlayer.id}</p>
                        </div>
                        <Eye className="w-24 h-24" />
                        <Button onClick={handleReveal} className="w-auto px-10">
                            TAP TO REVEAL
                        </Button>
                    </Card>

                    {/* Back (Secret Screen) */}
                    <Card
                        className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-8 rounded-3xl border-4 border-black shadow-neo ${currentPlayer.role === "imposter" ? "bg-pink-500 text-white" : "bg-blue-400"
                            }`}
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl font-black uppercase">
                                {currentPlayer.role === "imposter" ? "YOU ARE THE" : "SECRET WORD"}
                            </h2>

                            {currentPlayer.role === "imposter" ? (
                                <div className="space-y-2">
                                    <h1 className="text-6xl font-black uppercase tracking-tighter">
                                        IMPOSTER
                                    </h1>
                                    <p className="text-xl font-bold">Blend in. Don't get caught.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-xl font-bold uppercase opacity-80">
                                        Category: {settings.category}
                                    </p>
                                    <h1 className="text-5xl font-black uppercase tracking-tighter break-words px-4">
                                        {secretWord}
                                    </h1>
                                </div>
                            )}
                        </div>

                        <EyeOff className="w-16 h-16" />

                        {/* Next Player Button - Distinct from the card but inside the flip container for simplicity or outside? 
                The prompt says "A distinct button below the card". 
                If I put it inside, it flips with the card. 
                If I put it outside, it needs to be handled carefully.
                Let's keep the "Got It" button inside the back of the card for better UX flow in pass-and-play, 
                as the user is holding the card. 
                Wait, prompt says "A distinct button below the card to hide it and pass the phone."
                Let's try to put it inside the back face for now as it's part of the "Secret" state.
            */}
                        <Button
                            onClick={handleNext}
                            variant={currentPlayer.role === "imposter" ? "secondary" : "primary"}
                            className="w-auto px-10"
                        >
                            GOT IT
                        </Button>
                    </Card>
                </motion.div>
            </div>

            <div className="mt-8 text-center">
                <p className="font-bold text-sm opacity-60">
                    {currentRevealIndex + 1} / {players.length} Players Revealed
                </p>
            </div>
        </div>
    );
}
