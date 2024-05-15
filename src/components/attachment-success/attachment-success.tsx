import React, { FC } from "react";
import "./attachment-success.css";

export interface AttachmentSuccessProps {
  icon: string;
  title: string;
  text: string[];
}

export const AttachmentSuccess: FC<AttachmentSuccessProps> = ({ icon, title, text }) => (
  <div className="attachment-success">
    <img alt="submitted" src={icon} className="attachment-success__image" />
    <h6 className="attachment-success__title">{title}</h6>
    {text.map((t: string, index: number) => (
      <p key={`as-${index}`} className="attachment-success__text">
        {t}
      </p>
    ))}
  </div>
);
