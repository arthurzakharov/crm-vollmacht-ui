import { Meta, StoryObj } from "@storybook/react";
import { Error404 } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof Error404>;

const meta: Meta<typeof Error404> = {
  title: "COMPONENTS/Error404",
  component: Error404,
  parameters: {
    MaxWidthDecorator: 1100,
  },
  decorators: [MaxWidthDecorator],
};

export const Default: Story = {
  name: "Error404",
  args: {
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
};

export default meta;
