import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    important: true,
    corePlugins: {
        preflight: false,
    },
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx,jsx,js,mdx}",
        "./components/**/*.{ts,tsx,jsx,js,mdx}",
        "./app/**/*.{ts,tsx,jsx,js,mdx}",
        "./src/**/*.{ts,tsx,jsx,js,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    50: "#ebf8ff",
                    100: "#bee3f8",
                    200: "#90cdf4",
                    300: "#63b3ed",
                    400: "#4299e1",
                    500: "#3182ce",
                    600: "#2b6cb0",
                    700: "#2c5282",
                    800: "#2a4365",
                    900: "#1A365D",
                },
                // Cyan
                secondary: {
                    50: "#EDFDFD",
                    100: "#C4F1F9",
                    200: "#9DECF9",
                    300: "#76E4F7",
                    400: "#0BC5EA",
                    500: "#00B5D8",
                    600: "#00A3C4",
                    700: "#0987A0",
                    800: "#086F83",
                    900: "#065666",
                },
                "black-alpha-100": "rgba(0, 0, 0, 0.06)",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                // primary: {
                //     DEFAULT: "hsl(var(--primary))",
                //     foreground: "hsl(var(--primary-foreground))",
                // },
                // secondary: {
                //     DEFAULT: "hsl(var(--secondary))",
                //     foreground: "hsl(var(--secondary-foreground))",
                // },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
