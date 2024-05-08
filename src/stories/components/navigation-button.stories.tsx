import { Meta, StoryObj } from "@storybook/react";
import { fn, within, userEvent, expect } from "@storybook/test";
import NavigationButton from "@components/navigation-button";

type Story = StoryObj<typeof NavigationButton>;

const meta: Meta<typeof NavigationButton> = {
  title: "COMPONENTS/NavigationButton",
  component: NavigationButton,
};

export const TypeForward: Story = {
  name: "Type Forward",
  args: {
    type: "forward",
    text: "",
    disabled: false,
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Click in not disabled state", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await expect(args.onClick).toHaveBeenNthCalledWith(1);
    });
    await step("Button is not in focus after click", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await expect(canvas.getByRole("button")).not.toHaveFocus();
    });
  },
};

export const TypeBackward: Story = {
  name: "Type Backward",
  args: {
    type: "backward",
    text: "",
    disabled: false,
    onClick: fn(),
  },
};

export const WithCustomText: Story = {
  name: "WithCustomText",
  args: {
    type: "forward",
    text: "Some custom text",
    disabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    type: "forward",
    text: "",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Click in not disabled state", async () => {
      await userEvent.click(canvas.getByRole("button"));
      await expect(args.onClick).not.toBeCalled();
    });
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    type: "forward",
    text: undefined,
    disabled: undefined,
    onClick: fn(),
  },
};

export default meta;
