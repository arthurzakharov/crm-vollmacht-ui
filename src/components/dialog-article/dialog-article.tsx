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
  const [tabIndex, setTabIndex] = useState<-1 | 0>(0);
  const buttonRef = useMoveFocus<HTMLDivElement>();

  const isFooterShown = (): boolean => {
    return (!!props.cancelButton && !!props.onCancel) || (!!props.confirmButton && !!props.onConfirm);
  };

  return (
    <article className="dialog-article">
      {!props.hasNoCloseButton && (
        <div className="dialog-article__panel">
          <div ref={buttonRef} tabIndex={tabIndex} onBlur={() => setTabIndex(-1)} />
          <button type="button" tabIndex={0} className="dialog-article__close" onClick={() => props.onClose()} />
        </div>
      )}
      {props.children}
      {isFooterShown() && (
        <div className="dialog-article__footer">
          {props.cancelButton && props.onCancel && (
            <button
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--cancel"
              onClick={() => props.onCancel && props.onCancel()}
            >
              {props.cancelButton}
            </button>
          )}
          {props.confirmButton && props.onConfirm && (
            <button
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--confirm"
              onClick={() => props.onConfirm && props.onConfirm()}
            >
              {props.confirmButton}
            </button>
          )}
        </div>
      )}
    </article>
  );
};
