import React, { PropsWithChildren, FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import { Screen } from "../../types";
import "./main.css";

export interface MainProps {
  screen: Screen | null;
  title: string;
  subtitle?: string;
  text?: string;
  step?: string;
  infoList?: [string, string][];
}

export const Main: FC<PropsWithChildren<MainProps>> = (props) => {
  const { screen, title, subtitle = "", text = "", step = "", infoList = [], children } = props;
  const isPortableDevice = useMediaQuery("(max-width: 1023px)");

  const main = (): string => cn("main", screen === "attachment" ? "main--attachment" : "main--home");

  const mainTitle = (): string => cn("main__title", { "main--title--no-text-under": !subtitle && !text });

  return (
    <div className={main()}>
      <h1 className={mainTitle()}>{title}</h1>
      {screen !== "attachment" && isPortableDevice && infoList && (
        <div className="main__info">
          {infoList.map(([key, value], index) => (
            <p key={`main-client-${index}`} className="main__client">
              <strong>{key}</strong>
              <span dangerouslySetInnerHTML={{ __html: value }} />
            </p>
          ))}
        </div>
      )}
      {screen === "attachment" ? (
        <div className="main__content">
          {subtitle && <h2 className="main__subtitle">{subtitle}</h2>}
          {text && <p className="main__text">{text}</p>}
          <hr className="main__line" />
          {children}
        </div>
      ) : (
        <div className="main__content">
          {subtitle && <h2 className="main__subtitle">{subtitle}</h2>}
          {text && <p className="main__text">{text}</p>}
          {(subtitle || text) && <hr className="main__line" />}
          {step && <h4 className="main__step">{step}</h4>}
          {children}
        </div>
      )}
    </div>
  );
};
