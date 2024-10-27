import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@chakra-ui/storybook-addon",
        "storybook-addon-next-router",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    features: {
        // emotionAlias: false,
        // interactionsDebugger: true,
    },
    staticDirs: ["../public"],
};
export default config;
