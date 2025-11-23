"use client";

import React, { useState } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import Wheel to avoid SSR issues
const Wheel = dynamic(
    () => import("react-custom-roulette").then((mod) => mod.Wheel),
    { ssr: false }
);

const COLORS = [
    "#f472b6", // pink-400
    "#67e8f9", // cyan-300
    "#facc15", // yellow-400
    "#ffffff", // white
];

export default function FirstPlayerSelection() {
    const { players, setStartingPlayer, startActionPhase, startingPlayer } = useGameStore();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [spinComplete, setSpinComplete] = useState(false);

    const data = players.map((player, index) => ({
        option: `Player ${player.id}`,
        style: { backgroundColor: COLORS[index % COLORS.length], textColor: "black" },
    }));

    const handleSpinClick = () => {
        if (!mustSpin && !spinComplete) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        setSpinComplete(true);
        setStartingPlayer(players[prizeNumber].id);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter [-webkit-text-stroke:2px_black] text-white">
                    Who Goes First?
                </h1>
                <p className="text-xl font-bold">Spin to decide!</p>
            </div>

            <div className="relative">
                {/* Wheel Container with Border */}
                <div className="rounded-full border-4 border-black shadow-neo overflow-hidden bg-white">
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        onStopSpinning={handleStopSpinning}
                        backgroundColors={COLORS}
                        textColors={["black"]}
                        outerBorderColor="black"
                        outerBorderWidth={0}
                        innerRadius={0}
                        innerBorderColor="black"
                        innerBorderWidth={0}
                        radiusLineColor="black"
                        radiusLineWidth={2}
                        fontSize={20}
                        perpendicularText={true}
                        textDistance={60}
                        spinDuration={0.5}
                        pointerProps={{
                            style: {
                                fill: "#ef4444", // Red-500
                                transform: "translateY(24px)", // Move inside
                            }
                        }}
                    />
                </div>
            </div>

            {!spinComplete ? (
                <Button
                    onClick={handleSpinClick}
                    disabled={mustSpin}
                    className="w-auto px-12 py-6 text-3xl"
                >
                    {mustSpin ? "SPINNING..." : "SPIN!"}
                </Button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="text-center bg-white border-4 border-black p-4 rounded-2xl shadow-neo">
                        <p className="text-xl font-bold">Starting Player:</p>
                        <p className="text-3xl font-black text-pink-500">Player {startingPlayer}</p>
                    </div>
                    <Button onClick={startActionPhase} className="w-auto px-12 py-6 text-3xl">
                        START GAME
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
