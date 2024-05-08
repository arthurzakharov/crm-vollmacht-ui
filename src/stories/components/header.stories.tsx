import { Meta, StoryObj } from "@storybook/react";
import { Header } from "../../components";
import logoSrc from "../assets/logo.png";

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: "COMPONENTS/Header",
  component: Header,
};

export const WithPhone: Story = {
  name: "With Phone",
  args: {
    logo: logoSrc,
    tel: "030 / 20 898 12 11",
    descriptions: undefined,
  },
};

export const WithoutPhone: Story = {
  name: "Without Phone",
  args: {
    logo: logoSrc,
    tel: undefined,
    descriptions: undefined,
  },
};

export const WithoutDescriptions: Story = {
  name: "Without Descriptions",
  args: {
    logo: logoSrc,
    tel: undefined,
    descriptions: undefined,
  },
};

export const WithDescriptionSizeS: Story = {
  name: "With Descriptions Size S",
  args: {
    logo: logoSrc,
    tel: undefined,
    descriptions: [
      {
        size: "s",
        value: "Kostenlose Erstberatung",
      },
    ],
  },
};

export const WithDescriptionSizeM: Story = {
  name: "With Descriptions Size M",
  args: {
    logo: logoSrc,
    tel: undefined,
    descriptions: [
      {
        size: "m",
        value: "Mo-Fr von 8:00 - 20:00",
      },
    ],
  },
};

export const WithDescriptionAllSize: Story = {
  name: "With Descriptions All Size",
  args: {
    logo: logoSrc,
    tel: undefined,
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

export const WithAllItems: Story = {
  name: "With All Items",
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

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    logo: logoSrc,
    tel: undefined,
    descriptions: undefined,
  },
};

export default meta;
