import React, { MouseEvent } from "react";
import cn from "classnames";
import StatusIcon from "../status-icon";
import "./questionnaire-title.css";

interface Props<N extends string> {
  isInactive: boolean;
  isNotCompleteAtAll: boolean;
  isNotFullyComplete: boolean;
  isFullyComplete: boolean;
  sectionTitle: string;
  sectionId: N;
  onClick: (name: N) => void;
  isHidden?: boolean;
}

function QuestionnaireTitle<N extends string>(props: Props<N>) {
  const onClickTitle = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget as HTMLButtonElement;
    button.blur();
    props.onClick(props.sectionId);
  };

  return !props.isHidden ? (
    <div
      className={cn("questionnaire-title", {
        "questionnaire-title--is-inactive": props.isInactive,
        "questionnaire-title--not-complete-at-all": props.isNotCompleteAtAll,
        "questionnaire-title--not-fully-complete": props.isNotFullyComplete,
        "questionnaire-title--fully-complete": props.isFullyComplete,
      })}
    >
      <button type="button" tabIndex={0} onClick={onClickTitle}>
        {props.sectionTitle}
      </button>
      <div className="questionnaire-title__icon">
        <StatusIcon status="success" size="s" />
      </div>
    </div>
  ) : null;
}

QuestionnaireTitle.displayName = "QuestionnaireTitle";

export default QuestionnaireTitle;
