import React from "react";
import { StoryFn } from "@storybook/react";

export default (Story: StoryFn) => (
  <div className="icon-decorator">
    <Story />
  </div>
);
