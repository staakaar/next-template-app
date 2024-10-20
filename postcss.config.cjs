module.exports = {
    plugins: {
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
        "postcss-import": {},
        "tailwindcss/nesting": "postcss-nesting",
        tailwindcss: {},
        "postcss-preset-env": {
            features: { "nesting-rules": false },
        },
        autoprefixer: {},
    },
};
