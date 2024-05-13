import React, { PropsWithChildren, FC } from "react";
import { FieldStatus } from "../../types";
import cn from "classnames";
import "./label.css";

export interface LabelProps {
  htmlFor: string;
  size?: "s" | "m";
  status?: FieldStatus;
}

export const Label: FC<PropsWithChildren<LabelProps>> = (props) => {
  const { htmlFor, size = "m", status = "neutral", children } = props;

  const labelCn = (): string =>
    cn("label", {
      "label--s": size === "s",
      "label--m": size === "m",
      "label--neutral": status === "neutral",
      "label--success": status === "success",
      "label--error": status === "error",
    });

  return (
    <label htmlFor={htmlFor} data-size={size} data-status={status} className={labelCn()}>
      {children}
    </label>
  );
};
