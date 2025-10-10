// ダミーのためTestProviderとしている

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Args, PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";
import { TestLayout } from "@/components/";
import { TestProvider } from "@/context/";

export const TestProviderDecorator = (
    Story: PartialStoryFn<ReactFramework, Args>
) => (
    <TestProvider>
        <Story />
    </TestProvider>
);

export const BasicLayoutDecorator = (
    Story: PartialStoryFn<ReactFramework, Args>
) => TestLayout(<Story />);

export const SPStory = {
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: "iphone6",
        },
        screenshot: {
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 1,
            },
            fullPage: false,
        },
    },
};
