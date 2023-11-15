import type { ApiStatus } from "../../types";
import type { Location, NavigateFunction } from "react-router-dom";
import { useEffect } from "react";
import {
  addSecretAsFirstUrlParam,
  allowedPathFromUrl,
  getPathname,
  urlFromWindow,
  removeSecretFromUrlParams,
} from "../../utils";

const useToAllowedPath = (
  secret: string,
  firstViewUrl: null | string,
  allowedPath: string,
  status: ApiStatus,
  location: Location,
  navigate: NavigateFunction,
) => {
  const { search, hash } = location;

  const shouldGoToAllowedPath = (): boolean => {
    const currentPath = allowedPathFromUrl(window.location.pathname);
    const currentUrl = urlFromWindow();
    return (
      (secret && status === "fulfilled" && allowedPath !== currentPath) ||
      (currentUrl !== firstViewUrl && firstViewUrl !== null)
    );
  };

  const handleHomeCase = (): void => {
    const params = addSecretAsFirstUrlParam(search, secret);
    navigate(`${getPathname(firstViewUrl)}${params}${hash}`);
  };

  const handleAttachmentCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    if (status === "fulfilled") navigate(`${allowedPath}/${secret}${params}${hash}`);
  };

  const handleRemunerationCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    if (status === "fulfilled") navigate(`${allowedPath}/${secret}${params}${hash}`);
  };

  const goToAllowedPath = () => {
    if (status === "fulfilled" && allowedPath === "/attachment") handleAttachmentCase();
    if (status === "fulfilled" && allowedPath === "/remuneration") handleRemunerationCase();
    if (status === "fulfilled" && allowedPath === "/") handleHomeCase();
  };

  useEffect(() => {
    if (shouldGoToAllowedPath()) {
      goToAllowedPath();
    }
  }, [status]);
};

export default useToAllowedPath;
