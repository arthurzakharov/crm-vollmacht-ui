import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components";
import { fn } from "@storybook/test";
import React, { useState } from "react";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export const Default: Story = {
  name: "Input",
  args: {
    value: "",
    name: "input",
    color: "gray",
    masked: true,
    status: "neutral",
    disabled: false,
    placeholder: "TT/MM/JJJJ",
    maxLength: 12,
    type: "text",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");

    const onChange = (v: string) => {
      args.onChange(v);
      setValue(v);
    };
    return <Input {...args} value={value} onChange={onChange} />;
  },
};

export default meta;
