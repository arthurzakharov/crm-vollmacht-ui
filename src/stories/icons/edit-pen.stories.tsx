import type { Meta, StoryObj } from "@storybook/react";
import EditPen from "@icons/edit-pen";
import IconDecorator from "@stories/decorators/icon-decorator";

type Story = StoryObj<typeof EditPen>;

const meta: Meta<typeof EditPen> = {
  title: "ICONS/EditPen",
  component: EditPen,
  decorators: [IconDecorator],
};

export const Default: Story = {
  name: "EditPen",
};

export default meta;
