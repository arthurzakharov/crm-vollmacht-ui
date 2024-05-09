import { Meta, StoryObj } from "@storybook/react";
import { SidebarInfo } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import { fn } from "@storybook/test";

type Story = StoryObj<typeof SidebarInfo>;

const meta: Meta<typeof SidebarInfo> = {
  title: "COMPONENTS/SidebarInfo",
  component: SidebarInfo,
  parameters: {
    MaxWidthDecorator: 295,
  },
  decorators: [MaxWidthDecorator],
  args: {
    infoList: [
      ["Value 1: ", "xxx-xxx-xxx-xxx"],
      ["Value 2: ", "yyy-yyy-yyy-yyy"],
    ],
    isCustomerInfoVisible: true,
    customerInfo: {
      list: ["Arthur Zakharov", "Geb in 12/12/2000", "Marienstr. 7, 01067 Dresden"],
      isEditButtonVisible: true,
      onClick: fn(),
    },
  },
};

export const WithCustomerInfo: Story = {
  name: "With CustomerInfo",
};

export const WithoutCustomerInfo: Story = {
  name: "Without CustomerInfo",
  args: {
    customerInfo: undefined,
  },
};

export const EmptyInfoList: Story = {
  name: "Empty Info List",
  args: {
    infoList: [],
  },
};

export const DefaultValues: Story = {
  name: "DefaultValues",
  args: {
    isCustomerInfoVisible: undefined,
    customerInfo: undefined,
  },
};

export default meta;
