import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LayoutWithoutSidebar } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
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
        <div
          style={{
            height: 300,
            backgroundImage:
              "linear-gradient(45deg, #d3d3d3 25%, transparent 25%, transparent 50%, #d3d3d3 50%, #d3d3d3 75%, transparent 75%, transparent 100%)",
            backgroundSize: "56.57px 56.57px",
          }}
        />
      </LayoutWithoutSidebar>
    );
  },
};

export const Default: Story = {
  name: "LayoutWithoutSidebar",
};

export default meta;
