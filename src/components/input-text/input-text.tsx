import type { FC, HTMLInputTypeAttribute } from "react";
import type { FieldStatus } from "../../types";
import React from "react";
import { useToggle } from "usehooks-ts";
import Input from "../input";
import Label from "../label";
import StatusIcon from "../status-icon";
import "./input-text.css";

interface Props {
  label: string;
  value: string;
  name: string;
  status: FieldStatus;
  popup?: string;
  placeholder?: string;
  masked?: boolean;
  disabled?: boolean;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputText: FC<Props> = (props) => {
  const [isFocused, toggleIsFocused] = useToggle(false);

  const onInputFocus = (): void => {
    props.onFocus && props.onFocus();
    toggleIsFocused();
  };

  const onInputBlur = (): void => {
    props.onBlur && props.onBlur();
    toggleIsFocused();
  };

  const isPopupVisible = (): boolean => {
    return !!props.popup && props.status === "error" && isFocused;
  };

  const isStatusIconVisible = (): boolean =>
    !props.disabled && (props.status === "error" || props.status === "success");

  const getStatusIconState = (): FieldStatus => {
    return props.status === "error" ? "error" : "success";
  };

  return (
    <div className="input-text">
      {isPopupVisible() && <div className="input-text__popup">{props.popup}</div>}
      {props.label ? (
        <div className="input-text__label">
          <Label htmlFor={props.name} size="s" status="neutral">
            {props.label}
          </Label>
        </div>
      ) : null}
      <div className="input-text__wrap">
        <Input
          masked={props.masked}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          status={props.status}
          color="blue"
          disabled={props.disabled}
          maxLength={props.maxLength}
          type={props.type}
          onChange={(v: string) => props.onChange(v)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        {isStatusIconVisible() && (
          <div className="input-text__icon">
            <StatusIcon status={getStatusIconState()} size="l" />
          </div>
        )}
      </div>
    </div>
  );
};

InputText.displayName = "InputText";

export default InputText;
