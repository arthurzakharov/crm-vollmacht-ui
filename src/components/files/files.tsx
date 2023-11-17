import type { FC, PropsWithChildren } from "react";
import React, { useState } from "react";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import InputRadio from "../input-radio";
import "./files.css";

type GotLetter = "yes" | "no" | "";

interface Props {
  uncompletedText: string;
  completedText: string;
  questionText: string;
  completed: boolean;
  onCancel: () => {};
  reset: () => {};
}

const Files: FC<PropsWithChildren<Props>> = (props) => {
  const [gotLetter, setGotLetter] = useState<GotLetter>("");

  const updateQuestionAnswer = (value: string): void => {
    setGotLetter(value as GotLetter);
    if (value === "no") {
      props.onCancel();
    }
  };

  const getDescription = (): string => {
    return props.completed ? props.completedText : props.uncompletedText;
  };

  return (
    <div className="files">
      <p className="files__description" dangerouslySetInnerHTML={{ __html: getDescription() }} />
      {!props.completed && (
        <div className={cn("files__questions", { "files__questions--single": gotLetter !== "yes" })}>
          <p className="files__subtitle">{props.questionText}</p>
          <InputRadio
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
      )}
      <AnimateHeight
        duration={300}
        delay={150}
        animateOpacity
        easing="cubic-bezier(0.4, 0, 0.2, 1)"
        height={gotLetter === "yes" ? "auto" : 0}
      >
        <div className={cn("files__upload", { "files__upload--single": props.completed })}>{props.children}</div>
      </AnimateHeight>
    </div>
  );
};

Files.displayName = "Files";

export default Files;
