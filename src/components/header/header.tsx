import React, { FC } from "react";
import cn from "classnames";
import phoneSrc from "@assets/png/phone/phone.png";
import CheckInCircle from "@icons/check-in-circle";
import "./header.css";

interface HeaderProps {
  logo: string;
  tel?: string;
  descriptions?: {
    size: "s" | "m";
    value: string;
  }[];
}

const Header: FC<HeaderProps> = (props) => {
  const { logo, tel = "", descriptions = [] } = props;

  const getTelForLink = (tel: string): string => {
    return "tel:+49" + tel.replace(/^0|[^0-9.]/g, "");
  };

  const getDescriptionCn = (modifier: string): string => {
    return cn("header__description", "header__description--" + modifier);
  };

  const onClick = (): void => {
    if (tel) {
      window.open(getTelForLink(tel), "_self");
    }
  };

  return (
    <header className="header">
      {logo ? <img alt="logo-icon" src={logo} className="header__logo" /> : <div className="header__logo" />}
      <div className="header__info">
        {tel && (
          <button tabIndex={0} className="header__link" onClick={onClick}>
            <img alt="phone-icon" src={phoneSrc} className="header__phone" />
            <span className="header__number">{tel}</span>
          </button>
        )}
        {descriptions.map((description, index) => (
          <div key={index} className={getDescriptionCn(description.size)}>
            <CheckInCircle />
            <span>{description.value}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
