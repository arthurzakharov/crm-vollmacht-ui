import type { FC } from "react";
import React from "react";
import cn from "classnames";
import "./checkbox.css";

interface Props {
  value: boolean;
  focused?: boolean;
  disabled?: boolean;
}

const Checkbox: FC<Props> = (props) => {
  const checkboxCn = (): string => {
    return cn("checkbox", {
      "checkbox--checked": props.value,
      "checkbox--not-checked": !props.value,
      "checkbox--focused": !!props.focused,
      "checkbox--disabled": !!props.disabled,
    });
  };

  return <div className={checkboxCn()} />;
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
