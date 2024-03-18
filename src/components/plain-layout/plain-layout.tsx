import type { FC, ReactNode } from "react";
import type { FooterLink } from "../footer/footer";
import React, { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import Loader from "../loader";
import "./plain-layout.css";

interface Props {
  headerLogo: string;
  headerPhone?: string;
  footerLinks: FooterLink[];
  footerName: string;
  rejected: boolean;
  fulfilled: boolean;
  children: ReactNode[];
}

const PlaneLayout: FC<Props> = (props) => {
  const getContent = (children: ReactNode[]): ReactNode => {
    if (props.rejected) return children[1];
    if (props.fulfilled) {
      return children[0];
    }
    return (
      <div className="plain-layout__loading">
        <Loader color="orange" />
      </div>
    );
  };
  return (
    <Fragment>
      <div className="plain-layout">
        <div className="plain-layout__header">
          <Header tel={props.headerPhone} logo={props.headerLogo} />
        </div>
        {getContent(props.children)}
        <div className="plain-layout__footer">
          <Footer name={props.footerName} links={props.footerLinks} />
        </div>
      </div>
      {props.children[2]}
    </Fragment>
  );
};

PlaneLayout.displayName = "PlaneLayout";

export default PlaneLayout;
