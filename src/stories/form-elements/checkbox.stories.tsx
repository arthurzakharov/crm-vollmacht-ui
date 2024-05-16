import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../form-elements";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "FORM ELEMENTS/Checkbox",
  component: Checkbox,
  args: {
    value: true,
    focused: false,
    disabled: false,
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

export const NotFocused: Story = {
  name: "Not Focused",
  args: {
    focused: false,
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
  },
};

export const Enabled: Story = {
  name: "Enabled",
  args: {
    disabled: false,
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    focused: undefined,
    disabled: undefined,
  },
};

export default meta;
