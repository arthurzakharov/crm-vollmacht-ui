import { Meta, StoryObj } from "@storybook/react";
import Logos from "@components/logos";
import MaxWidthDecorator from "@stories/decorators/max-width-decorator";

type Story = StoryObj<typeof Logos>;

const meta: Meta<typeof Logos> = {
  title: "COMPONENTS/Logos",
  component: Logos,
  parameters: {
    MaxWidthDecorator: 320,
  },
  decorators: [MaxWidthDecorator],
};

export const TlsAndTuv: Story = {
  name: "TlsAndTuv",
  args: {
    show: ["tls", "tuv"],
  },
};

export const TlsOnly: Story = {
  name: "Tls Only",
  args: {
    show: ["tls"],
  },
};

export const TuvOnly: Story = {
  name: "Tuv Only",
  args: {
    show: ["tuv"],
  },
};

export const NoLogos: Story = {
  name: "No Logos",
  args: {
    show: [],
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    show: undefined,
  },
};

export default meta;
