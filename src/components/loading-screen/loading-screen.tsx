import React, { FC } from "react";
import { Loader } from "../loader";
import { LayoutWithoutSidebar } from "../layout-without-sidebar";
import { FooterProps } from "../footer";
import { HeaderProps } from "../header";
import "./loading-screen.css";

export interface LoadingScreenProps {
  header: HeaderProps;
  footer: FooterProps;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ header, footer }) => (
  <LayoutWithoutSidebar header={header} footer={footer}>
    <div className="loading-screen">
      <Loader color="primary" />
    </div>
  </LayoutWithoutSidebar>
);
