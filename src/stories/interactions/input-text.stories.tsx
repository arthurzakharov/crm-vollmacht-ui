import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";
import { InputText } from "../../components";
import { Delayed } from "../utils";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof InputText>;

const meta: Meta<typeof InputText> = {
  title: "INTERACTIONS/InputText",
  component: InputText,
  decorators: [MaxWidthDecorator],
  parameters: {
    MaxWidthDecorator: 300,
  },
  args: {
    label: "First name",
    value: "",
    name: "firstName",
    status: "success",
    popup: "Please enter First name",
    masked: false,
    disabled: false,
    maxLength: 12,
    type: "text",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const onChange = (value: string): void => {
      args.onChange(value);
      setValue(value);
    };
    return <InputText {...args} value={value} onChange={onChange} />;
  },
};

export const Demo: Story = {
  name: "Demo",
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    status: undefined,
    popup: undefined,
    placeholder: undefined,
    masked: undefined,
    disabled: undefined,
    maxLength: undefined,
    type: "text",
    onFocus: undefined,
    onBlur: undefined,
  },
};

export default meta;
