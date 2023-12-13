import type { QuestionType } from "../../types";
import React, { useState } from "react";
import { useEffectOnce, useUpdateEffect } from "usehooks-ts";
import AnimateHeightBlock from "../animate-height-block";
import Question from "../question";
import QuestionnaireTitle from "../questionnaire-title";
import "./questionnaire.css";

type Props = {
  questionnaireIsClosed: boolean;
  completionState: "not-complete-at-all" | "not-fully-complete" | "fully-complete";
  titleIsHidden?: boolean;
  titleIsInactive: boolean;
  titleOnClick: (id: string) => void;
  sectionId: string;
  sectionTitle: string;
  initialOrder: string[];
  actualOrder: string[];
  questions: { [key in string]: QuestionType };
  active?: string;
  answers?: { [key in string]: undefined | string };
  onReturnToPrevQuestion: (question: QuestionType) => void;
  answerQuestion: (question: QuestionType, value: string) => void;
  goToNextQuestion: (question: QuestionType, value: string) => void;
};

const Questionnaire = (props: Props) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getQuestionsBasedOnInitialOrder = (
    questions: { [key in string]: QuestionType },
    initialOrder: string[],
  ): QuestionType[] => {
    return initialOrder.map((id) => questions[id]);
  };

  const getQuestionsBasedOnOrder = (questions: { [key in string]: QuestionType }, order: string[]): QuestionType[] => {
    return order.map((id) => {
      return questions[id];
    });
  };

  useEffectOnce(() => {
    setQuestions(getQuestionsBasedOnInitialOrder(props.questions, props.initialOrder));
  });

  useUpdateEffect(() => {
    setQuestions(getQuestionsBasedOnOrder(props.questions, props.actualOrder));
  }, [props.actualOrder, props.questions]);

  return (
    <div className="questionnaire">
      <QuestionnaireTitle
        isHidden={props.titleIsHidden}
        isInactive={props.titleIsInactive}
        isNotCompleteAtAll={props.completionState === "not-complete-at-all"}
        isNotFullyComplete={props.completionState === "not-fully-complete"}
        isFullyComplete={props.completionState === "fully-complete"}
        sectionTitle={props.sectionTitle}
        sectionId={props.sectionId}
        onClick={props.titleOnClick}
      />
      <AnimateHeightBlock closed={props.questionnaireIsClosed}>
        <div>
          {questions.map((question: QuestionType) => {
            return (
              <Question
                key={question.id}
                order={props.actualOrder}
                active={props.active}
                value={props.answers ? props.answers[question.id] || "" : ""}
                onChange={(question, value) => props.answerQuestion(question, value)}
                onNext={(question, value) => props.goToNextQuestion(question, value)}
                onEnterKeyDown={(question, value) => props.goToNextQuestion(question, value)}
                onTitleClickInAnsweredState={(question) => props.onReturnToPrevQuestion(question)}
                onContentClickInAnsweredState={(question) => props.onReturnToPrevQuestion(question)}
                question={question}
              />
            );
          })}
        </div>
      </AnimateHeightBlock>
    </div>
  );
};

Questionnaire.displayName = "Questionnaire";

export default Questionnaire;
