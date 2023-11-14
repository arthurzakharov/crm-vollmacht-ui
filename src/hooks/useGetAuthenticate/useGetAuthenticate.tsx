import { useEffect } from "react";

const useGetAuthenticate = (
  baseUrl: string,
  secret: string,
  authentication: object | null,
  getAuthentication: () => void,
) => {
  const shouldSkip = (baseUrl: string, secret: string, authentication: null | object): boolean => {
    return !baseUrl || !secret || !!authentication;
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
