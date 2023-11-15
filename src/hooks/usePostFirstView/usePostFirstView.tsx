import type { Page, ApiStatus } from "../../types";
import { useEffect } from "react";

const usePostFirstView = (
  firstViewUrl: null | string,
  currentPage: null | Page,
  isAuthenticationResolved: ApiStatus,
  postUrl: (url: string) => void,
) => {
  const getPathname = (): string => {
    return window.location.pathname === "/" ? "" : window.location.pathname;
  };

  const getFirstViewUrl = (): string => {
    return window.location.origin + getPathname();
  };

  useEffect(() => {
    if (!firstViewUrl && isAuthenticationResolved === "fulfilled" && currentPage === "home") {
      postUrl(getFirstViewUrl());
    }
  }, [firstViewUrl, isAuthenticationResolved, currentPage]);
};

export default usePostFirstView;
