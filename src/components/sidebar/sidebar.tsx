import type { FC, PropsWithChildren } from "react";
import type { Page, HomeStep, AttachmentStep } from "../../types";
import React, { useEffect, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import { StatusIcon } from "../status-icon";
import SidebarInfo from "../sidebar-info";
import { Logos } from "../logos";
import "./sidebar.css";

type SidebarStep = {
  key: HomeStep | AttachmentStep;
  title: string;
};

type Props = {
  mapping: {
    [key in HomeStep | AttachmentStep]?: string;
  };
  currentPage: null | Page;
  formStep: null | HomeStep;
  homeSectionNames: HomeStep[];
  remunerationSectionNames?: HomeStep[];
  attachmentSectionNames: AttachmentStep[];
  charge: string;
  reference: string;
  chargeTitle: string;
  referenceTitle: string;
  onClick: () => void;
  isFormPersonalCorrect?: boolean;
  isFormAddressCorrect?: boolean;
  isCorrectInsurance?: boolean;
  isCorrectFiles?: boolean;
  isCorrectSurvey?: boolean;
  list: string[];
  isEditButtonHidden?: boolean;
  isTimetableHidden?: boolean;
};

const Sidebar = (props: PropsWithChildren<Props>) => {
  const [height, setHeight] = useState<Height>(0);

  const getHomeSteps = (): SidebarStep[] => {
    return props.homeSectionNames.map((name) => {
      switch (name) {
        case "personal":
          return { key: "personal", title: props.mapping.personal || "Angaben zur Person" };
        case "address":
          return { key: "address", title: props.mapping.address || "Kontaktdaten" };
        case "checkout":
          return { key: "checkout", title: props.mapping.checkout || "Vollmacht" };
        case "remuneration":
          return { key: "remuneration", title: props.mapping.remuneration || "Vergütungsvereinbarung" };
      }
    });
  };

  const getRemunerationSteps = (): SidebarStep[] => {
    return props.remunerationSectionNames
      ? props.remunerationSectionNames.map((name) => {
          switch (name) {
            case "personal":
              return { key: "personal", title: props.mapping.personal || "Angaben zur Person" };
            case "address":
              return { key: "address", title: props.mapping.address || "Kontaktdaten" };
            case "checkout":
              return { key: "checkout", title: props.mapping.checkout || "Vollmacht" };
            case "remuneration":
              return { key: "remuneration", title: props.mapping.remuneration || "Vergütungsvereinbarung" };
          }
        })
      : [];
  };

  // TODO: Names of sections should be passed with props

  const getAttachmentSteps = (): SidebarStep[] => {
    return props.attachmentSectionNames.map((name) => {
      switch (name) {
        case "insurance":
          return { key: "insurance", title: props.mapping.insurance || "Rechtsschutzversicherung" };
        case "files":
          return { key: "files", title: props.mapping.files || "Jobcenter Bescheid" };
        case "survey":
          return { key: "survey", title: props.mapping.survey || "Weitere Informationen" };
      }
    });
  };

  const getSteps = (): SidebarStep[] => {
    switch (props.currentPage) {
      case "home":
        return getHomeSteps();
      case "remuneration":
        return getRemunerationSteps();
      case "attachment":
        return getAttachmentSteps();
      default:
        return [];
    }
  };

  const getState = (formStep: HomeStep | AttachmentStep): boolean => {
    switch (formStep) {
      case "personal":
        return !!props.isFormPersonalCorrect;
      case "address":
        return !!props.isFormAddressCorrect;
      case "checkout":
        return false;
      case "remuneration":
        // TODO: update with remuneration validation icon-success
        return false;
      case "insurance":
        return !!props.isCorrectInsurance;
      case "files":
        return !!props.isCorrectFiles;
      case "survey":
        return !!props.isCorrectSurvey;
    }
  };

  useEffect(() => {
    setHeight(props.formStep === "checkout" ? "auto" : 0);
  }, [props.formStep]);

  return (
    <div className="sidebar">
      <h6 className="sidebar__title">Ihre Übersicht</h6>
      <div className="sidebar__steps">
        {getSteps().map((step, index) => (
          <div className="sidebar__step" key={step.key}>
            <p>
              {index + 1}. {step.title}
            </p>
            <StatusIcon idle={!getState(step.key)} status="success" size="s" />
          </div>
        ))}
      </div>
      <SidebarInfo
        formStep={props.formStep}
        currentPage={props.currentPage}
        charge={props.charge}
        reference={props.reference}
        chargeTitle={props.chargeTitle}
        referenceTitle={props.referenceTitle}
        onClick={props.onClick}
        list={props.list}
        isEditButtonHidden={props.isEditButtonHidden}
      />
      {props.currentPage !== "attachment" && (
        <AnimateHeight duration={250} delay={125} animateOpacity easing="cubic-bezier(0.4, 0, 0.2, 1)" height={height}>
          <div className="sidebar__button">{props.children}</div>
        </AnimateHeight>
      )}
      {props.currentPage === "attachment" && !props.isTimetableHidden ? (
        <div className="sidebar__timetable">
          <p className="sidebar__info">Sekreteriat Öffnungszeiten</p>
          <p>Mo – Do: 8:30 Uhr bis 17 Uhr</p>
          <p>Fr: 8:30 Uhr bis 16 Uhr</p>
        </div>
      ) : null}
      <div className="sidebar__logos">
        <Logos show={["tls"]} />
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
