import type { ReactNode, MouseEvent } from "react";
import type { QuestionType } from "../../types";
import React, { useEffect } from "react";
import cn from "classnames";
import InputRadio from "../input-radio";
import InputText from "../input-text";
import "./question.css";

type QuestionState = "answered" | "active" | "not-answered";

interface Props<ALL_ID extends string, ID extends ALL_ID> {
  flow: ALL_ID[];
  active?: ALL_ID;
  value: string;
  onChange: (question: QuestionType<ALL_ID, ID>, value: string) => void;
  onNext: (question: QuestionType<ALL_ID, ID>, value: string) => void;
  onEnterKeyDown: (question: QuestionType<ALL_ID, ID>, value: string) => void;
  onTitleClickInAnsweredState: (question: QuestionType<ALL_ID, ID>) => void;
  onContentClickInAnsweredState: (question: QuestionType<ALL_ID, ID>) => void;
  question: QuestionType<ALL_ID, ID>;
}

function Question<ALL_ID extends string, ID extends ALL_ID>(props: Props<ALL_ID, ID>) {
  const getQuestionState = (): QuestionState => {
    const questionIndex = props.flow.indexOf(props.question.id);
    const activeQuestionIndex = props.active ? props.flow.indexOf(props.active) : -1;
    if (questionIndex < activeQuestionIndex) {
      return "answered";
    }
    if (questionIndex > activeQuestionIndex) {
      return "not-answered";
    }
    return "active";
  };

  const getQuestionCn = (): string => {
    return cn("question", `question--${getQuestionState()}`);
  };

  const getQuestionComponent = (): ReactNode | null => {
    switch (props.question.type) {
      case "radio":
        return (
          <InputRadio
            disabled={getQuestionState() === "not-answered"}
            options={props.question.options || []}
            value={props.value}
            name={props.question.id}
            status="neutral"
            sizeRadio="m"
            sizeLabel="m"
            onChange={onChange}
          />
        );
      case "input":
        return (
          <InputText
            disabled={getQuestionState() === "not-answered"}
            label={props.question.inputLabel || ""}
            value={props.value}
            name={props.question.id}
            placeholder={props.question.placeholder}
            type={props.question.inputType}
            status="neutral"
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  const onChange = (value: string, type?: string): void => {
    if (props.question.type === "input" && getQuestionState() === "active") {
      props.onChange(props.question, value);
    }
    if (props.question.type === "radio" && type !== "click") {
      props.onChange(props.question, value);
    }
    if (props.question.type === "radio" && type === "click") {
      props.onNext(props.question, value);
    }
  };

  const onTitleClickInAnsweredState = (e: MouseEvent<HTMLDivElement>): void => {
    if (getQuestionState() === "answered") {
      e.preventDefault();
      props.onTitleClickInAnsweredState(props.question);
    }
  };

  const onContentClickInAnsweredState = (e: MouseEvent<HTMLDivElement>): void => {
    if (getQuestionState() === "answered" && props.question.type === "input") {
      e.preventDefault();
      props.onContentClickInAnsweredState(props.question);
    }
  };

  const removeFocusFromFocusableElement = (): void => {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
  };

  const onKeyPress = (e: KeyboardEvent): void => {
    if (e.code === "Enter" && props.active === props.question.id) {
      removeFocusFromFocusableElement();
      props.onEnterKeyDown(props.question, props.value);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [props.active, props.question, props.value]);

  return (
    <div className={getQuestionCn()}>
      {props.question.before ? <div className="question__before">{props.question.before}</div> : null}
      <p className="question__label" onClick={onTitleClickInAnsweredState}>
        {props.question.label}
      </p>
      {props.question.afterLabel ? <div className="question__after-label">{props.question.afterLabel}</div> : null}
      <div onClick={onContentClickInAnsweredState}>{getQuestionComponent()}</div>
      {props.question.after ? <div className="question__after">{props.question.after}</div> : null}
      <div className="question__next">
        <button type="button" tabIndex={0} onClick={() => props.onNext(props.question, props.value)}>
          Weiter
        </button>
        <span>
          oder <i>EINGABE</i> drücken
        </span>
      </div>
    </div>
  );
}

Question.displayName = "Question";

export default Question;
