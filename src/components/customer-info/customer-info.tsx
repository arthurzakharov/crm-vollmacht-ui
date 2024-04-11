import type { FC } from "react";
import React from "react";
import cn from "classnames";
import EditPen from "../../icons/edit-pen";
import "./customer-info.css";

interface Props {
  version: "form" | "sidebar";
  onClick: () => void;
  list: string[];
  isEditButtonHidden?: boolean;
}

const CustomerInfo: FC<Props> = (props) => {
  const customerInfoCn = (): string => {
    return cn("customer-info", {
      "customer-info--sidebar": props.version === "sidebar",
    });
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
      {props.list.map((listItem, index) => (
        <p key={index}>{listItem}</p>
      ))}
    </div>
  );
};

CustomerInfo.displayName = "CustomerInfo";

export default CustomerInfo;
