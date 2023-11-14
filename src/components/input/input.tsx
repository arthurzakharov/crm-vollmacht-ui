import type { ChangeEvent, FC } from "react";
import type { FieldStatus } from "../../types";
import React from "react";
import InputMask from "react-input-mask";
import cn from "classnames";
import "./input.css";

interface Props {
  value: string;
  name: string;
  color: "blue" | "gray";
  masked?: boolean;
  status?: FieldStatus;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: FC<Props> = (props) => {
  const inputCn = (): string => {
    return cn("input", {
      "input--blue": props.color === "blue",
      "input--gray": props.color === "gray",
      "input--neutral": props.status === "neutral",
      "input--success": props.status === "success",
      "input--error": props.status === "error",
    });
  };

  return props.masked ? (
    <InputMask
      value={props.value}
      name={props.name}
      id={props.name}
      className={inputCn()}
      disabled={props.disabled}
      mask="99/99/9999"
      maskPlaceholder="TT/MM/JJJJ"
      placeholder={props.placeholder}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  ) : (
    <input
      maxLength={props.maxLength}
      value={props.value}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      className={inputCn()}
      disabled={props.disabled}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  );
};

Input.displayName = "Input";

export default Input;
