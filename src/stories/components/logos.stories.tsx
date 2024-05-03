import type { Meta, StoryObj } from "@storybook/react";
import { Logos } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof Logos>;

const meta: Meta<typeof Logos> = {
  title: "COMPONENTS/Logos",
  component: Logos,
  parameters: {
    MaxWidthDecorator: 320,
  },
  decorators: [MaxWidthDecorator],
};

export const Default: Story = {
  name: "Logos",
  args: {
    show: ["tls", "tuv"],
  },
};

export default meta;
