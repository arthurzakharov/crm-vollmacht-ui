import type { FC, ReactNode } from "react";
import type { FooterLink } from "../footer/footer";
import React, { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import "./plain-layout.css";

interface Props {
  headerLogo: string;
  headerPhone: string;
  footerLinks: FooterLink[];
  footerName: string;
  children: ReactNode[];
}

const PlaneLayout: FC<Props> = (props) => {
  return (
    <Fragment>
      <div className="plain-layout">
        <div className="plain-layout__header">
          <Header tel={props.headerPhone} logo={props.headerLogo} />
        </div>
        {props.children[0]}
        <div className="plain-layout__footer">
          <Footer name={props.footerName} links={props.footerLinks} />
        </div>
      </div>
      {props.children[1]}
    </Fragment>
  );
};

PlaneLayout.displayName = "PlaneLayout";

export default PlaneLayout;
