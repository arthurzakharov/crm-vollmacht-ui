import type { FC, MouseEvent } from "react";
import React from "react";
import cn from "classnames";
import Loader from "../loader";
import "./submit-button.css";

interface Props {
  isLeadSigning: boolean;
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  isSidebarVersion?: boolean;
}

const SubmitButton: FC<Props> = (props) => {
  const submitButtonCn = (): string => {
    return cn("submit-button", props.isLeadSigning ? "submit-button--loading" : "submit-button--idle", {
      "submit-button--sidebar-version": !!props.isSidebarVersion,
    });
  };

  return (
    <button
      type="button"
      tabIndex={0}
      disabled={props.isLeadSigning}
      className={submitButtonCn()}
      onClick={props.onClick}
    >
      {props.isLeadSigning && (
        <div className="submit-button__loader">
          <Loader color="white" />
        </div>
      )}
      {props.text}
    </button>
  );
};

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
