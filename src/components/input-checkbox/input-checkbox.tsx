import type { MouseEvent, PropsWithChildren, FC } from "react";
import type { FieldStatus } from "../../types";
import React from "react";
import { useToggle } from "usehooks-ts";
import cn from "classnames";
import Checkbox from "../checkbox";
import Label from "../label";
import { StatusIcon } from "../status-icon";
import "./input-checkbox.css";

interface Props extends PropsWithChildren {
  value: boolean;
  name: string;
  status: FieldStatus;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

const InputCheckbox: FC<Props> = (props) => {
  const [isFocused, toggleFocused] = useToggle(false);

  const onContentClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    if (element.tagName === "BUTTON" || element.tagName === "A" || props.disabled) return;
    props.onChange(!props.value);
  };

  const contentCn = (): string => {
    return cn("input-checkbox__content", {
      "input-checkbox__content--neutral": props.status === "neutral",
      "input-checkbox__content--success": props.status === "success",
      "input-checkbox__content--error": props.status === "error",
    });
  };

  return (
    <div data-id={props.name} className="input-checkbox">
      <input
        disabled={props.disabled}
        type="checkbox"
        tabIndex={0}
        id={props.name}
        checked={props.value}
        className="input-checkbox__element"
        onFocus={() => toggleFocused()}
        onBlur={() => toggleFocused()}
        onChange={() => props.onChange(!props.value)}
      />
      <div className={contentCn()} onClick={onContentClick}>
        <div className="input-checkbox__checkbox-wrap">
          <Checkbox disabled={props.disabled} value={props.value} focused={isFocused} />
        </div>
        <div className="input-checkbox__label">
          <Label htmlFor={props.name} size="s" status="neutral">
            {props.children}
          </Label>
        </div>
      </div>
      {props.status === "error" && (
        <div className="input-checkbox__icon">
          <StatusIcon status="error" size="m" />
        </div>
      )}
    </div>
  );
};

InputCheckbox.displayName = "InputCheckbox";

export default InputCheckbox;
