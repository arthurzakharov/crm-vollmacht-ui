import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dialog, DialogPosition, DialogSize } from "../../components";
import Placeholder from "../helpers/placeholder";

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  title: "COMPONENTS/Dialog",
  component: Dialog,
  args: {
    dialogs: [
      {
        name: "dialog",
        element: (
          <div>
            <h2>Dialog (1)</h2>
            <Placeholder />
          </div>
        ),
      },
    ],
    lockTarget: "#root",
    name: "dialog",
    position: "top",
    size: "m",
    onOverlayClick: fn(),
    onClose: fn(),
  },
  render: (args) => {
    const [name, setName] = useState<string | undefined>(args.name);
    const [position, setPosition] = useState<DialogPosition | undefined>(args.position);
    const [size, setSize] = useState<DialogSize | undefined>(args.size);

    const onOverlayClick = () => {
      setPosition(undefined);
      setSize(undefined);
      args.onOverlayClick();
    };

    const onClose = () => {
      setName(undefined);
      args.onClose();
    };

    return (
      <Dialog {...args} name={name} position={position} size={size} onOverlayClick={onOverlayClick} onClose={onClose} />
    );
  },
};

export const PositionTop: Story = {
  name: "Position Top",
  args: {
    position: "top",
  },
};

export const PositionCenter: Story = {
  name: "Position Center",
  args: {
    position: "center",
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

export const NameIsUndefined: Story = {
  name: "Name Is undefined",
  args: {
    name: undefined,
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    lockTarget: undefined,
    name: undefined,
    position: undefined,
    size: undefined,
  },
};

export default meta;
