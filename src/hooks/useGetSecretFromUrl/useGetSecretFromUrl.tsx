import { Screen, WhereSecret } from "../../types";
import { Location, Params } from "react-router-dom";
import { useEffect } from "react";

const useGetSecretFromUrl = (
  page: Screen,
  location: Location,
  params: Params,
  secretLength: number,
  save: (secret: string) => void,
) => {
  const secret = params.secret || "";

  const fromWhereGetSecret = (page: Screen): WhereSecret => {
    switch (page) {
      case "home":
        return "query";
      case "attachment":
      case "remuneration":
        return "path";
      default:
        return "query";
    }
  };

  const secretFromUrlParam = (search: string): string => {
    return new URLSearchParams(search).get("secret") || "";
  };

  const isSecret = (secret: string): boolean => {
    return secret.length === secretLength;
  };

  const getSecret = (page: Screen, search: string, secret: string): string => {
    switch (fromWhereGetSecret(page)) {
      case "query":
        const querySecret = secretFromUrlParam(search);
        return isSecret(querySecret) ? querySecret : "";
      case "path":
        return isSecret(secret) ? secret : "";
    }
  };

  useEffect(() => {
    const apiSecret = getSecret(page, location.search, secret);
    if (apiSecret) {
      save(apiSecret);
    } else {
      throw new Error("Not able to get secret");
    }
  }, []);
};

export default useGetSecretFromUrl;
