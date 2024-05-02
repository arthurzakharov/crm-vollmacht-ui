import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NavigationButton } from "../components";

type Story = StoryObj<typeof NavigationButton>;

const meta: Meta<typeof NavigationButton> = {
  title: "NavigationButton",
  component: NavigationButton,
};

export const Default: Story = {
  name: "NavigationButton",
  args: {
    type: "forward",
    text: "",
    disabled: false,
    onClick: fn(),
  },
};

export default meta;
