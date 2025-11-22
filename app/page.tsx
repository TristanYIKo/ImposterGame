"use client";

import { useGameStore } from "@/hooks/useGameStore";
import SetupPhase from "@/components/game/SetupPhase";
import RevealPhase from "@/components/game/RevealPhase";
import ActionPhase from "@/components/game/ActionPhase";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { phase } = useGameStore();

  return (
    <main className="w-full max-w-[400px] h-full max-h-[100dvh] flex flex-col items-center justify-center p-4 relative overflow-visible">
      <AnimatePresence mode="wait">
        {phase === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <SetupPhase />
          </motion.div>
        )}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <RevealPhase />
          </motion.div>
        )}
        {phase === "action" && (
          <motion.div
            key="action"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full"
          >
            <ActionPhase />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
