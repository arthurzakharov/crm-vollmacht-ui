import type { FC } from "react";
import type { Height } from "react-animate-height";
import type { HomeStep, Page } from "../../types";
import React from "react";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import CustomerInfo from "../customer-info";
import "./sidebar-info.css";

interface Props {
  formStep: null | HomeStep;
  currentPage: null | Page;
  charge: string;
  reference: string;
  onClick: () => void;
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

const SidebarInfo: FC<Props> = (props) => {
  const [height, setHeight] = useState<Height>(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    setHeight(isOpened ? "auto" : 0);
  }, [isOpened]);

  useEffect(() => {
    setIsOpened(props.formStep === "checkout" || props.formStep === "remuneration");
  }, [props.formStep]);

  return (
    <div className="sidebar-info">
      <div>
        <p className="sidebar-info__text">
          <strong>Tatvorwurf: </strong>
          {props.charge}
        </p>
        <p className="sidebar-info__text">
          <strong>Mandat Nr: </strong>
          {props.reference}
        </p>
      </div>
      {props.currentPage !== "attachment" && (
        <AnimateHeight duration={250} delay={125} animateOpacity easing="cubic-bezier(0.4, 0, 0.2, 1)" height={height}>
          <div className="sidebar-info__wrap">
            <CustomerInfo
              version="sidebar"
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
          </div>
        </AnimateHeight>
      )}
    </div>
  );
};

SidebarInfo.displayName = "SidebarInfo";

export default SidebarInfo;
