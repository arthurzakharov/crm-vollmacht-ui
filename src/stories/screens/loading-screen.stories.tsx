import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LoadingScreen } from "../../screens";
import logoSrc from "../assets/logo.png";

type Story = StoryObj<typeof LoadingScreen>;

const meta: Meta<typeof LoadingScreen> = {
  title: "SCREENS/Loading Screen",
  component: LoadingScreen,
};

export const Default: Story = {
  name: "Loading Screen",
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
};

export default meta;
