import type { FC, ReactNode } from "react";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLockedBody, useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import "./dialog.css";

type DialogRecord = {
  name: string;
  element: ReactNode;
};

interface Props {
  dialogs: DialogRecord[];
  name: null | string;
  position: null | string;
  size: null | string;
  onOverlayClick: () => void;
  onClose: () => void;
}

const Dialog: FC<Props> = (props) => {
  const [locked, setLocked] = useLockedBody(false, "root");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(true);
  const [localDialog, setLocalDialog] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isDialogContentVisible = (dialogName: string): boolean => {
    return props.name === dialogName || localDialog === dialogName;
  };

  const dialogCn = (): string => {
    return cn("dialog", props.name && !isClosing ? "dialog--visible" : "dialog--hidden", {
      "dialog--top": props.position === "top",
      "dialog--center": props.position === "center",
      "dialog--s": props.size === "s",
      "dialog--m": props.size === "m",
    });
  };

  useOnClickOutside(contentRef, props.onOverlayClick);

  useEffect(() => {
    if (props.name) setLocalDialog(props.name);
    if (props.name && !isMounted) {
      setIsMounted(true);
      setIsClosing(false);
      setLocked(!locked);
    }
    if (!props.name && isMounted) {
      setLocked(!locked);
      setTimeout(() => {
        setIsMounted(false);
        setLocalDialog(null);
        props.onClose();
      }, 300);
    }
  }, [props.name, isMounted]);

  return (props.name || localDialog) && isMounted ? (
    <div className={dialogCn()}>
      <div ref={contentRef} className="dialog__content">
        {props.dialogs.map((dialog: DialogRecord) => {
          return isDialogContentVisible(dialog.name) ? <Fragment key={dialog.name}>{dialog.element}</Fragment> : null;
        })}
      </div>
    </div>
  ) : null;
};

Dialog.displayName = "Dialog";

export default Dialog;
