import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Footer } from "../components";

type Story = StoryObj<typeof Footer>;

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
};

export const Default: Story = {
  name: "Footer",
  args: {
    name: "legal-one",
    links: [
      {
        text: "Allgemeine Informationen",
        onClick: fn(),
      },
      {
        text: "Datenschutz",
        onClick: fn(),
      },
      {
        text: "Impressum",
        onClick: fn(),
      },
    ],
  },
};

export default meta;
