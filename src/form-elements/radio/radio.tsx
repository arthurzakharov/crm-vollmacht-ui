import React, { FC } from "react";
import cn from "classnames";
import { FieldStatus } from "../../types";
import "./radio.css";

export interface RadioProps {
  value: boolean;
  size: "s" | "l" | "m";
  status: FieldStatus;
  focused?: boolean;
  disabled?: boolean;
}

export const Radio: FC<RadioProps> = (props) => {
  const { value, size, status, focused = false, disabled = false } = props;

  const radioCn = (): string =>
    cn("radio", {
      "radio--s": size === "s",
      "radio--m": size === "m",
      "radio--l": size === "l",
      "radio--error": status === "error",
      "radio--neutral": status === "neutral",
      "radio--success": status === "success",
      "radio--checked": value,
      "radio--focused": focused,
      "radio--disabled": disabled,
    });

  return <div className={radioCn()} />;
};
