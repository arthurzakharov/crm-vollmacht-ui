import React, { FC, HTMLInputTypeAttribute } from "react";
import { useToggle } from "usehooks-ts";
import { Input } from "../input";
import { Label, StatusIcon } from "../../components";
import { FieldStatus } from "../../types";
import "./input-text.css";

export interface InputTextProps {
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

export const InputText: FC<InputTextProps> = (props) => {
  const {
    label,
    value,
    name,
    status = "neutral",
    popup = "",
    placeholder = "",
    masked = false,
    disabled = false,
    maxLength = 12,
    type = "text",
    onChange,
    onFocus,
    onBlur,
  } = props;
  const [isFocused, toggleIsFocused] = useToggle(false);

  const onInputFocus = (): void => {
    onFocus && onFocus();
    toggleIsFocused();
  };

  const onInputBlur = (): void => {
    onBlur && onBlur();
    toggleIsFocused();
  };

  return (
    <div className="input-text">
      {status === "error" && isFocused ? (
        <div data-testid="input-text-popup" className="input-text__popup">
          {popup}
        </div>
      ) : null}
      {label ? (
        <div data-testid="input-text-label" className="input-text__label">
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
        {!disabled && (status === "error" || status === "success") ? (
          <div data-testid="input-text-icon" className="input-text__icon">
            <StatusIcon status={status} size="l" />
          </div>
        ) : null}
      </div>
    </div>
  );
};
