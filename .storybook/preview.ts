import type { Preview } from "@storybook/react";
import "@assets/css/shared.css";
import "@assets/css/variables.css";
import "./styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
