import type { ReactNode, FC } from "react";
import type { FooterLink } from "../footer/footer";
import React, { Fragment } from "react";
import Footer from "../footer";
import Header from "../header";
import Loader from "../loader";
import "./default-layout.css";

interface Props {
  headerLogo: string;
  headerPhone: string;
  footerLinks: FooterLink[];
  footerName: string;
  rejected: boolean;
  fulfilled: boolean;
  children: ReactNode[];
}

const DefaultLayout: FC<Props> = (props) => {
  const getContent = (children: ReactNode[]): ReactNode => {
    if (props.rejected) return children[2];
    if (props.fulfilled) {
      return (
        <div className="default-layout__content">
          <div className="default-layout__main">{children[0]}</div>
          <div className="default-layout__sidebar">{children[1]}</div>
        </div>
      );
    }
    return (
      <div className="default-layout__loading">
        <Loader color="orange" />
      </div>
    );
  };

  return (
    <Fragment>
      <div className="default-layout">
        <div className="default-layout__header">
          <Header tel={props.headerPhone} logo={props.headerLogo} />
        </div>
        {getContent(props.children)}
        <div className="default-layout__footer">
          <Footer name={props.footerName} links={props.footerLinks} />
        </div>
      </div>
      {props.children[3]}
    </Fragment>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
