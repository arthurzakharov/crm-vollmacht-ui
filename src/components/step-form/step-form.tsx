import React, { FC, ReactNode, Fragment } from "react";
import { NavigationButtonType, NavigationButton } from "../navigation-button";
import { FormRow } from "../form-row";
import { InputRadio, InputRadioProps } from "../input-radio";
import { InputText, InputTextProps } from "../input-text";
import "./step-form.css";

export type StepFormInput = {
  type: "radio" | "text";
  radio?: InputRadioProps<any>;
  text?: InputTextProps;
};

export type StepFormNavigation = { type: NavigationButtonType; onClick: () => void };

export interface StepFormProps {
  input: StepFormInput[][];
  navigation: StepFormNavigation[];
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
