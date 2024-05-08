import { Meta, StoryObj } from "@storybook/react";
import { Loader } from "../../components";

type Story = StoryObj<typeof Loader>;

const meta: Meta<typeof Loader> = {
  title: "COMPONENTS/Loader",
  component: Loader,
};

export const ColorPrimary: Story = {
  name: "Color Primary",
  args: {
    color: "primary",
  },
};

export const ColorSecondary: Story = {
  name: "Color Secondary",
  args: {
    color: "secondary",
  },
};

export default meta;
