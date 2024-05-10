import React, { FC } from "react";
import iconTuvSrc from "../../assets/jpeg/tuv/tuv.jpeg";
import iconTlsSrc from "../../assets/png/tls/tls.png";
import "./logos.css";

export type LogoIcon = "tls" | "tuv";

export interface LogosProps {
  show?: LogoIcon[];
}

export const Logos: FC<LogosProps> = (props) => {
  const { show = ["tls", "tuv"] } = props;

  return (
    <div className="logos">
      {show.map((logo) => {
        switch (logo) {
          case "tuv":
            return <img key={logo} alt="tuv-icon" src={iconTuvSrc} className="logos__tuv" />;
          case "tls":
            return (
              <div key={logo} className="logos__tls">
                <img alt="tls-icon" src={iconTlsSrc} className="logos__icon" />
                <span className="logos__text">Höchste</span>
                <span className="logos__text">Datensicherheit.</span>
              </div>
            );
        }
      })}
    </div>
  );
};
