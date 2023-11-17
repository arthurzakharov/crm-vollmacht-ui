import type { MouseEvent } from "react";
import type { Section } from "../../types";
import React from "react";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import arrowBlueSrc from "../../assets/png/arrow-blue/arrow-blue.png";
import "./sections.css";

interface Props<S, N> {
  activeSection: null | N;
  onTitleClick: (name: N) => void;
  list: Section<S>[];
}

const Sections = <N extends string, S extends { name: N }>(props: Props<S, N>) => {
  const titleCn = (name: N): string => {
    return cn("sections__title", {
      "sections__title--opened": name === props.activeSection,
      "sections__title--closed": name !== props.activeSection,
    });
  };

  const onTitleClick = (e: MouseEvent<HTMLButtonElement>, name: N): void => {
    const button = e.currentTarget as HTMLButtonElement;
    button.blur();
    props.onTitleClick(name);
  };

  return (
    <ul className="sections">
      {props.list.map((item: Section<S>, i: number) => (
        <li key={item.section.name} className="sections__item">
          <div className="sections__number">{i + 1}</div>
          <button
            type="button"
            tabIndex={0}
            className={titleCn(item.section.name)}
            onClick={(e) => onTitleClick(e, item.section.name)}
          >
            <span className="sections__text">{item.title}</span>
            <img alt="arrow" src={arrowBlueSrc} className="sections__arrow" />
          </button>
          <div className="sections__content">
            <hr className="sections__line" />
            <AnimateHeight
              duration={300}
              delay={150}
              animateOpacity
              easing="cubic-bezier(0.4, 0, 0.2, 1)"
              height={item.section.name === props.activeSection ? "auto" : 0}
            >
              {item.element}
            </AnimateHeight>
          </div>
        </li>
      ))}
    </ul>
  );
};

Sections.displayName = "Sections";

export default Sections;
