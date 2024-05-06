import { Meta, StoryObj } from "@storybook/react";
import { StatusIcon } from "../../components";

type Story = StoryObj<typeof StatusIcon>;

const meta: Meta<typeof StatusIcon> = {
  title: "COMPONENTS/StatusIcon",
  component: StatusIcon,
};

export const StatusSuccess: Story = {
  name: "Status Success",
  args: {
    status: "success",
    size: "l",
    idle: false,
  },
};

export const StatusError: Story = {
  name: "Status Error",
  args: {
    status: "error",
    size: "l",
    idle: false,
  },
};

export const SizeS: Story = {
  name: "Size S",
  args: {
    status: "success",
    size: "s",
    idle: false,
  },
};

export const SizeM: Story = {
  name: "Size M",
  args: {
    status: "success",
    size: "m",
    idle: false,
  },
};

export const SizeL: Story = {
  name: "Size L",
  args: {
    status: "success",
    size: "l",
    idle: false,
  },
};

export const Idle: Story = {
  name: "Idle",
  args: {
    status: "success",
    size: "l",
    idle: true,
  },
};

export const Active: Story = {
  name: "Active",
  args: {
    status: "success",
    size: "l",
    idle: false,
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    status: "success",
    size: undefined,
    idle: undefined,
  },
};

export default meta;
