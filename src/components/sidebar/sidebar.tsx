import type { FC, PropsWithChildren } from "react";
import type { Page, HomeStep, AttachmentStep } from "../../types";
import React, { useEffect, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import StatusIcon from "../status-icon";
import SidebarInfo from "../sidebar-info";
import Logos from "../logos";
import "./sidebar.css";

type SidebarStep = {
  key: HomeStep | AttachmentStep;
  title: string;
};

interface Props extends PropsWithChildren {
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
  firstName?: string;
  lastName?: string;
  birthName?: string;
  birthDate?: string;
  birthCity?: string;
  street?: string;
  houseNumber?: string;
  postCode?: string;
  city?: string;
  isEditButtonHidden?: boolean;
}

const Sidebar: FC<Props> = (props) => {
  const [height, setHeight] = useState<Height>(0);

  const getHomeSteps = (): SidebarStep[] => {
    return props.homeSectionNames.map((name) => {
      switch (name) {
        case "personal":
          return { key: "personal", title: "Angaben zur Person" };
        case "address":
          return { key: "address", title: "Kontaktdaten" };
        case "checkout":
          return { key: "checkout", title: "Vollmacht" };
        case "remuneration":
          return { key: "remuneration", title: "Vergütungsvereinbarung" };
      }
    });
  };

  const getRemunerationSteps = (): SidebarStep[] => {
    return props.remunerationSectionNames
      ? props.remunerationSectionNames.map((name) => {
          switch (name) {
            case "personal":
              return { key: "personal", title: "Angaben zur Person" };
            case "address":
              return { key: "address", title: "Kontaktdaten" };
            case "checkout":
              return { key: "checkout", title: "Vollmacht" };
            case "remuneration":
              return { key: "remuneration", title: "Vergütungsvereinbarung" };
          }
        })
      : [];
  };

  const getAttachmentSteps = (): SidebarStep[] => {
    return props.attachmentSectionNames.map((name) => {
      switch (name) {
        case "insurance":
          return { key: "insurance", title: "Rechtsschutzversicherung" };
        case "files":
          return { key: "files", title: "Behördenschreiben" };
        case "survey":
          return { key: "survey", title: "Weitere Informationen" };
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
        firstName={props.firstName}
        lastName={props.lastName}
        birthName={props.birthName}
        birthDate={props.birthDate}
        birthCity={props.birthCity}
        street={props.street}
        houseNumber={props.houseNumber}
        postCode={props.postCode}
        city={props.city}
        isEditButtonHidden={props.isEditButtonHidden}
      />
      {props.currentPage !== "attachment" && (
        <AnimateHeight duration={250} delay={125} animateOpacity easing="cubic-bezier(0.4, 0, 0.2, 1)" height={height}>
          <div className="sidebar__button">{props.children}</div>
        </AnimateHeight>
      )}
      {props.currentPage === "attachment" ? (
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
