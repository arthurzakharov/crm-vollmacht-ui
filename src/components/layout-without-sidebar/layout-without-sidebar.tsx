import React, { FC, PropsWithChildren } from "react";
import { Header, HeaderProps } from "../header";
import { Footer, FooterProps } from "../footer";
import "./layout-without-sidebar.css";

export interface LayoutWithoutSidebarProps {
  header: HeaderProps;
  footer: FooterProps;
}

export const LayoutWithoutSidebar: FC<PropsWithChildren<LayoutWithoutSidebarProps>> = (props) => {
  const { header, footer, children } = props;

  return (
    <div className="layout-without-sidebar">
      <div className="layout-without-sidebar__header">
        <Header {...header} />
      </div>
      {children}
      <div className="layout-without-sidebar__footer">
        <Footer {...footer} />
      </div>
    </div>
  );
};
