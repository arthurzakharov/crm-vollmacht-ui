import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, fn, expect } from "@storybook/test";
import { Footer } from "@components/footer";
import MaxWidthDecorator from "@stories/decorators/max-width-decorator";

type Story = StoryObj<typeof Footer>;

const meta: Meta<typeof Footer> = {
  title: "COMPONENTS/Footer",
  component: Footer,
  parameters: {
    MaxWidthDecorator: 1100,
  },
  decorators: [MaxWidthDecorator],
};

export const WithLinks: Story = {
  name: "With links",
  args: {
    name: "legal-one",
    links: [
      {
        text: "Allgemeine Informationen",
        onClick: fn(),
      },
      {
        text: "Datenschutz",
        onClick: fn(),
      },
      {
        text: "Impressum",
        onClick: fn(),
      },
    ],
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Clicking links one by one, check if CBs are fired", async () => {
      if (args.links) {
        for (const link of args.links) {
          await userEvent.click(canvas.getByText(link.text));
          await expect(link.onClick).toHaveBeenNthCalledWith(1);
        }
      }
    });
  },
};

export const WithEmptyLinks: Story = {
  name: "With Empty links",
  args: {
    name: "legal-one",
    links: [],
  },
};

export const DefaultValues: Story = {
  name: "Default Values",
  args: {
    name: "legal-one",
    links: undefined,
  },
};

export default meta;
