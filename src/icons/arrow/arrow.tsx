import React from "react";
import cn from "classnames";
import "./arrow.css";

interface Props {
  className?: string;
}

function Arrow(props: Props) {
  return (
    <svg
      className={cn("arrow", props.className)}
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <g>
        <path d="M224.1 284.64l-56.89 56.78-154-154.31a24 24 0 0 1 0-33.94l22.65-22.7a23.93 23.93 0 0 1 33.84 0z" />
        <path d="M435 187.15L241 381.48a23.94 23.94 0 0 1-33.84 0l-40-40 211.34-211a23.93 23.93 0 0 1 33.84 0L435 153.21a24 24 0 0 1 0 33.94z" />
      </g>
    </svg>
  );
}

export default Arrow;
