import type { MouseEvent, FC } from "react";
import type { FieldStatus, Option } from "../../types";
import React, { useState } from "react";
import Label from "../label";
import Radio from "../radio";
import "./input-radio.css";

interface Props {
  options: Option[];
  value: string;
  name: string;
  status: FieldStatus;
  sizeRadio: "m" | "l";
  sizeLabel: "s" | "m";
  disabled?: boolean;
  onChange: (value: string) => void;
}

const InputRadio: FC<Props> = (props) => {
  const [focusedOption, setFocusedOption] = useState<string>("");

  const onOptionClick = (e: MouseEvent<HTMLDivElement>, value: string): void => {
    e.preventDefault();
    if ((e.clientX === 0 && e.clientY === 0) || props.disabled) return;
    props.onChange(value);
  };

  return (
    <div className="input-radio">
      {props.options.map((option: Option) => (
        <div key={option.value} className="input-radio__option" onClick={(e) => onOptionClick(e, option.value)}>
          <input
            id={option.value}
            value={option.value}
            name={props.name}
            disabled={props.disabled}
            type="radio"
            tabIndex={0}
            checked={props.value === option.value}
            className="input-radio__element"
            onFocus={(e) => setFocusedOption(e.target.value)}
            onBlur={() => setFocusedOption("")}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <div className="input-radio__box">
            <Radio
              value={props.value === option.value}
              focused={focusedOption === option.value}
              disabled={props.disabled}
              status={props.status}
              size={props.sizeRadio}
            />
          </div>
          <div className="input-radio__label">
            <Label htmlFor={option.value} size={props.sizeLabel} status={props.status}>
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

InputRadio.displayName = "InputRadio";

export default InputRadio;
