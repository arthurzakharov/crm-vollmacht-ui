import React, { FC, ReactNode, useEffect } from "react";
import { LayoutWithSidebar } from "../layout-with-sidebar";
import { HeaderProps } from "../header";
import { Main, MainProps } from "../main";
import { SidebarProps } from "../sidebar";
import { FooterProps } from "../footer";
import { StepForm, StepFormProps } from "../step-form";
import { StepCheckout, StepCheckoutProps } from "../step-checkout";

export type HomeStep = {
  step: string;
  type: "form" | "checkbox";
  form?: StepFormProps;
  checkbox?: StepCheckoutProps;
};

export interface HomeScreenProps {
  step: string;
  header: HeaderProps;
  main: MainProps;
  sidebar: SidebarProps;
  footer: FooterProps;
  steps: HomeStep[];
  onMount: (v: string) => void;
}

export const HomeScreen: FC<HomeScreenProps> = ({ step, header, main, sidebar, footer, steps, onMount }) => {
  useEffect(() => {
    onMount("personal-info");
  }, []);

  const getStep = (homeStep: HomeStep): ReactNode => {
    switch (homeStep.type) {
      case "form":
        return homeStep.form ? <StepForm {...homeStep.form} /> : null;
      case "checkbox":
        return homeStep.checkbox ? <StepCheckout {...homeStep.checkbox} /> : null;
    }
  };

  return (
    <LayoutWithSidebar header={header} sidebar={sidebar} footer={footer}>
      <Main {...main}>{steps.filter((homeStep) => homeStep.step === step).map((homeStep) => getStep(homeStep))}</Main>
    </LayoutWithSidebar>
  );
};
