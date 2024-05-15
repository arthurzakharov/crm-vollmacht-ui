import React, { FC } from "react";
import { Error404, Error404Props } from "../error-404";
import { LayoutWithoutSidebar } from "../layout-without-sidebar";
import { FooterProps } from "../footer";
import { HeaderProps } from "../header";

export interface ErrorScreenProps {
  header: HeaderProps;
  footer: FooterProps;
  error: Error404Props;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({ header, footer, error }) => (
  <LayoutWithoutSidebar header={header} footer={footer}>
    <Error404 {...error} />
  </LayoutWithoutSidebar>
);
