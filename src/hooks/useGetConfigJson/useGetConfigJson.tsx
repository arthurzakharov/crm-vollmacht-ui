import { useEffect } from "react";

const useGetConfigJson = (baseUrl: string, getConfigJson: () => Promise<void>) => {
  useEffect(() => {
    (async () => {
      if (!baseUrl) await getConfigJson();
    })();
  }, []);
};

export default useGetConfigJson;
