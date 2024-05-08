import React, { FC, PropsWithChildren } from "react";
import Header, { HeaderProps } from "@components/header";
import Footer, { FooterProps } from "@components/footer";
import "./layout-without-sidebar.css";

export interface LayoutWithoutSidebarProps {
  header: HeaderProps;
  footer: FooterProps;
}

const LayoutWithoutSidebar: FC<PropsWithChildren<LayoutWithoutSidebarProps>> = (props) => {
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

export default LayoutWithoutSidebar;
