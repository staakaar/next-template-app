import { StoryFn } from "@storybook/react";

export default {}
export const Succeed: StoryFn = {
    decorators: [createDecorator({ message: "成功しました", style: "succeed" })]
};

export const Failed: StoryFn = {
    decorators: [createDecorator({ message: "成功しました", style: "failed" })]
};

export const Busy: StoryFn = {
    decorators: [createDecorator({ message: "成功しました", style: "busy" })]
};