import { AppRouterContext } from "next/dist/shared/lib/app-router-context";
import { initialize, mswDecorator } from "msw-storybook-addon";
import type { Preview, StoryFn } from "@storybook/react";

export const decorators = [mswDecorator];

initialize();

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
      ]
    },
    nextRouter: {
      Provider: AppRouterContext.Provider
    },
  },
};

export default preview;

export const NotLoggedIn: StoryFn = {
  parameters: {
    msw: {
      handlers: [
        // rest.get("/api/my/profile", async (_, res, ctx) => {
        //   return res(ctx.status(401));
        // }),
      ],
    },
  },
};