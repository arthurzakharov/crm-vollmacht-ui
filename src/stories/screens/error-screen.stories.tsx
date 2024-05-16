import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ErrorScreen } from "../../screens";
import logoSrc from "../assets/logo.png";

type Story = StoryObj<typeof ErrorScreen>;

const meta: Meta<typeof ErrorScreen> = {
  title: "SCREENS/ErrorScreen",
  component: ErrorScreen,
};

export const Default: Story = {
  name: "Error Screen",
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
    error: {
      title: "Entschuldigung, da ist wohl etwas schief gelaufen!",
      subtitle: "Fehler 404",
      tableTitle: "Bitte kontaktieren Sie uns doch per:",
      tableRows: [
        {
          key: "E-Mail:",
          value: "info@rightmart.de",
        },
        {
          key: "Telefon:",
          value: "+49 (0)421 / 33 100 310",
        },
        {
          key: "Fax:",
          value: "+49 (0)421 / 33 100 380",
        },
        {
          key: "Post:",
          value: "rightmart Rechtsanwaltsgesellschaft mbH<br />Clara-Jaschke-Straße 1<br />28199 Bremen",
        },
      ],
    },
  },
};

export default meta;
