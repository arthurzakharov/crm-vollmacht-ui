import React, { FC } from "react";
import { SidebarInfo, SidebarInfoProps } from "../sidebar-info";
import { SidebarStep } from "../sidebar-step";
import { Logos, LogoIcon } from "../logos";
import "./sidebar.css";

export interface SidebarProps {
  title: string;
  steps: [string, boolean][];
  info?: SidebarInfoProps;
  logos: LogoIcon[];
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { title, steps, info, logos } = props;

  return (
    <div className="sidebar">
      <h6 className="sidebar__title">{title}</h6>
      <div className="sidebar__steps">
        {steps.map(([step, isCorrect]) => (
          <SidebarStep key={step} text={step} isCorrect={isCorrect} />
        ))}
      </div>
      {info && <SidebarInfo {...info} />}
      <div className="sidebar__logos">
        <Logos show={logos} />
      </div>
    </div>
  );
};
