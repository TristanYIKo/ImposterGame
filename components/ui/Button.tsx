"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "danger";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", children, ...props }, ref) => {
        const variants = {
            primary: "bg-pink-500 text-white hover:bg-pink-600",
            secondary: "bg-cyan-300 text-black hover:bg-cyan-400",
            danger: "bg-red-500 text-white hover:bg-red-600",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "px-8 py-4 font-black text-lg border-4 border-black shadow-neo transition-all rounded-full active:shadow-none active:translate-x-[4px] active:translate-y-[4px] overflow-visible",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
