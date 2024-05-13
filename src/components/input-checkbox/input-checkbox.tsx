import React, { MouseEvent, PropsWithChildren, FC } from "react";
import { useToggle } from "usehooks-ts";
import cn from "classnames";
import { FieldStatus } from "../../types";
import { Checkbox } from "../checkbox";
import { Label } from "../label";
import { StatusIcon } from "../status-icon";
import "./input-checkbox.css";

export interface InputCheckboxProps {
  value: boolean;
  name: string;
  status?: FieldStatus;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

export const InputCheckbox: FC<PropsWithChildren<InputCheckboxProps>> = (props) => {
  const { value, name, status = "neutral", disabled = false, onChange, children } = props;

  const [isFocused, toggleFocused] = useToggle(false);

  const onContentClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    if (element.tagName === "BUTTON" || element.tagName === "A" || disabled) {
      const linkOrButton = e.target as HTMLElement;
      linkOrButton.blur();
      return;
    }
    onChange(!value);
  };

  const contentCn = (): string =>
    cn("input-checkbox__content", {
      "input-checkbox__content--neutral": status === "neutral",
      "input-checkbox__content--success": status === "success",
      "input-checkbox__content--error": status === "error",
    });

  return (
    <div data-id={name} className="input-checkbox">
      <input
        disabled={disabled}
        type="checkbox"
        tabIndex={0}
        id={name}
        checked={value}
        className="input-checkbox__element"
        onFocus={() => toggleFocused()}
        onBlur={() => toggleFocused()}
        onChange={() => onChange(!value)}
      />
      <div className={contentCn()} onClick={onContentClick}>
        <div className="input-checkbox__checkbox-wrap">
          <Checkbox disabled={disabled} value={value} focused={isFocused} />
        </div>
        <div className="input-checkbox__label">
          <Label htmlFor={name} size="s" status="neutral">
            {children}
          </Label>
        </div>
      </div>
      {status === "error" && (
        <div className="input-checkbox__icon">
          <StatusIcon status="error" size="m" />
        </div>
      )}
    </div>
  );
};
