import React, { ReactNode, Fragment } from "react";
import { LayoutWithSidebar } from "../../layouts";
import { HeaderProps, Main, MainProps, SidebarProps, FooterProps } from "../../components";
import { StepForm, StepFormProps, StepCheckout, StepCheckoutProps } from "../../steps";

export type HomeStepType<T extends string> = {
  step: T;
  type: "form" | "checkbox";
  form?: StepFormProps;
  checkbox?: StepCheckoutProps;
};

export interface HomeScreenProps<T extends string> {
  step: T;
  header: HeaderProps;
  main: MainProps;
  sidebar: SidebarProps;
  footer: FooterProps;
  steps: HomeStepType<T>[];
}

export const HomeScreen = <T extends string>({ step, header, main, sidebar, footer, steps }: HomeScreenProps<T>) => {
  const getStep = (homeStep: HomeStepType<T>): ReactNode => {
    switch (homeStep.type) {
      case "form":
        return homeStep.form ? <StepForm {...homeStep.form} /> : null;
      case "checkbox":
        return homeStep.checkbox ? <StepCheckout {...homeStep.checkbox} /> : null;
    }
  };

  return (
    <LayoutWithSidebar header={header} sidebar={sidebar} footer={footer}>
      <Main {...main}>
        {steps
          .filter((homeStep) => homeStep.step === step)
          .map((homeStep) => (
            <Fragment key={homeStep.step}>{getStep(homeStep)}</Fragment>
          ))}
      </Main>
    </LayoutWithSidebar>
  );
};
