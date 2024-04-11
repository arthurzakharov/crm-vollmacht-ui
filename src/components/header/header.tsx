import React, { FC } from "react";
import phoneSrc from "../../assets/png/phone/phone.png";
import "./header.css";
import CheckInCircle from "../../icons/check-in-circle";

interface Props {
  logo: string;
  tel?: string;
  workingHours?: string;
}

const Header: FC<Props> = (props) => {
  const getTelForLink = (tel: string): string => {
    return "tel:+49" + tel.replace(/^0|[^0-9.]/g, "");
  };

  const onClick = (): void => {
    if (props.tel) {
      window.open(getTelForLink(props.tel), "_self");
    }
  };

  return (
    <header className="header">
      {props.logo ? (
        <img alt="logo-icon" src={props.logo} className="header__logo" />
      ) : (
        <div className="header__logo" />
      )}
      <div className="header__info">
        {props.tel ? (
          <button tabIndex={0} className="header__link" onClick={onClick}>
            <img alt="phone-icon" src={phoneSrc} className="header__phone" />
            <span className="header__number">{props.tel}</span>
          </button>
        ) : null}
        {props.workingHours ? (
          <div className="header__hours">
            <CheckInCircle />
            <span>{props.workingHours}</span>
          </div>
        ) : null}
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
