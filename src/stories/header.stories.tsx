import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components";
import logoSrc from "./assets/logo.png";

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export const WithTelephoneNumber: Story = {
  args: {
    logo: logoSrc,
    tel: "030 / 20 898 12 11",
  },
};

export const WithoutTelephoneNumber: Story = {
  args: {
    logo: logoSrc,
    tel: undefined,
  },
};

export default meta;
