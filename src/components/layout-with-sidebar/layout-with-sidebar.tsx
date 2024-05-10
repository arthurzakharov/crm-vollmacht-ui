import React, { FC, PropsWithChildren } from "react";
import { Header, HeaderProps } from "../header";
import { Sidebar, SidebarProps } from "../sidebar";
import { Footer, FooterProps } from "../footer";
import "./layout-with-sidebar.css";

export interface LayoutWithSidebarProps {
  header: HeaderProps;
  sidebar: SidebarProps;
  footer: FooterProps;
}

export const LayoutWithSidebar: FC<PropsWithChildren<LayoutWithSidebarProps>> = (props) => {
  const { header, sidebar, footer, children } = props;

  return (
    <div className="layout-with-sidebar">
      <div className="layout-with-sidebar__header">
        <Header {...header} />
      </div>
      <div className="layout-with-sidebar__content">
        <div className="layout-with-sidebar__main">{children}</div>
        <div className="layout-with-sidebar__sidebar">
          <Sidebar {...sidebar} />
        </div>
      </div>
      <div className="layout-with-sidebar__footer">
        <Footer {...footer} />
      </div>
    </div>
  );
};
