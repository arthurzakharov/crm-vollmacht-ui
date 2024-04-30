import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components";
import logoSrc from "./assets/logo.png";

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export const Default: Story = {
  name: "Header",
  args: {
    logo: logoSrc,
    tel: "030 / 20 898 12 11",
    descriptions: [
      {
        size: "m",
        value: "Mo-Fr von 8:00 - 20:00",
      },
      {
        size: "s",
        value: "Kostenlose Erstberatung",
      },
    ],
  },
};

export default meta;
