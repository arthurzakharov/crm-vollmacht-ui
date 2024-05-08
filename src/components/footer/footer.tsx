import React, { FC, MouseEvent } from "react";
import "./footer.css";

interface FooterProps {
  name: string;
  links?: {
    text: string;
    onClick: () => void;
  }[];
}

const Footer: FC<FooterProps> = (props) => {
  const { name, links = [] } = props;

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>, cb: () => void): void => {
    e.currentTarget.blur();
    cb();
  };

  return (
    <footer className="footer">
      <hr className="footer__line" />
      <div className="footer__content">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <ul className="footer__links">
          {links.map(({ text, onClick }) => (
            <li key={text} className="footer__link">
              <button type="button" tabIndex={0} onClick={(e) => onClickHandler(e, onClick)}>
                {text}
              </button>
              <div className="footer__separator" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
