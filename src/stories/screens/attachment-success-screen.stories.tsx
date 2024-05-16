import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AttachmentSuccessScreen } from "../../screens";
import logoSrc from "../assets/logo.png";
import submittedSrc from "../assets/submitted.png";

type Story = StoryObj<typeof AttachmentSuccessScreen>;

const meta: Meta<typeof AttachmentSuccessScreen> = {
  title: "SCREENS/HomeScreen",
  component: AttachmentSuccessScreen,
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
    main: {
      screen: "attachment",
      title: "Vergütungsvereinbarung und Vollmacht",
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
    success: {
      icon: submittedSrc,
      title: "Vielen Dank!",
      text: [
        "Wir haben Ihre Informationen erhalten und werden diese umgehend bearbeiten.",
        "Sobald neue Erkentnisse vorliegen, setzen wir uns mit Ihnen in Verbindung.",
      ],
    },
  },
};

export const Default: Story = {
  name: "Attachment Success Screen",
};

export default meta;
