import React, { FC, Fragment, ReactNode } from "react";
import { Logos, LogosProps, Signature, SignatureProps } from "../../components";
import {
  NavigationButton,
  NavigationButtonProps,
  InputCheckbox,
  InputCheckboxProps,
  SubmitButton,
  SubmitButtonProps,
} from "../../form-elements";
import "./step-checkout.css";

export type StepCheckoutType = "signature" | "logos" | "paragraph" | "navigation" | "checkboxes" | "submit";

export type StepCheckoutRow = {
  isHidden?: boolean;
  type: StepCheckoutType;
  logos?: LogosProps;
  signature?: SignatureProps;
  paragraph?: ReactNode;
  navigation?: NavigationButtonProps[];
  checkboxes?: InputCheckboxProps[];
  submit?: SubmitButtonProps;
};

export interface StepCheckoutProps {
  rows: StepCheckoutRow[];
}

export const StepCheckout: FC<StepCheckoutProps> = ({ rows }) => {
  const getRows = (row: StepCheckoutRow): ReactNode => {
    switch (row.type) {
      case "paragraph":
        return row.paragraph ? (
          <div className="step-checkout__info">
            <p>{row.paragraph}</p>
          </div>
        ) : null;
      case "logos":
        return row.logos ? (
          <div className="step-checkout__logos">
            <Logos {...row.logos} />
          </div>
        ) : null;
      case "navigation":
        return row.navigation ? (
          <div className="step-checkout__action">
            {row.navigation.map((btn, index) => (
              <NavigationButton key={`nav-btn-${index}`} {...btn} />
            ))}
          </div>
        ) : null;
      case "submit":
        return row.submit ? (
          <div className="step-checkout__action">
            <SubmitButton {...row.submit} />
          </div>
        ) : null;
      case "signature":
        return row.signature ? (
          <div className="step-checkout__signature">
            <Signature {...row.signature} />
          </div>
        ) : null;
      case "checkboxes":
        return row.checkboxes ? (
          <div className="step-checkout__checkboxes">
            {row.checkboxes.map((checkbox, checkboxIndex) => (
              <InputCheckbox key={`step-checkout-checkbox-${checkbox.name}-${checkboxIndex}`} {...checkbox}>
                {checkbox.children}
              </InputCheckbox>
            ))}
          </div>
        ) : null;
    }
  };

  return (
    <div className="step-checkout">
      {rows
        .filter((row) => !row.isHidden)
        .map((row, i) => (
          <Fragment key={`row-${i}`}>{getRows(row)}</Fragment>
        ))}
    </div>
  );
};
