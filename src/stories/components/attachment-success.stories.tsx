import { Meta, StoryObj } from "@storybook/react";
import { AttachmentSuccess } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import submittedSrc from "../assets/submitted.png";

type Story = StoryObj<typeof AttachmentSuccess>;

const meta: Meta<typeof AttachmentSuccess> = {
  title: "COMPONENTS/AttachmentSuccess",
  component: AttachmentSuccess,
  parameters: {
    MaxWidthDecorator: 600,
  },
  decorators: [MaxWidthDecorator],
};

export const Default: Story = {
  name: "Attachment Success",
  args: {
    icon: submittedSrc,
    title: "Vielen Dank!",
    text: [
      "Wir haben Ihre Informationen erhalten und werden diese umgehend bearbeiten.",
      "Sobald neue Erkentnisse vorliegen, setzen wir uns mit Ihnen in Verbindung.",
    ],
  },
};

export default meta;
