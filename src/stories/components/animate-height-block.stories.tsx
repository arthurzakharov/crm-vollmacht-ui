import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AnimateHeight } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

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
      <div
        style={{
          height: 300,
          backgroundImage:
            "linear-gradient(45deg, #d3d3d3 25%, transparent 25%, transparent 50%, #d3d3d3 50%, #d3d3d3 75%, transparent 75%, transparent 100%)",
          backgroundSize: "56.57px 56.57px",
        }}
      />
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
