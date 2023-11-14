import type { PropsWithChildren, FC } from "react";
import type { FieldStatus } from "../../types";
import React from "react";
import cn from "classnames";
import "./label.css";

interface Props extends PropsWithChildren {
  htmlFor: string;
  size: "s" | "m";
  status: FieldStatus;
}

const Label: FC<Props> = (props) => {
  const labelCn = (): string => {
    return cn("label", {
      "label--s": props.size === "s",
      "label--m": props.size === "m",
      "label--neutral": props.status === "neutral",
      "label--success": props.status === "success",
      "label--error": props.status === "error",
    });
  };

  return (
    <label htmlFor={props.htmlFor} data-size={props.size} data-status={props.status} className={labelCn()}>
      {props.children}
    </label>
  );
};

Label.displayName = "Label";

export default Label;
