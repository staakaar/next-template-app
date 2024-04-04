
export const Succeed: Story = {
    decorators: [createDecorator({ message: "成功しました", style: "succeed" })]
};

export const Failed: Story = {
    decorators: [createDecorator({ message: "成功しました", style: "failed" })]
};

export const Busy: Story = {
    decorators: [createDecorator({ message: "成功しました", style: "busy" })]
};