import React, { FC } from "react";
import cn from "classnames";
import "./checkbox.css";

export interface CheckboxProps {
  value: boolean;
  focused?: boolean;
  disabled?: boolean;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { value, focused = false, disabled = false } = props;

  const checkboxCn = (): string =>
    cn("checkbox", {
      "checkbox--checked": value,
      "checkbox--not-checked": !value,
      "checkbox--focused": focused,
      "checkbox--disabled": disabled,
    });

  return <div className={checkboxCn()} />;
};
