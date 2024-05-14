import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LayoutWithSidebar } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import Placeholder from "../helpers/placeholder";
import logoSrc from "../assets/logo.png";

type Story = StoryObj<typeof LayoutWithSidebar>;

const meta: Meta<typeof LayoutWithSidebar> = {
  title: "LAYOUTS/LayoutWithSidebar",
  component: LayoutWithSidebar,
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
    sidebar: {
      title: "Ihre Übersicht",
      steps: [
        ["1. Angaben zur Person", true],
        ["2. Ihre Kontaktdaten", false],
        ["3. Vergütungsvereinbarung", false],
        ["4. Vollmacht", false],
      ],
      info: {
        infoList: [
          ["Value 1: ", "xxx-xxx-xxx-xxx"],
          ["Value 2: ", "yyy-yyy-yyy-yyy"],
        ],
        isCustomerInfoVisible: false,
      },
      logos: ["tls", "tuv"],
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
      <LayoutWithSidebar {...args}>
        <Placeholder />
      </LayoutWithSidebar>
    );
  },
};

export const Default: Story = {
  name: "LayoutWithSidebar",
};

export default meta;
