import { Meta, StoryObj } from "@storybook/react";
import { SidebarStep } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof SidebarStep>;

const meta: Meta<typeof SidebarStep> = {
  title: "COMPONENTS/SidebarStep",
  component: SidebarStep,
  parameters: {
    MaxWidthDecorator: 295,
  },
  decorators: [MaxWidthDecorator],
};

export const Correct: Story = {
  name: "Correct",
  args: {
    text: "Step form 1",
    isCorrect: true,
  },
};

export const NotCorrect: Story = {
  name: "Not Correct",
  args: {
    text: "Step form 1",
    isCorrect: false,
  },
};

export default meta;
