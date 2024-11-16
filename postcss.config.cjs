module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-import": {},
        "postcss-preset-mantine": {},
        "postcss-simple-vars": {
            variables: {
                "matine-breakpoint-xs": "36em",
                "matine-breakpoint-sm": "48em",
                "matine-breakpoint-md": "62em",
                "matine-breakpoint-lg": "75em",
                "matine-breakpoint-xl": "88em",
            },
        },
        "tailwindcss/nesting": "postcss-nesting",
        "postcss-preset-env": {
            features: { "nesting-rules": false },
        },
    },
};
