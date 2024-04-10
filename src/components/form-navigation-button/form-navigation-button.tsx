import type { FC } from "react";
import React from "react";
import cn from "classnames";
import "./form-navigation-button.css";

interface Props {
  type: "backward" | "forward";
  text?: string;
  disabled?: boolean;
  onClick: () => void;
}

const FormNavigationButton: FC<Props> = (props) => {
  const formNavigationButton = (): string => {
    return cn("form-navigation-button", {
      "form-navigation-button--backward": props.type === "backward",
      "form-navigation-button--forward": props.type === "forward",
    });
  };

  const getText = (): string => {
    if (props.text) return props.text;
    return props.type === "forward" ? "Weiter" : "Zurück";
  };

  return (
    <button
      type="button"
      tabIndex={0}
      disabled={props.disabled}
      className={formNavigationButton()}
      onClick={() => props.onClick()}
    >
      {getText()}
      {props.type === "forward" && <div />}
    </button>
  );
};

FormNavigationButton.displayName = "FormNavigationButton";

export default FormNavigationButton;
