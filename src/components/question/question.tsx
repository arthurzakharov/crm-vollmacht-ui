import type { ReactNode, MouseEvent } from "react";
import type { QuestionType } from "../../types";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import InputRadio from "../input-radio";
import InputText from "../input-text";
import "./question.css";

type QuestionState = "answered" | "active" | "not-answered";

type Props = {
  order: string[];
  active?: string;
  value: string;
  onChange: (question: QuestionType, value: string) => void;
  onNext: (question: QuestionType, value: string) => void;
  onEnterKeyDown: (question: QuestionType, value: string) => void;
  onTitleClickInAnsweredState: (question: QuestionType) => void;
  onContentClickInAnsweredState: (question: QuestionType) => void;
  question: QuestionType;
};

const Question = (props: Props) => {
  const [state, setState] = useState<QuestionState>();

  const getQuestionCn = (): string => {
    return cn("question", `question--${state}`);
  };

  const getQuestionComponent = (): ReactNode | null => {
    switch (props.question.type) {
      case "radio":
        return (
          <InputRadio
            disabled={state === "not-answered"}
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
            disabled={state === "not-answered"}
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
    if (props.question.type === "input" && state === "active") {
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
    if (state === "answered") {
      e.preventDefault();
      props.onTitleClickInAnsweredState(props.question);
    }
  };

  const onContentClickInAnsweredState = (e: MouseEvent<HTMLDivElement>): void => {
    if (state === "answered" && props.question.type === "input") {
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

  useEffect(() => {
    const getQuestionState = (): QuestionState => {
      const questionIndex = props.order.indexOf(props.question.id);
      const activeQuestionIndex = props.active ? props.order.indexOf(props.active) : -1;
      if (questionIndex < activeQuestionIndex) {
        return "answered";
      }
      if (questionIndex > activeQuestionIndex) {
        return "not-answered";
      }
      return "active";
    };
    setState(getQuestionState());
  }, [props.order, props.question, props.active]);

  useEffect(() => {
    if (state === "active" && props.question.type === "input") {
      const inputElement = document.getElementById(props.question.id);
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        inputElement.focus();
      }
    }
  }, [state]);

  return (
    <div className={getQuestionCn()}>
      {props.question.before ? (
        <div className="question__before" dangerouslySetInnerHTML={{ __html: props.question.before }} />
      ) : null}
      <p className="question__label" onClick={onTitleClickInAnsweredState}>
        {props.question.label}
      </p>
      {props.question.afterLabel ? (
        <div className="question__after-label" dangerouslySetInnerHTML={{ __html: props.question.afterLabel }} />
      ) : null}
      <div onClick={onContentClickInAnsweredState}>{getQuestionComponent()}</div>
      {props.question.after ? (
        <div className="question__after" dangerouslySetInnerHTML={{ __html: props.question.after }} />
      ) : null}
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
};

Question.displayName = "Question";

export default Question;
