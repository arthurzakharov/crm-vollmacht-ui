import React from "react";
import cn from "classnames";

interface Props {
  className?: string;
}

function EditPen(props: Props) {
  return (
    <svg
      className={cn("edit-pen", props.className)}
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g>
        <path d="M498 142.08l-56.6 56.55-128-128 56.55-56.55a48 48 0 0 1 67.91 0L498 74.17a48 48 0 0 1 0 67.91z" />
        <path d="M12.85 371.11L.15 485.33a24 24 0 0 0 26.49 26.51l114.14-12.6 278-278-128-128z" />
      </g>
    </svg>
  );
}

EditPen.displayName = "EditPen";

export default EditPen;
