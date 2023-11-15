import type { ApiStatus } from "../../types";
import type { Location } from "react-router-dom";
import { useEffect } from "react";
import { addSecretAsFirstUrlParam, getOrigin, removeSecretFromUrlParams } from "../../utils";

const useToFirstUrl = (
  secret: string,
  firstViewUrl: null | string,
  allowedPath: string,
  status: ApiStatus,
  location: Location,
) => {
  const { search, hash } = location;

  const shouldGoToFirstViewUrl = (): boolean =>
    !!(
      secret &&
      status === "fulfilled" &&
      allowedPath &&
      firstViewUrl !== null &&
      getOrigin(firstViewUrl) !== window.origin
    );

  const handleHomeCase = (): void => {
    const params = addSecretAsFirstUrlParam(search, secret);
    window.location.replace(`${firstViewUrl}${params}${hash}`);
  };

  const handleAttachmentCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    window.location.replace(`${firstViewUrl}/attachment/${secret}${params}${hash}`);
  };

  const handleRemunerationCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    window.location.replace(`${firstViewUrl}/remuneration/${secret}${params}${hash}`);
  };

  const goToFirstViewUrl = (): void => {
    if (status === "fulfilled" && allowedPath === "/") handleHomeCase();
    if (status === "fulfilled" && allowedPath === "/attachment") handleAttachmentCase();
    if (status === "fulfilled" && allowedPath === "/remuneration") handleRemunerationCase();
  };

  useEffect(() => {
    if (shouldGoToFirstViewUrl()) {
      goToFirstViewUrl();
    }
  }, [status]);
};

export default useToFirstUrl;
