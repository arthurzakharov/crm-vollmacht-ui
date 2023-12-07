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
  initialFlow: string[];
  actualFlow: string[];
  questions: { [key in string]: QuestionType };
  active?: string;
  answers?: { [key in string]: string };
  onReturnToPrevQuestion: (question: QuestionType) => void;
  answerQuestion: (question: QuestionType, value: string) => void;
  goToNextQuestion: (question: QuestionType, value: string) => void;
};

const Questionnaire = (props: Props) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getQuestionsBasedOnInitialFlow = (
    questions: { [key in string]: QuestionType },
    initialFlow: string[],
  ): QuestionType[] => {
    return initialFlow.map((id) => questions[id]);
  };

  const getQuestionsBasedOnFlow = (questions: { [key in string]: QuestionType }, flow: string[]): QuestionType[] => {
    return flow.map((id) => {
      return questions[id];
    });
  };

  useEffectOnce(() => {
    setQuestions(getQuestionsBasedOnInitialFlow(props.questions, props.initialFlow));
  });

  useUpdateEffect(() => {
    setQuestions(getQuestionsBasedOnFlow(props.questions, props.actualFlow));
  }, [props.actualFlow, props.questions]);

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
                flow={props.actualFlow}
                active={props.active}
                value={props.answers ? props.answers[question.id] : ""}
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

export default Questionnaire;
