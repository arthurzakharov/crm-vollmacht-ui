import React, { FC } from "react";
import cn from "classnames";
import "./status-icon.css";

export type StatusIconType = "success" | "error";

export interface StatusIconProps {
  status: StatusIconType;
  size?: "s" | "m" | "l";
  idle?: boolean;
}

export const StatusIcon: FC<StatusIconProps> = (props) => {
  const { status, size = "m", idle = false } = props;

  const statusIcon = (): string => {
    return cn("status-icon", {
      "status-icon--success": status === "success",
      "status-icon--error": status === "error",
      "status-icon--s": size === "s",
      "status-icon--m": size === "m",
      "status-icon--l": size === "l",
      "status-icon--idle": idle,
      "status-icon--active": !idle,
    });
  };

  return <div className={statusIcon()} />;
};
