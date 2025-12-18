import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                slate: {
                    950: "#020617", // Primary Background
                    900: "#0f172a", // Secondary / Cards
                    800: "#1e293b", // Borders
                    50: "#f8fafc",  // Primary Text
                    400: "#94a3b8", // Secondary Text
                },
                gold: {
                    DEFAULT: "#D4AF37", // Premium Accent
                    light: "#E5C55D",
                    dark: "#B5952F",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('/images/hero-bg.jpg')", // Placeholder, will need a real image or gradient
            },
        },
    },
    plugins: [],
};
export default config;
