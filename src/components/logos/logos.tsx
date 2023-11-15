import React from "react";
import iconTuvSrc from "../../assets/jpeg/tuv/tuv.jpeg";
import iconTlsSrc from "../../assets/png/tls/tls.png";
import "./logos.css";

const Logos = () => (
  <div className="logos">
    <div className="logos__tls">
      <img alt="tls-icon" src={iconTlsSrc} className="logos__icon" />
      <span className="logos__text">Höchste</span>
      <span className="logos__text">Datensicherheit.</span>
    </div>
    <img alt="tuv-icon" src={iconTuvSrc} className="logos__tuv" />
  </div>
);

Logos.displayName = "Logos";

export default Logos;
