import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import "./navigation-button.css";

interface Props {
  type: "backward" | "forward";
  text?: string;
  disabled?: boolean;
  onClick: () => void;
}

const NavigationButton: FC<Props> = (props) => {
  const navigationButtonCn = (): string => {
    return cn("navigation-button", {
      "navigation-button--backward": props.type === "backward",
      "navigation-button--forward": props.type === "forward",
    });
  };

  const getText = (): string => {
    if (props.text) return props.text;
    return props.type === "forward" ? "Weiter" : "Zurück";
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.blur();
    props.onClick();
  };

  return (
    <button type="button" tabIndex={0} disabled={props.disabled} className={navigationButtonCn()} onClick={onClick}>
      {getText()}
      {props.type === "forward" && <div />}
    </button>
  );
};

export default NavigationButton;
