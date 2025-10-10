module.exports = {
    plugins: {
        "postcss-import": {},
        tailwindcss: {},
        autoprefixer: {},
        "tailwindcss/nesting": "postcss-nesting",
        "postcss-preset-env": {
            features: { "nesting-rules": false },
        },
    },
};
