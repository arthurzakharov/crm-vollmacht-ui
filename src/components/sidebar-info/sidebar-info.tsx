import React, { FC } from "react";
import { AnimateHeight } from "../animate-height";
import { CustomerInfo, CustomerInfoProps } from "../customer-info";
import "./sidebar-info.css";

export interface SidebarInfoProps {
  infoList: [string, string][];
  isCustomerInfoVisible?: boolean;
  customerInfo?: Omit<CustomerInfoProps, "version">;
}

export const SidebarInfo: FC<SidebarInfoProps> = (props) => {
  const { infoList, customerInfo, isCustomerInfoVisible } = props;

  return (
    <div className="sidebar-info">
      <div>
        {infoList.map(([key, value]) => (
          <p key={key} className="sidebar-info__text">
            <strong>{key}</strong>
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </p>
        ))}
      </div>
      {customerInfo ? (
        <AnimateHeight animateOpacity closed={!isCustomerInfoVisible}>
          <div className="sidebar-info__wrap">
            <CustomerInfo
              version="sidebar"
              list={customerInfo.list}
              isEditButtonVisible={customerInfo.isEditButtonVisible}
              onClick={customerInfo.onClick}
            />
          </div>
        </AnimateHeight>
      ) : null}
    </div>
  );
};
