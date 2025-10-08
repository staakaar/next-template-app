import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { addons } from "@storybook/preview-api";
import type { Preview, StoryFn } from "@storybook/react";
// import { AppRouterContext } from "next/client/router-context";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { useEffect } from "react";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import theme from "../src/styles/theme";

initialize();

const channel = addons.getChannel();

const ColorSchemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { setColorScheme } = useMantineColorScheme();
    const handleColorScheme = (value: boolean) =>
        setColorScheme(value ? "dark" : "light");

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
        return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
    }, [channel]);

    return <>{children}</>;
};

export const decorators = [
    (renderStory: any) => (
        <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
    ),
    (renderStory: any) => (
        <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
    ),
    mswDecorator,
];

// Global Settings
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        msw: {
            handlers: [
                // rest.get("/api/my/profile", async (_, res, ctx) => {
                //   return res(
                //     ctx.status(200),
                //     ctx.json({})
                //   )
                // })
            ],
        },
        // nextRouter: {
        //     Provider: AppRouterContext.Provider,
        // },
    },
};

export default preview;

// export const NotLoggedIn: StoryFn = {
//     parameters: {
//         msw: {
//             handlers: [
//                 // rest.get("/api/my/profile", async (_, res, ctx) => {
//                 //   return res(ctx.status(401));
//                 // }),
//             ],
//         },
//     },
// };
