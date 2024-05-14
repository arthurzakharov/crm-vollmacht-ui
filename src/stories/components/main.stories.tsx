import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Main } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import Placeholder from "../helpers/placeholder";

type Story = StoryObj<typeof Main>;

const meta: Meta<typeof Main> = {
  title: "COMPONENTS/Main",
  component: Main,
  decorators: [MaxWidthDecorator],
  parameters: {
    MaxWidthDecorator: 768,
  },
  args: {
    screen: "home",
    title: "This is some title text",
    subtitle: "This is some subtitle text",
    text: "This is some text",
    step: "Step name",
    infoList: [
      ["Value 1: ", "xxx-xxx-xxx-xxx"],
      ["Value 2: ", "yyy-yyy-yyy-yyy"],
    ],
  },
  render: (args) => (
    <Main {...args}>
      <Placeholder height={200} />
    </Main>
  ),
};

export const ScreenHome: Story = {
  name: "Screen Home",
  args: {
    screen: "home",
  },
};

export const ScreenAttachment: Story = {
  name: "Screen Attachment",
  args: {
    screen: "attachment",
  },
};

export const NoSubtitle: Story = {
  name: "No Subtitle",
  args: {
    subtitle: "",
  },
};

export const NoText: Story = {
  name: "No Text",
  args: {
    text: "",
  },
};

export const MobileWithInfoList: Story = {
  name: "Mobile With Info List",
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  args: {
    screen: "home",
  },
};

export const MobileWithInfoListEmpty: Story = {
  name: "Mobile With Info List Empty",
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  args: {
    screen: "home",
    infoList: undefined,
  },
};

export const ScreenNonAttachmentNoLine: Story = {
  name: "Screen Non Attachment No Line",
  args: {
    screen: "remuneration",
    subtitle: "",
    text: "",
  },
};

export const ScreenNonAttachmentNoStep: Story = {
  name: "Screen Non Attachment No Step",
  args: {
    screen: "remuneration",
    step: "",
  },
};

export const ScreenNonAttachmentSubtitle: Story = {
  name: "Screen Non Attachment Subtitle",
  args: {
    screen: "remuneration",
    text: "",
  },
};

export const ScreenNonAttachmentText: Story = {
  name: "Screen Non Attachment Text",
  args: {
    screen: "remuneration",
    subtitle: "",
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    subtitle: undefined,
    text: undefined,
    step: undefined,
    infoList: undefined,
  },
};

export default meta;
