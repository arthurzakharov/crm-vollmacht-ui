import React from "react";
import { StoryFn, StoryContext } from "@storybook/react";

export default (Story: StoryFn) => (
  <div style={{ position: "fixed" }}>
    <Story />
  </div>
);
