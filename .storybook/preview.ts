import type { Preview } from "@storybook/react";
import "../src/assets/css/shared.css";
import "../src/assets/css/variables.css";
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
