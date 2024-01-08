import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components";
import logoSrc from "./assets/logo.png";

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
  argTypes: {
    logo: {
      description: "Path to logo image",
    },
    tel: {
      description: "Phone number. If not passed phone section is hidden",
    },
  },
};

export const Default: Story = {
  name: "Header",
  args: {
    logo: logoSrc,
    tel: "030 / 20 898 12 11",
  },
};

export default meta;
