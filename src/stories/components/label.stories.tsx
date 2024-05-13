import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Label } from "../../components";

type Story = StoryObj<typeof Label>;

const meta: Meta<typeof Label> = {
  title: "COMPONENTS/Label",
  component: Label,
  args: {
    htmlFor: "test",
    size: "m",
    status: "neutral",
  },
  render: (args) => <Label {...args}>Label text</Label>,
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

export const StatusError: Story = {
  name: "Status Error",
  args: {
    status: "error",
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    size: undefined,
    status: undefined,
  },
};

export default meta;
