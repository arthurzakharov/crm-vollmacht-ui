import type { Meta, StoryObj } from "@storybook/react";
import { StatusIcon } from "../../components";

type Story = StoryObj<typeof StatusIcon>;

const meta: Meta<typeof StatusIcon> = {
  title: "COMPONENTS/StatusIcon",
  component: StatusIcon,
};

export const Default: Story = {
  name: "StatusIcon",
  args: {
    status: "success",
    size: "l",
    idle: false,
  },
};

export default meta;
