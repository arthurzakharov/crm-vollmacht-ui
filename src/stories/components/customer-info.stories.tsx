import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CustomerInfo } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof CustomerInfo>;

const meta: Meta<typeof CustomerInfo> = {
  title: "COMPONENTS/CustomerInfo",
  component: CustomerInfo,
  parameters: {
    MaxWidthDecorator: 295,
  },
  decorators: [MaxWidthDecorator],
};

export const Default: Story = {
  name: "CustomerInfo",
  args: {
    version: "form",
    list: ["Arthur Zakharov", "Geb in 12/12/2000", "Marienstr. 7, 01067 Dresden"],
    isEditButtonHidden: false,
    onClick: fn(),
  },
};

export default meta;
