import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
};

const customTheme = extendTheme({
    colors: {
        // blue
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
    },
    fonts: {
        body: "system-ui, sans-serif",
        heading: "Georgia serif",
        mono: "Menlo, monospace",
    },
    fontSizes: {},
    breakpoints,
});

export default customTheme;
