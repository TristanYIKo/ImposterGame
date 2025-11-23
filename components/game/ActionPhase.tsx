"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { RotateCw, RefreshCw } from "lucide-react";

export default function ActionPhase() {
    const { players, startingPlayer, spinWheel, resetGame } = useGameStore();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSpin = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        spinWheel();
    };

    useEffect(() => {
        if (startingPlayer !== null) {
            const timer = setTimeout(() => {
                setIsSpinning(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [startingPlayer]);

    const colors = ["#fca5a5", "#93c5fd", "#86efac", "#fde047", "#d8b4fe", "#fdba74"];

    return (
        <div className="flex flex-col items-center justify-between w-full h-full py-6 px-4">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white [-webkit-text-stroke:2px_black]">
                    Who Starts?
                </h1>
                <p className="text-xl font-bold">Spin the wheel to decide!</p>
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
