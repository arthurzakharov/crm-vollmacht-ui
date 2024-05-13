import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, fn, userEvent, within } from "@storybook/test";
import { InputRadio } from "../../components";

type VALUES = "female" | "male" | "";

type Story = StoryObj<typeof InputRadio<VALUES>>;

const meta: Meta<typeof InputRadio<VALUES>> = {
  title: "INTERACTIONS/InputRadio",
  component: InputRadio,
  args: {
    options: [
      {
        value: "female",
        label: "Frau",
      },
      {
        value: "male",
        label: "Herr",
      },
    ],
    value: "female",
    status: "neutral",
    sizeRadio: "m",
    sizeLabel: "m",
    disabled: false,
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<VALUES>(args.value);
    const onChange = (value: VALUES, type: string): void => {
      args.onChange(value, type);
      setValue(value);
    };
    return <InputRadio {...args} value={value} onChange={onChange} />;
  },
};

export const Demo: Story = {
  name: "Demo",
  play: async ({ args, canvasElement, step }) => {
    const [female, male] = within(canvasElement).getAllByRole("radio");
    await step("Frau is preseleted", async () => {
      await expect(female).toBeChecked();
      await expect(male).not.toBeChecked();
    });
    await step("Click male", async () => {
      await fireEvent.click(male, {
        clientX: 1,
        clientY: 2,
      });
      await expect(args.onChange).toHaveBeenNthCalledWith(1, "male", "click");
    });
    await step("Use Tab to select value", async () => {
      await userEvent.tab();
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("[ArrowRight]");
      await expect(args.onChange).toHaveBeenNthCalledWith(2, "male", "change");
      await expect(args.onChange).toHaveBeenNthCalledWith(3, "female", "change");
    });
  },
};

export const EmptyOptions: Story = {
  name: "Empty Options",
  args: {
    options: [],
  },
};

export const EmptyValue: Story = {
  name: "Empty Value",
  args: {
    value: "",
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

export const SizeRadioM: Story = {
  name: "Size Radio M",
  args: {
    sizeRadio: "m",
  },
};

export const SizeRadioL: Story = {
  name: "Size Radio L",
  args: {
    sizeRadio: "l",
  },
};

export const SizeLabelS: Story = {
  name: "Size Label S",
  args: {
    sizeLabel: "s",
  },
};

export const SizeLabelM: Story = {
  name: "Size Label M",
  args: {
    sizeLabel: "m",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    status: undefined,
    sizeRadio: undefined,
    sizeLabel: undefined,
    disabled: undefined,
  },
};

export default meta;
