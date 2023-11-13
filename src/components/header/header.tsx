import React, { FC } from "react";
import phoneSrc from "../../assets/png/phone/phone.png";
import "./header.css";

interface Props {
  tel: string;
  logo: string;
}

const Header: FC<Props> = (props) => {
  const getTelForLink = (tel: string): string => {
    return "tel:+49" + tel.replace(/^0|[^0-9.]/g, "");
  };

  const onClick = (): void => {
    window.open(getTelForLink(props.tel), "_self");
  };

  return (
    <header className="header">
      <img alt="logo-icon" src={props.logo} className="header__logo" />
      <button tabIndex={0} className="header__link" onClick={onClick}>
        <img alt="phone-icon" src={phoneSrc} className="header__phone" />
        <span className="header__number">{props.tel}</span>
      </button>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
