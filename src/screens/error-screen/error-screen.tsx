import React, { FC } from "react";
import { Error404, Error404Props, LayoutWithoutSidebar, FooterProps, HeaderProps } from "../../components";

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
