import { Meta, StoryObj } from "@storybook/react";
import { SubmitButton } from "../../form-elements";
import { fn, within, expect, userEvent } from "@storybook/test";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof SubmitButton>;

const meta: Meta<typeof SubmitButton> = {
  title: "FORM ELEMENTS/Submit Button",
  component: SubmitButton,
  decorators: [MaxWidthDecorator],
  parameters: {
    MaxWidthDecorator: 320,
  },
  args: {
    loading: false,
    text: "Submit button",
    onClick: fn(),
    version: "main",
  },
};

export const VersionSidebar: Story = {
  name: "Version Sidebar",
  args: {
    version: "sidebar",
  },
};

export const VersionMain: Story = {
  name: "Version Main",
  args: {
    version: "main",
  },
};

export const Loading: Story = {
  name: "Loading",
  args: {
    loading: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByRole("button");
    await step("Button is disabled while loading", async () => {
      await userEvent.click(button);
      await expect(button).toBeDisabled();
      await expect(args.onClick).not.toBeCalled();
    });
  },
};

export const Idle: Story = {
  name: "Idle",
  args: {
    loading: false,
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByRole("button");
    await step("Button is not disable while idle", async () => {
      await userEvent.click(button);
      await expect(button).not.toBeDisabled();
      await expect(args.onClick).toHaveBeenNthCalledWith(1);
    });
    await step("Button is not in focus after click", async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenNthCalledWith(2);
      await expect(button).not.toHaveFocus();
    });
  },
};

export default meta;
