import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, fn, userEvent, within } from "@storybook/test";
import { InputCheckbox } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof InputCheckbox>;

const meta: Meta<typeof InputCheckbox> = {
  title: "INTERACTIONS/InputCheckbox",
  component: InputCheckbox,
  decorators: [MaxWidthDecorator],
  parameters: {
    MaxWidthDecorator: 600,
  },
  args: {
    value: false,
    name: "ageement",
    status: "neutral",
    disabled: false,
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const onChange = (value: boolean): void => {
      args.onChange(value);
      setValue(value);
    };
    return (
      <InputCheckbox {...args} value={value} onChange={onChange}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eum incidunt magnam, quae quam quisquam
        sapiente unde. Accusantium adipisci blanditiis commodi consectetur consequuntur, cum cumque debitis deserunt
        dolor doloremque error <button type="button">explicabo</button> fuga fugit harum, illum ipsam, ipsum iste labore
        minima necessitatibus non numquam odio pariatur quam quas <a href="">quibusdam</a> quos reiciendis rem
        repellendus reprehenderit repudiandae saepe sint sit ut veritatis voluptatibus voluptatum. Aliquid animi
        corporis ducimus earum, excepturi expedita ipsam maxime quaerat quas vitae. Aspernatur assumenda at consequuntur
        dolorum et, eveniet illum in, incidunt inventore itaque necessitatibus nihil odio, officia porro quas similique
        sit temporibus ut vero vitae! A adipisci, atque aut culpa cumque dicta dolorem ducimus ea error est expedita
        illo laudantium magnam natus non nulla porro qui, vero voluptas!
      </InputCheckbox>
    );
  },
};

export const Demo: Story = {
  name: "Demo",
  play: async ({ args, canvasElement, step }) => {
    const checkbox = within(canvasElement).getByRole("checkbox");
    const content = within(canvasElement).getByRole("checkbox").nextSibling as Element;
    const button = within(canvasElement).getByRole("button");
    const link = within(canvasElement).getByRole("link");
    await step("Click to ", async () => {
      await userEvent.click(content);
      await expect(args.onChange).toHaveBeenNthCalledWith(1, true);
    });
    await step("Use keyboard to select", async () => {
      await userEvent.tab();
      await expect(checkbox).toHaveFocus();
      await userEvent.keyboard("[Space]");
      await expect(args.onChange).toHaveBeenNthCalledWith(2, false);
      await expect(checkbox).toHaveFocus();
      await userEvent.tab();
      await expect(checkbox).not.toHaveFocus();
    });
    await step("Click on button and link in passed child", async () => {
      await userEvent.click(button);
      await expect(button).not.toHaveFocus();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await userEvent.click(link);
      await expect(button).not.toHaveFocus();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
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
    status: undefined,
    disabled: undefined,
  },
};

export default meta;
