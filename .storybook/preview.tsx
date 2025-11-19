import { addons } from "@storybook/preview-api";
import type { Preview } from "@storybook/react";
// import { AppRouterContext } from "next/client/router-context";
import { initialize, mswDecorator } from "msw-storybook-addon";
import React, { useCallback, useEffect } from "react";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider } from "../src/components/theme-provider";
import "../src/app/globals.css";

initialize();

const channel = addons.getChannel();

const ColorSchemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const handleColorScheme = useCallback((value: boolean) => {
        const root = document.documentElement;
        if (value) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, []);
    useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
        return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
    }, [handleColorScheme]);
    return <>{children}</>;
};

export const decorators = [
    (renderStory: () => React.ReactNode) => (
        <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
    ),
    (renderStory: () => React.ReactNode) => (
        <ThemeProvider>{renderStory()}</ThemeProvider>
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
        nextjs: {
            appDirectory: true,
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
