import type { FC, PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import InputRadio from "../input-radio";
import "./files.css";
import { AttachmentStep } from "../../types";

type GotLetter = "yes" | "no" | "";

interface Props {
  completed: boolean;
  activeSection: null | AttachmentStep;
  setActiveAttachmentSection: (activeSection: null | AttachmentStep) => void;
  setFilesUploadingMore: (v: boolean) => void;
}

const Files: FC<PropsWithChildren<Props>> = (props) => {
  const [gotLetter, setGotLetter] = useState<GotLetter>("");

  const updateQuestionAnswer = (value: string): void => {
    setGotLetter(value as GotLetter);
    if (value === "no") {
      // TODO: What if there is no survey next. It was already answered
      props.setActiveAttachmentSection("survey");
    }
  };

  const getDescription = (): string =>
    props.completed
      ? "Sobald Sie neue Behördenschreiben erhalten, übermitteln Sie uns diese bitte umgehend."
      : "Wir können mit der Fallbearbeitung des registrierten Verstoßes erst beginnen, wenn uns <strong>das letzte Schreiben, das Sie von der Behörde erhalten</strong> haben, vorliegt.";

  useEffect(() => {
    if (props.activeSection !== "files") {
      setTimeout(() => {
        setGotLetter(props.completed ? "yes" : "");
        props.setFilesUploadingMore(false);
      }, 450);
    }
  }, [props.activeSection]);

  return (
    <div className="files">
      <p className="files__description" dangerouslySetInnerHTML={{ __html: getDescription() }} />
      {!props.completed && (
        <div className={cn("files__questions", { "files__questions--single": gotLetter !== "yes" })}>
          <p className="files__subtitle">Haben Sie bereits Post von der Behörde erhalten?</p>
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
