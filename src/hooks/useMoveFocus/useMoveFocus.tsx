import { useRef, useEffect } from "react";

function useMoveFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const activeElementOnMount = document.activeElement as HTMLElement;
    ref.current && ref.current.focus();

    return () => {
      activeElementOnMount && activeElementOnMount.focus();
      activeElementOnMount && activeElementOnMount.blur();
    };
  }, []);

  return ref;
}

export default useMoveFocus
