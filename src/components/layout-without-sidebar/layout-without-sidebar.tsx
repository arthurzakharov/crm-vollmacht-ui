import React, { FC, PropsWithChildren } from "react";
import Header from "../header";
import Footer from "../footer";
import "./layout-without-sidebar.css";

interface LayoutWithoutSidebarProps {
  header: {
    logo: string;
    tel?: string;
    descriptions?: {
      size: "s" | "m";
      value: string;
    }[];
  };
  footer: {
    name: string;
    links?: {
      text: string;
      onClick: () => void;
    }[];
  };
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
