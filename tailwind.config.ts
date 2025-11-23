import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        'bg-blue-500',
        'bg-blue-600',
        'text-white',
    ],
    theme: {
        extend: {
            boxShadow: {
                neo: "4px 4px 0px 0px #000",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} as any;
export default config;

