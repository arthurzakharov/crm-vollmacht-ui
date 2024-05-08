import { Meta, StoryObj } from "@storybook/react";
import ErrorScreen from "@components/error-screen";
import MaxWidthDecorator from "@stories/decorators/max-width-decorator";

type Story = StoryObj<typeof ErrorScreen>;

const meta: Meta<typeof ErrorScreen> = {
  title: "COMPONENTS/ErrorScreen",
  component: ErrorScreen,
  parameters: {
    MaxWidthDecorator: 1100,
  },
  decorators: [MaxWidthDecorator],
};

export const Default: Story = {
  name: "ErrorScreen",
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
