"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { Button } from "@/components/ui/Button";
import { motion, useAnimation } from "framer-motion";
import { RotateCw, RefreshCw } from "lucide-react";

export default function ActionPhase() {
    const { players, startingPlayer, spinWheel, resetGame } = useGameStore();
    const controls = useAnimation();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSpin = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        spinWheel();
    };

    useEffect(() => {
        if (startingPlayer !== null) {
            const playerIndex = players.findIndex((p) => p.id === startingPlayer);
            const segmentAngle = 360 / players.length;

            const randomSpins = 5 + Math.floor(Math.random() * 3);
            const targetRotation = 360 * randomSpins - (playerIndex * segmentAngle + segmentAngle / 2) - 90;

            controls.start({
                rotate: targetRotation,
                transition: { duration: 4, ease: [0.1, 0, 0.2, 1] },
            }).then(() => {
                setIsSpinning(false);
            });
        }
    }, [startingPlayer, players, controls]);

    const colors = ["#fca5a5", "#93c5fd", "#86efac", "#fde047", "#d8b4fe", "#fdba74"];

    return (
        <div className="flex flex-col items-center justify-between w-full h-full py-6 px-4">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white [-webkit-text-stroke:2px_black]">
                    Who Starts?
                </h1>
                <p className="text-xl font-bold">Spin the wheel to decide!</p>
            </div>

            <div className="relative w-72 h-72">
                {/* Pointer */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-black drop-shadow-lg" />

                {/* Wheel Container */}
                <div className="w-full h-full rounded-full border-4 border-black shadow-neo bg-white overflow-hidden relative">
                    <motion.div
                        className="w-full h-full"
                        animate={controls}
                        style={{ rotate: 0 }}
                    >
                        {/* Segments using Conic Gradient */}
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: `conic-gradient(${players.map((p, i) =>
                                    `${colors[i % colors.length]} ${i * (100 / players.length)}% ${(i + 1) * (100 / players.length)}%`
                                ).join(', ')})`
                            }}
                        />

                        {/* Numbers/Labels */}
                        {players.map((player, index) => {
                            const angle = 360 / players.length;
                            const rotation = index * angle + angle / 2;
                            return (
                                <div
                                    key={player.id}
                                    className="absolute top-0 left-1/2 w-1 h-1/2 -ml-0.5 origin-bottom flex justify-center pt-6"
                                    style={{ transform: `rotate(${rotation}deg)` }}
                                >
                                    <span
                                        className="font-black text-xl bg-white w-8 h-8 flex items-center justify-center border-2 border-black rounded-full shadow-sm"
                                        style={{ transform: `rotate(${-rotation}deg)` }}
                                    >
                                        {player.id}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <div className="h-24 flex items-center justify-center w-full">
                {startingPlayer !== null && !isSpinning && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-center bg-white border-4 border-black p-4 rounded-2xl shadow-neo"
                    >
                        <h2 className="text-2xl font-black">Player {startingPlayer}</h2>
                        <p className="text-lg font-bold">starts the questioning!</p>
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col gap-4 w-full mt-auto">
                <Button onClick={handleSpin} disabled={isSpinning} className="w-full py-4 text-xl rounded-full">
                    {isSpinning ? "SPINNING..." : "SPIN THE WHEEL"}
                    <RotateCw className={`ml-2 w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
                </Button>

                <Button onClick={resetGame} variant="danger" className="w-full py-4 text-xl rounded-full">
                    NEW GAME
                    <RefreshCw className="ml-2 w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}
