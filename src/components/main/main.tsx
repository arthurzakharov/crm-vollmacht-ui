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

  return (
    <div className={main()}>
      <h1 className="main__title">{props.formTitle}</h1>
      {!isAttachment(props.page) && isPortableDevice && (
        <div className="main__info">
          <p className="main__client">
            <strong>{props.chargeTitle}: </strong>
            {props.charge}
          </p>
          <p className="main__client">
            <strong>{props.referenceTitle}: </strong>
            {props.reference}
          </p>
        </div>
      )}
      {isAttachment(props.page) ? (
        <div className="main__content">
          <h2 className="main__subtitle">Danke für Ihr Vertrauen</h2>
          <p className="main__text">Für eine schnelle Bearbeitung benötigen wir noch folgende Informationen.</p>
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
