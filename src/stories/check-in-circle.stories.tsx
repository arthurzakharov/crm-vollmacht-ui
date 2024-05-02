import type { Meta, StoryObj } from "@storybook/react";
import CheckInCircle from "../icons/check-in-circle";
import IconDecorator from "./decorators/icon-decorator";

type Story = StoryObj<typeof CheckInCircle>;

const meta: Meta<typeof CheckInCircle> = {
  title: "ICONS/CheckInCircle",
  component: CheckInCircle,
  decorators: [IconDecorator],
};

export const Default: Story = {
  name: "CheckInCircle",
};

export default meta;
