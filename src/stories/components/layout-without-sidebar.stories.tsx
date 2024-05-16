import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LayoutWithoutSidebar } from "../../layouts";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import Placeholder from "../helpers/placeholder";
import logoSrc from "../assets/logo.png";

type Story = StoryObj<typeof LayoutWithoutSidebar>;

const meta: Meta<typeof LayoutWithoutSidebar> = {
  title: "LAYOUTS/LayoutWithoutSidebar",
  component: LayoutWithoutSidebar,
  parameters: {
    MaxWidthDecorator: 1100,
  },
  decorators: [MaxWidthDecorator],
  args: {
    header: {
      logo: logoSrc,
      tel: "030 / 20 898 12 11",
      descriptions: [
        {
          size: "m",
          value: "Mo-Fr von 8:00 - 20:00",
        },
      ],
    },
    footer: {
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
  },
  render: (args) => {
    return (
      <LayoutWithoutSidebar {...args}>
        <Placeholder />
      </LayoutWithoutSidebar>
    );
  },
};

export const Default: Story = {
  name: "LayoutWithoutSidebar",
};

export default meta;
