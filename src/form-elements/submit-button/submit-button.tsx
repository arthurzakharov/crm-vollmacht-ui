import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import { Loader } from "../../components";
import "./submit-button.css";

export type SubmitButtonVersion = "main" | "sidebar";

export interface SubmitButtonProps {
  loading: boolean;
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  version?: SubmitButtonVersion;
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { loading, text, onClick, version = "main" } = props;

  const submitButtonCn = (): string =>
    cn("submit-button", {
      "submit-button--loading": loading,
      "submit-button--idle": !loading,
      "submit-button--sidebar-version": version === "sidebar",
    });

  return (
    <button type="button" tabIndex={0} disabled={loading} className={submitButtonCn()} onClick={onClick}>
      {loading && (
        <div className="submit-button__loader">
          <Loader color="secondary" />
        </div>
      )}
      {text}
    </button>
  );
};
