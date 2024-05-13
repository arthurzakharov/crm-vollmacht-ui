import { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../components";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  title: "INTERACTIONS/Radio",
  component: Radio,
  args: {
    value: true,
    size: "l",
    status: "neutral",
    focused: false,
    disabled: false,
  },
};

export const SizeS: Story = {
  name: "Size S",
  args: {
    size: "s",
  },
};

export const SizeM: Story = {
  name: "Size M",
  args: {
    size: "m",
  },
};

export const SizeL: Story = {
  name: "Size L",
  args: {
    size: "l",
  },
};

export const StatusError: Story = {
  name: "Status Error",
  args: {
    status: "error",
  },
};

export const StatusNeutral: Story = {
  name: "Status Neutral",
  args: {
    status: "neutral",
  },
};

export const StatusSuccess: Story = {
  name: "Status Success",
  args: {
    status: "success",
  },
};

export const Checked: Story = {
  name: "Checked",
  args: {
    value: true,
  },
};

export const NotChecked: Story = {
  name: "Not Checked",
  args: {
    value: false,
  },
};

export const Focused: Story = {
  name: "Focused",
  args: {
    focused: true,
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
  },
};

export default meta;
