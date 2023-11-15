import type { Page } from "../../types";
import { useEffect } from "react";

const usePostFirstView = (firstViewUrl: null | string, currentPage: null | Page, postUrl: (url: string) => void) => {
  const getPathname = (): string => {
    return window.location.pathname === "/" ? "" : window.location.pathname;
  };

  const getFirstViewUrl = (): string => {
    return window.location.origin + getPathname();
  };

  useEffect(() => {
    if (firstViewUrl || currentPage !== "home") {
      return;
    } else {
      postUrl(getFirstViewUrl());
    }
  }, [firstViewUrl]);
};

export default usePostFirstView;
