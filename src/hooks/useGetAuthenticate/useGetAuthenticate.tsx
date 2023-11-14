import type { ApiStatus } from "../../types";
import { useEffect } from "react";

const useGetAuthenticate = (
  baseUrl: string,
  secret: string,
  authentication: ApiStatus,
  getAuthentication: () => void,
) => {
  const shouldSkip = (baseUrl: string, secret: string, authentication: ApiStatus): boolean => {
    return !baseUrl || !secret || authentication === "fulfilled";
  };

  useEffect(() => {
    if (shouldSkip(baseUrl, secret, authentication)) {
      return;
    } else {
      getAuthentication();
    }
  }, [baseUrl, secret]);
};

export default useGetAuthenticate;
