import React, { MouseEvent, useState } from "react";
import { FieldStatus, Option } from "../../types";
import Label from "../label";
import { Radio } from "../radio";
import "./input-radio.css";

export interface InputRadioProps<T extends string> {
  options: Option<T>[];
  value: T;
  name: string;
  status?: FieldStatus;
  sizeRadio?: "m" | "l";
  sizeLabel?: "s" | "m";
  disabled?: boolean;
  onChange: (v: T, t: string) => void;
}

export const InputRadio = <T extends string>(props: InputRadioProps<T>) => {
  const {
    options,
    value,
    name,
    status = "neutral",
    sizeRadio = "m",
    sizeLabel = "m",
    disabled = false,
    onChange,
  } = props;
  const [focusedOption, setFocusedOption] = useState<string>("");

  const onOptionClick = (e: MouseEvent<HTMLDivElement>, value: T): void => {
    e.preventDefault();
    if ((e.clientX === 0 && e.clientY === 0) || disabled) return;
    onChange(value, e.type);
  };

  return (
    <div className="input-radio">
      {options.map((option: Option<T>) => (
        <div
          id={name}
          key={option.value}
          className="input-radio__option"
          onClick={(e) => onOptionClick(e, option.value)}
        >
          <input
            id={option.value}
            value={option.value}
            name={name}
            disabled={disabled}
            type="radio"
            tabIndex={0}
            checked={value === option.value}
            className="input-radio__element"
            onFocus={(e) => setFocusedOption(e.target.value)}
            onBlur={() => setFocusedOption("")}
            onChange={(e) => onChange(e.target.value as T, e.type)}
          />
          <div className="input-radio__box">
            <Radio
              value={value === option.value}
              focused={focusedOption === option.value}
              disabled={disabled}
              status={status}
              size={sizeRadio}
            />
          </div>
          <div className="input-radio__label">
            <Label htmlFor={option.value} size={sizeLabel} status={status}>
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};
