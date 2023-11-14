import { useEffect } from "react";

const useGetConfigJson = (baseUrl: string, getConfigJson: () => void) => {
  useEffect(() => {
    if (!baseUrl) getConfigJson();
  }, []);
};

export default useGetConfigJson;
