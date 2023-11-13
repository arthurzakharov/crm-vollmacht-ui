import React, { FC } from "react";
import "./footer.css";

export type FooterLink = {
  text: string;
  onClick: () => void;
};

interface Props {
  name: string;
  links: FooterLink[];
}

const Footer: FC<Props> = (props) => (
  <footer className="footer">
    <hr className="footer__line" />
    <div className="footer__content">
      <span>
        © {new Date().getFullYear()} {props.name}
      </span>
      <ul className="footer__links">
        {props.links.map((link: FooterLink) => (
          <li key={link.text} className="footer__link">
            <button type="button" tabIndex={0} onClick={link.onClick}>
              {link.text}
            </button>
            <div className="footer__separator" />
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;
