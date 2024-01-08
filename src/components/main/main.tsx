import type { PropsWithChildren, FC } from "react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import "./main.css";

type Page = "home" | "remuneration" | "attachment" | "error";

interface Props extends PropsWithChildren {
  page: null | Page;
  formTitle: string;
  formSubtitle: string;
  formText: string;
  charge: string;
  reference: string;
  chargeTitle: string;
  referenceTitle: string;
}

const Main: FC<Props> = (props) => {
  const isPortableDevice = useMediaQuery("(max-width: 1023px)");

  const isAttachment = (page: null | Page): boolean => {
    return page === "attachment";
  };

  const main = (): string => {
    return cn("main", isAttachment(props.page) ? "main--attachment" : "main--home");
  };

  const mainTitle = (): string => {
    return cn("main__title", { "main--title--no-text-under": !props.formSubtitle && !props.formText });
  };

  return (
    <div className={main()}>
      <h1 className={mainTitle()}>{props.formTitle}</h1>
      {!isAttachment(props.page) && isPortableDevice && (
        <>
          {props.formSubtitle ? <h2 className="main__subtitle">{props.formSubtitle}</h2> : null}
          {props.formText ? <p className="main__text">{props.formText}</p> : null}
          {props.formSubtitle || props.formText ? <hr className="main__line" /> : null}
          <div className="main__info">
            <p className="main__client">
              <strong>{props.chargeTitle}</strong>
              <span dangerouslySetInnerHTML={{ __html: props.charge }} />
            </p>
            <p className="main__client">
              <strong>{props.referenceTitle}</strong>
              <span dangerouslySetInnerHTML={{ __html: props.reference }} />
            </p>
          </div>
        </>
      )}
      {isAttachment(props.page) ? (
        <div className="main__content">
          {props.formSubtitle ? <h2 className="main__subtitle">{props.formSubtitle}</h2> : null}
          {props.formText ? <p className="main__text">{props.formText}</p> : null}
          <hr className="main__line" />
          {props.children}
        </div>
      ) : (
        <div className="main__content">
          <h2 className="main__subtitle">{props.formSubtitle}</h2>
          {props.children}
        </div>
      )}
    </div>
  );
};

Main.displayName = "Main";

export default Main;
