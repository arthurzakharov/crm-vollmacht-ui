import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within, mocks } from "@storybook/test";
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
    status: "neutral",
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
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByRole("textbox");
    await step("Label is displayed", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-label")).toBeInTheDocument();
    });
    await step("Focus input field calls onFocus and onBlur", async () => {
      await Delayed.tab();
      await expect(input).toHaveFocus();
      await Delayed.tab();
      await expect(input).not.toHaveFocus();
      await expect(args.onBlur).toHaveBeenNthCalledWith(1);
      await expect(args.onFocus).toHaveBeenNthCalledWith(1);
    });
    await step("Type some text", async () => {
      await Delayed.tab();
      await Delayed.type(input, "test");
      await expect(args.onChange).toHaveBeenNthCalledWith(1, "t");
      await expect(args.onChange).toHaveBeenNthCalledWith(2, "te");
      await expect(args.onChange).toHaveBeenNthCalledWith(3, "tes");
      await expect(args.onChange).toHaveBeenNthCalledWith(4, "test");
    });
  },
};

export const EnabledStatusNeutral: Story = {
  name: "Enabled Status Neutral",
  args: {
    status: "neutral",
    disabled: false,
  },
  play: async ({ canvasElement, step }) => {
    await step("Icon is not visible if field neutral and not disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).not.toBeInTheDocument();
    });
    await step("Popup is not visible if field is neutral even if it is focused", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
    });
  },
};

export const EnabledStatusSuccess: Story = {
  name: "Enabled Status Success",
  args: {
    status: "success",
    disabled: false,
  },
  play: async ({ args, canvasElement, step }) => {
    await step("Icon is visible if field is success and not disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).toBeInTheDocument();
    });
    await step("Popup is not visible if field is success even if it is focused", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
    });
  },
};

export const EnabledStatusError: Story = {
  name: "Enabled Status Error",
  args: {
    status: "error",
    disabled: false,
  },
  play: async ({ canvasElement, step }) => {
    await step("Icon is visible if field is error and not disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).toBeInTheDocument();
    });
    await step("Popup is visible if field is error and it is focused", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).toBeInTheDocument();
      await Delayed.tab();
      await expect(within(canvasElement).queryByTestId("input-text-popup")).not.toBeInTheDocument();
    });
  },
};

export const DisabledAndStatusNeutral: Story = {
  name: "Disabled And Status Neutral",
  args: {
    status: "neutral",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Icon is not visible if field is success and disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).not.toBeInTheDocument();
    });
  },
};

export const DisabledAndStatusSuccess: Story = {
  name: "Disabled And Status Success",
  args: {
    status: "success",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Icon is not visible if field is success and disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).not.toBeInTheDocument();
    });
  },
};

export const DisabledAndStatusError: Story = {
  name: "Disabled And Status Error",
  args: {
    status: "error",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Icon is not visible if field is error and disabled", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-icon")).not.toBeInTheDocument();
    });
  },
};

export const NoLabel: Story = {
  name: "No Label",
  args: {
    label: "",
  },
  play: async ({ canvasElement, step }) => {
    await step("No label if string is empty", async () => {
      await expect(within(canvasElement).queryByTestId("input-text-label")).not.toBeInTheDocument();
    });
  },
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
    type: undefined,
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByRole("textbox");
    await step("Click will not call onFocus and onBlur if they are not passed", async () => {
      // TODO: find out how to mock undefined handlers
      await Delayed.tab();
      await expect(input).toHaveFocus();
      await Delayed.tab();
      await expect(input).not.toHaveFocus();
      await expect(args.onBlur).toBeCalled();
      await expect(args.onFocus).toBeCalled();
    });
  },
};

export default meta;
