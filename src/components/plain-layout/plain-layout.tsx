import React, { FC, PropsWithChildren } from "react";
import type { FooterLink } from "../footer/footer";
import Header from "../header";
import Footer from "../footer";
import "./plain-layout.css";

interface Props {
  headerLogo: string;
  headerPhone: string;
  footerLinks: FooterLink[];
  footerName: string;
}

const PlaneLayout: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div className="plain-layout">
      <div className="plain-layout__header">
        <Header tel={props.headerPhone} logo={props.headerLogo} />
      </div>
      {props.children}
      <div className="plain-layout__footer">
        <Footer name={props.footerName} links={props.footerLinks} />
      </div>
    </div>
  );
};

PlaneLayout.displayName = 'PlaneLayout';

export default PlaneLayout;
