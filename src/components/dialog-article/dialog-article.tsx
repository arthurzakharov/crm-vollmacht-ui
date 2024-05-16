import React, { useState, FC, PropsWithChildren } from "react";
import useMoveFocus from "../../hooks/useMoveFocus";
import "./dialog-article.css";

export interface DialogArticleProps extends PropsWithChildren {
  hasNoCloseButton?: boolean;
  cancelButton?: string;
  confirmButton?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose: () => void;
}

export const DialogArticle: FC<DialogArticleProps> = (props) => {
  const {
    hasNoCloseButton = false,
    cancelButton = "",
    confirmButton = "",
    onCancel,
    onConfirm,
    onClose,
    children,
  } = props;
  const [tabIndex, setTabIndex] = useState<-1 | 0>(0);
  const buttonRef = useMoveFocus<HTMLDivElement>();

  const isFooterShown = (): boolean => {
    return (!!cancelButton && !!onCancel) || (!!confirmButton && !!onConfirm);
  };

  return (
    <article className="dialog-article">
      {!hasNoCloseButton ? (
        <div className="dialog-article__panel">
          <div ref={buttonRef} tabIndex={tabIndex} onBlur={() => setTabIndex(-1)} />
          <button type="button" tabIndex={0} className="dialog-article__close" onClick={() => onClose()} />
        </div>
      ) : null}
      {children}
      {isFooterShown() && (
        <div className="dialog-article__footer">
          {cancelButton && onCancel && (
            <button
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--cancel"
              onClick={() => onCancel && onCancel()}
            >
              {cancelButton}
            </button>
          )}
          {confirmButton && onConfirm && (
            <button
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--confirm"
              onClick={() => onConfirm && onConfirm()}
            >
              {confirmButton}
            </button>
          )}
        </div>
      )}
    </article>
  );
};
