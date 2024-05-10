import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Sidebar } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof Sidebar>;

const meta: Meta<typeof Sidebar> = {
  title: "COMPONENTS/Sidebar",
  component: Sidebar,
  parameters: {
    MaxWidthDecorator: 345,
  },
  decorators: [MaxWidthDecorator],
  args: {
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
      isCustomerInfoVisible: true,
      customerInfo: {
        list: ["Arthur Zakharov", "Geb in 12/12/2000", "Marienstr. 7, 01067 Dresden"],
        isEditButtonVisible: true,
        onClick: fn(),
      },
    },
    logos: ["tls", "tuv"],
  },
};

export const WithInfoSection: Story = {
  name: "With Info Section",
};

export const WithoutInfoSection: Story = {
  name: "Without Info Section",
  args: {
    info: undefined,
  },
};

export default meta;
