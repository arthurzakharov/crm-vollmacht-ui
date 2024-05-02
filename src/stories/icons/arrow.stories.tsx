import type { Meta, StoryObj } from "@storybook/react";
import Arrow from "../../icons/arrow";
import IconDecorator from "../decorators/icon-decorator";

type Story = StoryObj<typeof Arrow>;

const meta: Meta<typeof Arrow> = {
  title: "ICONS/Arrow",
  component: Arrow,
  decorators: [IconDecorator],
};

export const Default: Story = {
  name: "Arrow",
};

export default meta;
