import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn, within, expect, userEvent } from "@storybook/test";
import { Input } from "../../form-elements";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "FORM ELEMENTS/Input",
  component: Input,
  parameters: {
    MaxWidthDecorator: 280,
  },
  decorators: [MaxWidthDecorator],
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);
    const onChange = (v: string) => {
      args.onChange(v);
      setValue(v);
    };
    return <Input {...args} value={value} onChange={onChange} />;
  },
};

export const Demo: Story = {
  name: "Demo",
  args: {
    value: "",
    name: "input",
    color: "primary",
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
};

export const ColorPrimary: Story = {
  name: "Color Primary",
  args: {
    ...Demo.args,
    value: "19/03/1988",
    color: "primary",
  },
};

export const ColorSecondary: Story = {
  name: "Color Secondary",
  args: {
    ...Demo.args,
    value: "19/03/1988",
    color: "secondary",
  },
};

export const StatusNeutral: Story = {
  name: "Status Neutral",
  args: {
    ...Demo.args,
    value: "19/03/1988",
    status: "neutral",
  },
};

export const StatusSuccess: Story = {
  name: "Status Success",
  args: {
    ...Demo.args,
    value: "19/03/1988",
    status: "success",
  },
};

export const StatusError: Story = {
  name: "Status Error",
  args: {
    ...Demo.args,
    value: "19/03/1988",
    status: "error",
  },
};

export const Masked: Story = {
  name: "Masked",
  args: {
    ...Demo.args,
    masked: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByRole("textbox");
    await step("Focus in and out", async () => {
      await userEvent.tab();
      await userEvent.tab();
      await expect(args.onFocus).toHaveBeenNthCalledWith(1);
      await expect(args.onBlur).toHaveBeenNthCalledWith(1);
      await expect(args.onChange).toHaveBeenNthCalledWith(1, "__/__/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(2, "");
    });
    await step("Type", async () => {
      await userEvent.type(input, "12122000");
      await expect(args.onChange).toHaveBeenNthCalledWith(3, "__/__/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(4, "1_/__/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(5, "12/__/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(6, "12/1_/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(7, "12/12/____");
      await expect(args.onChange).toHaveBeenNthCalledWith(8, "12/12/2___");
      await expect(args.onChange).toHaveBeenNthCalledWith(9, "12/12/20__");
      await expect(args.onChange).toHaveBeenNthCalledWith(10, "12/12/200_");
      await expect(args.onChange).toHaveBeenNthCalledWith(11, "12/12/2000");
      await userEvent.tab();
    });
    await step("Check that caret always returns to first not entered number", async () => {
      await userEvent.tab();
      await userEvent.type(input, "{backspace}");
      await userEvent.type(input, "{backspace}");
      await userEvent.type(input, "{backspace}");
      await expect(args.onChange).toHaveBeenNthCalledWith(14, "12/12/2___");
      await userEvent.tab();
      await userEvent.click(input);
      await userEvent.keyboard("8");
      await expect(args.onChange).toHaveBeenNthCalledWith(15, "12/12/28__");
      await userEvent.tab();
    });
    await step("Press ArrowUp and ArrowDown does not move caret", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("8");
      await expect(args.onChange).toHaveBeenNthCalledWith(16, "12/12/288_");
      await userEvent.type(input, "{backspace}");
      await expect(args.onChange).toHaveBeenNthCalledWith(17, "12/12/28__");
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("8");
      await expect(args.onChange).toHaveBeenNthCalledWith(18, "12/12/288_");
      await userEvent.type(input, "{backspace}");
      await userEvent.type(input, "{backspace}");
      await userEvent.type(input, "{backspace}");
      await expect(args.onChange).toHaveBeenNthCalledWith(21, "12/12/____");
      await userEvent.tab();
    });
    await step("Press ArrowLeft and ArrowRight move caret", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("2");
      await expect(args.onChange).toHaveBeenNthCalledWith(22, "12/12/2___");
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("1");
      await expect(args.onChange).toHaveBeenNthCalledWith(23, "11/12/2___");
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("1");
      await expect(args.onChange).toHaveBeenNthCalledWith(24, "11/12/1___");
      await userEvent.keyboard("9");
      await userEvent.keyboard("9");
      await userEvent.keyboard("9");
      await expect(args.onChange).toHaveBeenNthCalledWith(27, "11/12/1999");
    });
  },
};

export const NotMasked: Story = {
  name: "NotMasked",
  args: {
    ...Demo.args,
    masked: false,
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByRole("textbox");
    await step("Focus in and out", async () => {
      await userEvent.tab();
      await userEvent.tab();
      await expect(args.onFocus).toHaveBeenNthCalledWith(1);
      await expect(args.onBlur).toHaveBeenNthCalledWith(1);
      await expect(args.onChange).not.toBeCalled();
    });
    await step("Type", async () => {
      await userEvent.type(input, "test");
      await expect(args.onChange).toHaveBeenNthCalledWith(1, "t");
      await expect(args.onChange).toHaveBeenNthCalledWith(2, "te");
      await expect(args.onChange).toHaveBeenNthCalledWith(3, "tes");
      await expect(args.onChange).toHaveBeenNthCalledWith(4, "test");
      await userEvent.tab();
    });
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    value: "",
    name: "input",
    color: undefined,
    masked: undefined,
    status: undefined,
    disabled: undefined,
    placeholder: undefined,
    maxLength: undefined,
    type: undefined,
    onChange: fn(),
    onFocus: undefined,
    onBlur: undefined,
  },
};

export default meta;
