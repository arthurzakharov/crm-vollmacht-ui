import type { FC } from "react";
import React from "react";
import cn from "classnames";
import EditPen from "../../icons/edit-pen";
import "./customer-info.css";

interface Props {
  version: "form" | "sidebar";
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

const CustomerInfo: FC<Props> = (props) => {
  const customerInfoCn = (): string => {
    return cn("customer-info", {
      "customer-info--sidebar": props.version === "sidebar",
    });
  };

  const getFirstLine = (): string => {
    if (!!props.firstName || !!props.lastName || !!props.birthName) {
      return `${props.firstName || ""} ${props.lastName || ""} ${props.birthName || ""}`;
    }
    return "";
  };

  const getSecondLine = (): string => {
    if (!!props.birthDate || !!props.birthCity) {
      return `Geb in ${props.birthDate || ""} ${props.birthCity || ""}`;
    }
    return "";
  };

  const getThirdLine = (): string => {
    if (!!props.street || !!props.houseNumber || !!props.postCode || !!props.city) {
      return `${props.street || ""} ${props.houseNumber || ""}, ${props.postCode || ""} ${props.city || ""}`;
    }
    return "";
  };

  return (
    <div className={customerInfoCn()}>
      <div className="customer-info__navigation">
        Ihre Angaben
        {!props.isEditButtonHidden ? (
          <button type="button" tabIndex={0} className="customer-info__button" onClick={() => props.onClick()}>
            <span className="customer-info__text">ändern</span>
            <EditPen className="customer-info__icon" />
          </button>
        ) : null}
      </div>
      {!!getFirstLine() ? <p>{getFirstLine()}</p> : null}
      {!!getSecondLine() ? <p>{getSecondLine()}</p> : null}
      {!!getThirdLine() ? <p>{getThirdLine()}</p> : null}
    </div>
  );
};

CustomerInfo.displayName = "CustomerInfo";

export default CustomerInfo;
