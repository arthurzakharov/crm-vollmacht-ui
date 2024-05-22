import type { Preview } from "@storybook/react";
import "../src/assets/css/shared.css";
import "../src/assets/css/variables.css";
import "./styles.css";

const preview: Preview = {
  parameters: {
    viewport: { defaultViewport: "default" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs", "autodocs"]
};

export default preview;
