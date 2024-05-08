import React, { ChangeEvent, FC, HTMLInputTypeAttribute, MouseEvent, useRef, KeyboardEvent } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";
import cn from "classnames";
import { FieldStatus } from "@types";
import "./input.css";

interface Props {
  value: string;
  name: string;
  color: "primary" | "secondary";
  masked?: boolean;
  status?: FieldStatus;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface RefMask extends ReactInputMask, HTMLInputElement {}

const Input: FC<Props> = (props) => {
  const {
    value,
    name,
    color = "primary",
    masked = false,
    status = "neutral",
    disabled = false,
    placeholder = "",
    maxLength,
    type = "text",
    onChange,
    onFocus = () => {},
    onBlur = () => {},
  } = props;
  const ref = useRef<RefMask>(null);

  const inputCn = (): string => {
    return cn("input", {
      "input--primary": color === "primary",
      "input--secondary": color === "secondary",
      "input--neutral": status === "neutral",
      "input--success": status === "success",
      "input--error": status === "error",
    });
  };

  const findEndIndex = (inputString: string): number => {
    let endIndex = -1;
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      if (/\d|\//.test(char)) {
        endIndex = i;
      } else {
        break;
      }
    }
    return endIndex;
  };

  const onDateClick = (e: MouseEvent<HTMLInputElement>) => {
    const caretPosition = findEndIndex(value);
    if (caretPosition < value.length - 1 && ref.current) {
      e.preventDefault();
      ref.current.setSelectionRange(caretPosition + 1, caretPosition + 1, "none");
    }
  };

  const onDateKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      e.preventDefault();
    }
    if (e.code === "ArrowRight" && ref.current) {
      const start = ref.current.selectionStart || 0;
      const nextChar = value[start + 1] === "/" ? value[start + 2] : value[start + 1];
      if (!/^\d+$/.test(nextChar)) {
        e.preventDefault();
      } else {
        const correction = value[start + 1] === "/" ? 1 : 0;
        ref.current.setSelectionRange(start + correction, start + correction, "none");
      }
    }
    if (e.code === "ArrowLeft" && ref.current) {
      e.preventDefault();
      const start = ref.current.selectionStart || 0;
      const prevChar = value[start - 1] === "/" ? value[start - 2] : value[start - 1];
      if (!/^\d+$/.test(prevChar)) {
        e.preventDefault();
      } else {
        const correction = value[start - 1] === "/" ? 2 : 1;
        ref.current.setSelectionRange(start - correction, start - correction, "none");
      }
    }
  };

  return masked ? (
    <InputMask
      ref={ref}
      value={value}
      name={name}
      id={name}
      className={inputCn()}
      disabled={disabled}
      mask="99/99/9999"
      maskPlaceholder="TT/MM/JJJJ"
      placeholder={placeholder}
      onClick={onDateClick}
      onKeyDown={onDateKeyDown}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  ) : (
    <input
      type={type}
      pattern={type === "number" ? "[0-9]*" : undefined}
      inputMode={type === "number" ? "numeric" : undefined}
      maxLength={maxLength}
      value={value}
      name={name}
      id={name}
      placeholder={placeholder}
      className={inputCn()}
      disabled={disabled}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
};

Input.displayName = "Input";

export default Input;
