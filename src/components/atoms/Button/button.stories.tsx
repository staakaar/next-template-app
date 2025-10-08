import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
    title: "Atoms/Button",
    component: Button,
    args: {
        children: "Button",
    },
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
    args: {
        variant: "filled",
        color: "blue",
    },
};

export const Light: Story = {
    args: {
        variant: "light",
        color: "blue",
    },
};

export const Subtle: Story = {
    args: {
        variant: "subtle",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
        </div>
    ),
};

export const WithIcon: Story = {
    args: {
        children: "With Icon",
        leftSection: <span>★</span>,
    },
};

export const InteractionTest: Story = {
    args: {
        children: "Click me",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = await canvas.findByRole("button", { name: /click me/i });
        await userEvent.click(button);
        await expect(button).toBeInTheDocument();
    },
};
