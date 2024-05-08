import React, { FC } from "react";
import cn from "classnames";
import EditPen from "../../icons/edit-pen";
import "./customer-info.css";

export interface CustomerInfoProps {
  version: "form" | "sidebar";
  list: string[];
  isEditButtonHidden: boolean;
  onClick: () => void;
}

export const CustomerInfo: FC<CustomerInfoProps> = (props) => {
  const { version, list, isEditButtonHidden, onClick } = props;

  const customerInfoCn = (): string => {
    return cn("customer-info", {
      "customer-info--sidebar": version === "sidebar",
    });
  };

  return (
    <div className={customerInfoCn()}>
      <div className="customer-info__navigation">
        Ihre Angaben
        {!isEditButtonHidden ? (
          <button type="button" tabIndex={0} className="customer-info__button" onClick={() => onClick()}>
            <span className="customer-info__text">ändern</span>
            <EditPen />
          </button>
        ) : null}
      </div>
      {list.map((listItem, index) => (
        <p key={index}>{listItem}</p>
      ))}
    </div>
  );
};
