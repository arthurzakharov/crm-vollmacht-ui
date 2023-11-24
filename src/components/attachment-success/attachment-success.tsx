import React from "react";
import submittedSrc from "../../assets/png/submitted/submitted.png";
import "./attachment-success.css";

interface Props {
  text: string[];
}

function AttachmentSuccess(props: Props) {
  return (
    <div className="attachment-success">
      <img alt="submitted" src={submittedSrc} className="attachment-success__image" />
      <h6 className="attachment-success__title">Vielen Dank!</h6>
      {props.text.map((t: string, index: number) => (
        <p key={`as-${index}`} className="attachment-success__text">
          {t}
        </p>
      ))}
    </div>
  );
}

AttachmentSuccess.displayName = "AttachmentSuccess";

export default AttachmentSuccess;
