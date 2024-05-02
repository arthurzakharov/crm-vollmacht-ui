import type { Meta, StoryObj } from "@storybook/react";
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
        onClick: () => {},
      },
      {
        text: "Datenschutz",
        onClick: () => {},
      },
      {
        text: "Impressum",
        onClick: () => {},
      },
    ],
  },
};

export default meta;
