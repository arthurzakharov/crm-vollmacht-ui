import React, { useEffect, useState, useRef, Fragment, FC, ReactNode } from "react";
import { useScrollLock, useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import "./dialog.css";

export type DialogRecord = {
  name: string;
  element: ReactNode;
};

export type DialogPosition = "top" | "center";

export type DialogSize = "s" | "m";

export interface DialogProps {
  dialogs: DialogRecord[];
  lockTarget?: string;
  name?: string;
  position?: DialogPosition;
  size?: DialogSize;
  onOverlayClick: () => void;
  onClose: () => void;
}

export const Dialog: FC<DialogProps> = (props) => {
  const { dialogs, lockTarget = "#root", name = "", position = "top", size = "m", onOverlayClick, onClose } = props;
  const { isLocked, lock, unlock } = useScrollLock({ autoLock: false, lockTarget });
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(true);
  const [localDialog, setLocalDialog] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isDialogContentVisible = (dialogName: string): boolean => name === dialogName || localDialog === dialogName;

  const dialogCn = (): string =>
    cn("dialog", name && !isClosing ? "dialog--visible" : "dialog--hidden", {
      "dialog--top": position === "top",
      "dialog--center": position === "center",
      "dialog--s": size === "s",
      "dialog--m": size === "m",
    });

  useOnClickOutside(contentRef, onOverlayClick);

  useEffect(() => {
    if (name) setLocalDialog(name);
    if (name && !isMounted) {
      setIsMounted(true);
      setIsClosing(false);
      isLocked ? unlock() : lock();
    }
    if (!name && isMounted) {
      isLocked ? unlock() : lock();
      setTimeout(() => {
        setIsMounted(false);
        setLocalDialog(null);
        onClose();
      }, 300);
    }
  }, [name, isMounted]);

  return (name || localDialog) && isMounted ? (
    <div className={dialogCn()}>
      <div ref={contentRef} className="dialog__content">
        {dialogs.map((dialog: DialogRecord) =>
          isDialogContentVisible(dialog.name) ? <Fragment key={dialog.name}>{dialog.element}</Fragment> : null,
        )}
      </div>
    </div>
  ) : null;
};
