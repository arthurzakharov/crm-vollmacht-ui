import React, { FC } from "react";
import { StatusIcon } from "../status-icon";
import "./sidebar-step.css";

export interface SidebarStepProps {
  text: string;
  isCorrect: boolean;
}

export const SidebarStep: FC<SidebarStepProps> = (props) => {
  const { text, isCorrect } = props;
  return (
    <div className="sidebar-step">
      <p>{text}</p>
      <StatusIcon idle={!isCorrect} status="success" size="s" />
    </div>
  );
};
