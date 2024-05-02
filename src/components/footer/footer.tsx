import type { FC } from "react";
import React from "react";
import "./footer.css";

interface Props {
  name: string;
  links: {
    text: string;
    onClick: () => void;
  }[];
}

const Footer: FC<Props> = (props) => (
  <footer className="footer">
    <hr className="footer__line" />
    <div className="footer__content">
      <span>
        © {new Date().getFullYear()} {props.name}
      </span>
      <ul className="footer__links">
        {props.links.map(({ text, onClick }) => (
          <li key={text} className="footer__link">
            <button type="button" tabIndex={0} onClick={onClick}>
              {text}
            </button>
            <div className="footer__separator" />
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
