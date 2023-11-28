import type { PropsWithChildren } from "react";
import React from "react";
import AnimateHeight from "react-animate-height";

interface Props {
  closed: boolean;
  animateOpacity?: boolean;
  duration?: number;
  delay?: number;
  easing?: string;
}

function AnimateHeightBlock(props: PropsWithChildren<Props>) {
  return (
    <AnimateHeight
      animateOpacity={props.animateOpacity === undefined ? true : props.animateOpacity}
      duration={props.duration === undefined ? 300 : props.duration}
      delay={props.delay === undefined ? 150 : props.delay}
      easing={props.easing === undefined ? "cubic-bezier(0.4, 0, 0.2, 1)" : props.easing}
      height={props.closed ? 0 : "auto"}
    >
      {props.children}
    </AnimateHeight>
  );
}

AnimateHeightBlock.displayName = "AnimateHeightBlock";

export default AnimateHeightBlock;
