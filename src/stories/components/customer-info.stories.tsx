import { Meta, StoryObj } from "@storybook/react";
import { fn, within, expect } from "@storybook/test";
import { CustomerInfo } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import { Delayed } from "../utils";

type Story = StoryObj<typeof CustomerInfo>;

const meta: Meta<typeof CustomerInfo> = {
  title: "COMPONENTS/CustomerInfo",
  component: CustomerInfo,
  parameters: {
    MaxWidthDecorator: 295,
  },
  decorators: [MaxWidthDecorator],
  args: {
    version: "form",
    list: ["Arthur Zakharov", "Geb in 12/12/2000", "Marienstr. 7, 01067 Dresden"],
    isEditButtonVisible: false,
    onClick: fn(),
  },
};

export const VersionForm: Story = {
  name: "Version Form",
  args: {
    version: "form",
  },
};

export const VersionSidebar: Story = {
  name: "Version Sidebar",
  args: {
    version: "sidebar",
  },
};

export const EmptyList: Story = {
  name: "Empty List",
  args: {
    list: [],
  },
};

export const EditButtonHidden: Story = {
  name: "Edit Button Hidden",
  args: {
    isEditButtonVisible: false,
  },
};

export const EditButtonVisible: Story = {
  name: "Edit Button Visible",
  args: {
    isEditButtonVisible: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByRole("button");
    await step("Click edit button, focus not active", async () => {
      await Delayed.click(button);
      await expect(args.onClick).toHaveBeenNthCalledWith(1);
      await expect(button).not.toHaveFocus();
    });
    await step("Click with keyboard, focus not active", async () => {
      await Delayed.tab();
      await Delayed.keyboard("[Space]");
      await expect(args.onClick).toHaveBeenNthCalledWith(2);
      await expect(button).not.toHaveFocus();
    });
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    isEditButtonVisible: undefined,
  },
};

export default meta;
