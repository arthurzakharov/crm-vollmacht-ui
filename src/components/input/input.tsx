import React, { ChangeEvent, FC, HTMLInputTypeAttribute, MouseEvent, useRef, KeyboardEvent } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";
import cn from "classnames";
import { FieldStatus } from "../../types";
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
  type?: HTMLInputTypeAttribute;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface RefMask extends ReactInputMask, HTMLInputElement {}

const Input: FC<Props> = (props) => {
  const ref = useRef<RefMask>(null);

  const inputCn = (): string => {
    return cn("input", {
      "input--blue": props.color === "blue",
      "input--gray": props.color === "gray",
      "input--neutral": props.status === "neutral",
      "input--success": props.status === "success",
      "input--error": props.status === "error",
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
    const caretPosition = findEndIndex(props.value);
    if (caretPosition < props.value.length - 1 && ref.current) {
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
      const nextChar = props.value[start + 1] === "/" ? props.value[start + 2] : props.value[start + 1];
      if (!/^\d+$/.test(nextChar)) {
        e.preventDefault();
      } else {
        const correction = props.value[start + 1] === "/" ? 1 : 0;
        ref.current.setSelectionRange(start + correction, start + correction, "none");
      }
    }
    if (e.code === "ArrowLeft" && ref.current) {
      e.preventDefault();
      const start = ref.current.selectionStart || 0;
      const prevChar = props.value[start - 1] === "/" ? props.value[start - 2] : props.value[start - 1];
      if (!/^\d+$/.test(prevChar)) {
        e.preventDefault();
      } else {
        const correction = props.value[start - 1] === "/" ? 2 : 1;
        ref.current.setSelectionRange(start - correction, start - correction, "none");
      }
    }
  };

  return props.masked ? (
    <InputMask
      ref={ref}
      value={props.value}
      name={props.name}
      id={props.name}
      className={inputCn()}
      disabled={props.disabled}
      mask="99/99/9999"
      maskPlaceholder="TT/MM/JJJJ"
      placeholder={props.placeholder}
      onClick={onDateClick}
      onKeyDown={onDateKeyDown}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  ) : (
    <input
      type={props.type}
      pattern={props.type === "number" ? "[0-9]*" : undefined}
      inputMode={props.type === "number" ? "numeric" : undefined}
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
