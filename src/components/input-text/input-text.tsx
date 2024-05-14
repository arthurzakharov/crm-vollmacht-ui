import React, { FC, HTMLInputTypeAttribute } from "react";
import { useToggle } from "usehooks-ts";
import { Input } from "../input";
import { Label } from "../label";
import { StatusIcon, StatusIconType } from "../status-icon";
import "./input-text.css";

export interface InputTextProps {
  label: string;
  value: string;
  name: string;
  status?: StatusIconType;
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

export const InputText: FC<InputTextProps> = (props) => {
  const {
    label,
    value,
    name,
    status = "success",
    popup = "",
    placeholder = "",
    masked = false,
    disabled = false,
    maxLength = 12,
    type = "text",
    onChange,
    onFocus = () => {},
    onBlur = () => {},
  } = props;
  const [isFocused, toggleIsFocused] = useToggle(false);

  const onInputFocus = (): void => {
    onFocus();
    toggleIsFocused();
  };

  const onInputBlur = (): void => {
    onBlur();
    toggleIsFocused();
  };

  const isPopupVisible = (): boolean => !!popup && status === "error" && isFocused;

  const isStatusIconVisible = (): boolean => !disabled && (status === "error" || status === "success");

  const getStatusIconState = (): "error" | "success" => (status === "error" ? "error" : "success");

  return (
    <div className="input-text">
      {isPopupVisible() && <div className="input-text__popup">{popup}</div>}
      {label ? (
        <div className="input-text__label">
          <Label htmlFor={name} size="s" status="neutral">
            {label}
          </Label>
        </div>
      ) : null}
      <div className="input-text__wrap">
        <Input
          masked={masked}
          value={value}
          name={name}
          placeholder={placeholder}
          status={status}
          color="primary"
          disabled={disabled}
          maxLength={maxLength}
          type={type}
          onChange={(v: string) => onChange(v)}
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
