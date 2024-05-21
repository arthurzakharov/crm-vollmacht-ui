import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import "./navigation-button.css";

export type NavigationButtonType = "backward" | "forward";

export interface NavigationButtonProps {
  type: NavigationButtonType;
  text?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const NavigationButton: FC<NavigationButtonProps> = (props) => {
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
    <button
      data-testid={`navigation-button-${type}`}
      id={`navigation-button-${type}`}
      type="button"
      tabIndex={0}
      disabled={disabled}
      className={navigationButtonCn()}
      onClick={onClickHandler}
    >
      {getText()}
      {type === "forward" && <div />}
    </button>
  );
};
