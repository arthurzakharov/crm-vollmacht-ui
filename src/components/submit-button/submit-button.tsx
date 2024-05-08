import type { FC, MouseEvent } from "react";
import React from "react";
import cn from "classnames";
import { Loader } from "../loader";
import "./submit-button.css";

interface Props {
  isSigning: boolean;
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  isSidebarVersion?: boolean;
}

const SubmitButton: FC<Props> = (props) => {
  const submitButtonCn = (): string => {
    return cn("submit-button", props.isSigning ? "submit-button--loading" : "submit-button--idle", {
      "submit-button--sidebar-version": !!props.isSidebarVersion,
    });
  };

  return (
    <button type="button" tabIndex={0} disabled={props.isSigning} className={submitButtonCn()} onClick={props.onClick}>
      {props.isSigning && (
        <div className="submit-button__loader">
          <Loader color="secondary" />
        </div>
      )}
      {props.text}
    </button>
  );
};

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
