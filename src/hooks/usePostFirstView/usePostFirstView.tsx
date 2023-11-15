import type { Page } from "../../types";
import { useEffect } from "react";

const usePostFirstView = (
  firstViewUrl: null | string,
  currentPage: null | Page,
  baseUrl: string,
  postUrl: (url: string) => void,
) => {
  const getPathname = (): string => {
    return window.location.pathname === "/" ? "" : window.location.pathname;
  };

  const getFirstViewUrl = (): string => {
    return window.location.origin + getPathname();
  };

  useEffect(() => {
    console.table([
      ["firstViewUrl", firstViewUrl, !!firstViewUrl],
      ["currentPage", currentPage, currentPage !== "home"],
      ["baseUrl", baseUrl, !baseUrl],
      ["result", !!firstViewUrl || currentPage !== "home" || !baseUrl, ""],
    ]);
    if (!!firstViewUrl || currentPage !== "home" || !baseUrl) {
      console.log("exit");
      return;
    } else {
      console.log("download");
      postUrl(getFirstViewUrl());
    }
  }, [firstViewUrl, baseUrl, currentPage]);
};

export default usePostFirstView;
