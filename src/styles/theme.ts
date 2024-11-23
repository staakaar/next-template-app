import { createTheme } from "@mantine/core";

const theme = createTheme({
    fontFamily: "Arial sans-serif",
    fontFamilyMonospace: "Courier New, monospace",
    colors: {
        blue: [
            "#e7f5ff",
            "#d0ebff",
            "#a5d8ff",
            "#74c0fc",
            "#4dabf7",
            "#339af0",
            "#228be6",
            "#1c7ed6",
            "#1971c2",
            "#1864ab",
        ],
    },
    components: {
        TextInput: {
            styles: {
                input: {
                    border: "1px solid var(--mantine-color-gray-4)",
                    backgroundColor: "white",
                    "&:focus": {
                        borderColor: "var(--mantine-color-blue-5)",
                    },
                },
            },
        },
        Checkbox: {
            styles: {
                input: {
                    border: "1px solid var(--mantine-color-gray-4)",
                    backgroundColor: "white",
                    "&:checked": {
                        backgroundColor: "var(--mantine-color-blue-6)",
                        borderColor: "var(--mantine-color-blue-6)",
                    },
                },
                label: {
                    color: "var(--mantine-color-gray-7)",
                },
            },
        },
    },
});

export default theme;
