import React, { FC, ReactNode, Fragment } from "react";
import { FormRow } from "../../components";
import {
  InputRadio,
  InputRadioProps,
  InputText,
  InputTextProps,
  NavigationButtonType,
  NavigationButton,
} from "../../form-elements";
import "./step-form.css";

export type StepFormInput = {
  type: "radio" | "text";
  radio?: InputRadioProps<string>;
  text?: InputTextProps;
};

export interface StepFormProps {
  input: StepFormInput[][];
  navigation: { type: NavigationButtonType; onClick: () => void }[];
}

export const StepForm: FC<StepFormProps> = ({ input, navigation }) => {
  const getCell = (input: StepFormInput): ReactNode => {
    switch (input.type) {
      case "radio":
        return input.radio ? <InputRadio {...input.radio} /> : null;
      case "text":
        return input.text ? <InputText {...input.text} /> : null;
    }
  };

  return (
    <div className="step-form">
      <div className="step-form__content">
        {input.map((row, rowIndex) => (
          <FormRow key={`step-row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <Fragment key={`step-cell-${rowIndex}-${cellIndex}`}>{getCell(cell)}</Fragment>
            ))}
          </FormRow>
        ))}
      </div>
      <div className="step-form__action">
        {navigation.map((btn, index) => (
          <NavigationButton key={`nav-btn-${index}`} {...btn} />
        ))}
      </div>
    </div>
  );
};
