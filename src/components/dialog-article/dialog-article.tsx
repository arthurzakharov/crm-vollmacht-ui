import React, { useState, FC, PropsWithChildren } from "react";
import { useMoveFocus } from "../../hooks";
import { blurOnClick } from "../../utils";
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

  const isFooterShown = (): boolean => (!!cancelButton && !!onCancel) || (!!confirmButton && !!onConfirm);

  return (
    <article className="dialog-article">
      {!hasNoCloseButton ? (
        <div data-testid="dialog-article-panel" className="dialog-article__panel">
          <div ref={buttonRef} tabIndex={tabIndex} onBlur={() => setTabIndex(-1)} />
          <button
            data-testid="dialog-article-close"
            type="button"
            tabIndex={0}
            className="dialog-article__close"
            onClick={(e) => blurOnClick(e, () => onClose())}
          />
        </div>
      ) : null}
      {children}
      {isFooterShown() && (
        <div data-testid="dialog-article-footer" className="dialog-article__footer">
          {cancelButton && onCancel && (
            <button
              data-testid="dialog-article-button-cancel"
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--cancel"
              onClick={(e) => blurOnClick(e, () => onCancel())}
            >
              {cancelButton}
            </button>
          )}
          {confirmButton && onConfirm && (
            <button
              data-testid="dialog-article-button-confirm"
              type="button"
              tabIndex={0}
              className="dialog-article__button dialog-article__button--confirm"
              onClick={(e) => blurOnClick(e, () => onConfirm())}
            >
              {confirmButton}
            </button>
          )}
        </div>
      )}
    </article>
  );
};
