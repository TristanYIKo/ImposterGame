import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: "white" | "blue";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, color = "white", children, ...props }, ref) => {
        const bgColors = {
            white: "bg-white",
            blue: "bg-blue-400",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "p-6 border-4 border-black shadow-neo rounded-3xl",
                    bgColors[color],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

export { Card };
