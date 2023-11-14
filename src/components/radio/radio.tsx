import type { FC } from "react";
import type { FieldStatus } from "../../types";
import React from "react";
import cn from "classnames";
import "./radio.css";

interface Props {
  value: boolean;
  size: "s" | "l" | "m";
  status: FieldStatus;
  focused?: boolean;
  disabled?: boolean;
}

const Radio: FC<Props> = (props) => {
  const radioCn = (): string => {
    return cn("radio", {
      "radio--s": props.size === "s",
      "radio--m": props.size === "m",
      "radio--l": props.size === "l",
      "radio--error": props.status === "error",
      "radio--neutral": props.status === "neutral",
      "radio--success": props.status === "success",
      "radio--checked": props.value,
      "radio--focused": !!props.focused,
      "radio--disabled": !!props.disabled,
    });
  };

  return <div className={radioCn()} />;
};

Radio.displayName = "Radio";

export default Radio;
