import React, { PropsWithChildren, FC } from "react";
import AnimateHeightBlock from "react-animate-height";

export interface AnimateHeightProps {
  closed: boolean;
  animateOpacity?: boolean;
  duration?: number;
  delay?: number;
  easing?: string;
}

export const AnimateHeight: FC<PropsWithChildren<AnimateHeightProps>> = (props) => {
  const {
    closed,
    animateOpacity = false,
    duration = 200,
    delay = 100,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    children,
  } = props;

  return (
    <AnimateHeightBlock
      animateOpacity={animateOpacity}
      duration={duration}
      delay={delay}
      easing={easing}
      height={closed ? 0 : "auto"}
    >
      {children}
    </AnimateHeightBlock>
  );
};
