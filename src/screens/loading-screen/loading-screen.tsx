import React, { FC } from "react";
import { Loader, LayoutWithoutSidebar, FooterProps, HeaderProps } from "../../components";
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
