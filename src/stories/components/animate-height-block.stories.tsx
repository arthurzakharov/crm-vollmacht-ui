import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AnimateHeight } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import Placeholder from "../helpers/placeholder";

type Story = StoryObj<typeof AnimateHeight>;

const meta: Meta<typeof AnimateHeight> = {
  title: "COMPONENTS/AnimateHeight",
  component: AnimateHeight,
  decorators: [MaxWidthDecorator],
  parameters: {
    MaxWidthDecorator: 768,
  },
  args: {
    closed: false,
    animateOpacity: true,
    duration: 1000,
    delay: 500,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  render: (args) => (
    <AnimateHeight {...args}>
      <Placeholder />
    </AnimateHeight>
  ),
};

export const Closed: Story = {
  name: "Closed",
  args: {
    closed: true,
  },
};

export const Opened: Story = {
  name: "Opened",
  args: {
    closed: false,
  },
};

export const DefaultValues: Story = {
  name: "DefaultValues",
  args: {
    animateOpacity: undefined,
    duration: undefined,
    delay: undefined,
    easing: undefined,
  },
};

export default meta;
