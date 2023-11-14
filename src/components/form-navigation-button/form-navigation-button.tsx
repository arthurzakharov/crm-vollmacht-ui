import type { FC } from "react";
import React from "react";
import cn from "classnames";
import "./form-navigation-button.css";

interface Props {
  type: "backward" | "forward";
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

  return (
    <button
      type="button"
      tabIndex={0}
      disabled={props.disabled}
      className={formNavigationButton()}
      onClick={() => props.onClick()}
    >
      {props.type === "forward" ? "Weiter" : "Zurück"}
      {props.type === "forward" && <div />}
    </button>
  );
};

FormNavigationButton.displayName = "FormNavigationButton";

export default FormNavigationButton;
