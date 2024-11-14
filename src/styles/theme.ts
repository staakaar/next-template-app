import { createTheme } from "@mantine/core";

const theme = createTheme({
    fontFamily: "serif",
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
