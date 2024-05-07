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
  const { type, text = "", disabled = false, onClick } = props;

  const navigationButtonCn = (): string => {
    return cn("navigation-button", {
      "navigation-button--backward": type === "backward",
      "navigation-button--forward": type === "forward",
    });
  };

  const getText = (): string => {
    if (text) return text;
    return type === "forward" ? "Weiter" : "Zurück";
  };

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.blur();
    onClick();
  };

  return (
    <button type="button" tabIndex={0} disabled={disabled} className={navigationButtonCn()} onClick={onClickHandler}>
      {getText()}
      {type === "forward" && <div />}
    </button>
  );
};

export default NavigationButton;
