import React, { FC } from "react";
import cn from "classnames";
import "./status-icon.css";

interface Props {
  status: "success" | "error";
  size: "s" | "m" | "l";
  idle?: boolean;
}

const StatusIcon: FC<Props> = (props) => {
  const statusIcon = (): string => {
    return cn("status-icon", {
      "status-icon--success": props.status === "success",
      "status-icon--error": props.status === "error",
      "status-icon--s": props.size === "s",
      "status-icon--m": props.size === "m",
      "status-icon--l": props.size === "l",
      "status-icon--idle": !!props.idle,
      "status-icon--active": !props.idle,
    });
  };

  return <div className={statusIcon()} />;
};

export default StatusIcon;
