import React from "react";
import { StoryFn, StoryContext } from "@storybook/react";

export default (Story: StoryFn, context: StoryContext) => (
  <div style={{ maxWidth: context.parameters.MaxWidthDecorator }}>
    <Story />
  </div>
);
