import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dialog, DialogPosition, DialogSize } from "../../components";
import Placeholder from "../helpers/placeholder";

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  title: "COMPONENTS/Dialog",
  component: Dialog,
  argTypes: {
    name: {
      control: "radio",
      options: ["dialog1", "dialog2", "empty"],
    },
  },
  args: {
    dialogs: [
      {
        name: "dialog1",
        element: (
          <div>
            <h2>Dialog (1)</h2>
            <Placeholder />
          </div>
        ),
      },
      {
        name: "dialog2",
        element: (
          <div>
            <h2>Dialog (2)</h2>
            <Placeholder />
          </div>
        ),
      },
    ],
    lockTarget: "#storybook-root",
    name: "dialog1",
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
      setName(undefined);
    };

    const onClose = () => {
      setPosition(undefined);
      setSize(undefined);
    };

    return (
      <Dialog {...args} name={name} position={position} size={size} onOverlayClick={onOverlayClick} onClose={onClose} />
    );
  },
};

export const Default: Story = {
  args: {
    position: "center",
    name: "dialog2",
  },

  name: "Dialog",
};

export default meta;
