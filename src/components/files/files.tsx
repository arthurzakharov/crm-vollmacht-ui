import React, { useState, PropsWithChildren } from "react";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import { InputRadio } from "../../form-elements";
import "./files.css";

type GotLetter = "yes" | "no" | "";

export interface FilesProps extends PropsWithChildren {
  uncompletedText: string;
  completedText: string;
  questionText?: string;
  areFilesUploaded: boolean;
  isChildVisible: boolean;
  onCancel?: () => {};
}

export function Files(props: FilesProps) {
  const [gotLetter, setGotLetter] = useState<GotLetter>("");

  const updateQuestionAnswer = (value: GotLetter): void => {
    setGotLetter(value as GotLetter);
    if (value === "no" && props.onCancel) {
      props.onCancel();
    }
  };

  const getDescription = (): string => {
    return props.areFilesUploaded ? props.completedText : props.uncompletedText;
  };

  return (
    <div className="files">
      <p className="files__description" dangerouslySetInnerHTML={{ __html: getDescription() }} />
      {!props.areFilesUploaded && props.questionText ? (
        <div className="files__questions">
          <p className="files__subtitle">{props.questionText}</p>
          <InputRadio<GotLetter>
            options={[
              { label: "Ja", value: "yes" },
              { label: "Nein", value: "no" },
            ]}
            value={gotLetter}
            name="gotLetter"
            status="neutral"
            sizeRadio="m"
            sizeLabel="m"
            onChange={updateQuestionAnswer}
          />
        </div>
      ) : null}
      <AnimateHeight
        duration={300}
        delay={150}
        animateOpacity
        easing="cubic-bezier(0.4, 0, 0.2, 1)"
        height={gotLetter === "yes" || props.isChildVisible ? "auto" : 0}
      >
        <div className={cn("files__upload", { "files__upload--single": props.areFilesUploaded })}>{props.children}</div>
      </AnimateHeight>
    </div>
  );
}
