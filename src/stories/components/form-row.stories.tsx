import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormRow, InputText } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";

type Story = StoryObj<typeof FormRow>;

const meta: Meta<typeof FormRow> = {
  title: "COMPONENTS/FormRow",
  component: FormRow,
  parameters: {
    MaxWidthDecorator: 600,
  },
  decorators: [MaxWidthDecorator],
};

export const With2Elements: Story = {
  name: "With 2 Elements",
  render: () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    return (
      <FormRow>
        <InputText label="Firt name" value={firstName} name="firstName" status="neutral" onChange={setFirstName} />
        <InputText label="Last name" value={lastName} name="lastName" status="neutral" onChange={setLastName} />
      </FormRow>
    );
  },
};

export const With1Element: Story = {
  name: "With 1 Element",
  render: () => {
    const [firstName, setFirstName] = useState<string>("");
    return (
      <FormRow>
        <InputText label="Firt name" value={firstName} name="firstName" status="neutral" onChange={setFirstName} />
      </FormRow>
    );
  },
};

export default meta;
