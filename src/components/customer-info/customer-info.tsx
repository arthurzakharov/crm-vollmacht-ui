import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import { EditPen } from "../../icons";
import "./customer-info.css";

export interface CustomerInfoProps {
  version: "form" | "sidebar";
  list: string[];
  isEditButtonVisible?: boolean;
  onClick: () => void;
}

export const CustomerInfo: FC<CustomerInfoProps> = (props) => {
  const { version, list, isEditButtonVisible = false, onClick } = props;

  const customerInfoCn = (): string => {
    return cn("customer-info", {
      "customer-info--sidebar": version === "sidebar",
    });
  };

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.blur();
    onClick();
  };

  return (
    <div className={customerInfoCn()}>
      <div className="customer-info__navigation">
        Ihre Angaben
        {isEditButtonVisible ? (
          <button type="button" tabIndex={0} className="customer-info__button" onClick={onClickHandler}>
            <span>ändern</span>
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
