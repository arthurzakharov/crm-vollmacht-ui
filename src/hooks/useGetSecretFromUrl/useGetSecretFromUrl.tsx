import type { Page, WhereSecret } from "../../types";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

const useGetSecretFromUrl = (page: Page, save: (secret: string) => void) => {
  const location = useLocation();
  const { secret } = useParams();

  const fromWhereGetSecret = (page: Page): WhereSecret => {
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
    return secret.length === 100;
  };

  const getSecret = (page: Page, search: string, secret: string = ""): string => {
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
