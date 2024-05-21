import { MouseEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { AllowedPath, Screen } from "../types";

export const addSecretAsFirstUrlParam = (search: string, secret: string): string => {
  if (!search && !secret) return "";
  const params = new URLSearchParams(search);
  params.has("secret") && secret !== "" ? params.set("secret", secret) : params.append("secret", secret);
  const rest = [""];
  params.forEach((v, k) => k !== "secret" && rest.push(`${k}=${v}`));
  return `?secret=${params.get("secret")}${rest.join("&")}`;
};

export const isValidUrl = (url: any): boolean => {
  try {
    return !!new URL(url);
  } catch (e) {
    return false;
  }
};

export const getOrigin = (url: any): string => {
  return isValidUrl(url) ? new URL(url).origin : "";
};

export const removeSecretFromUrlParams = (search: string): string => {
  const params = new URLSearchParams(search);
  params.delete("secret");
  return params.size ? `?${params.toString()}` : "";
};

export const allowedPathFromUrl = (path: string): AllowedPath => {
  if (path.includes("attachment")) return "/attachment";
  if (path.includes("remuneration")) return "/remuneration";
  return "/";
};

export const getPathname = (url: any): string => {
  return isValidUrl(url) ? new URL(url).pathname : "/";
};

export const urlFromWindow = (): string => {
  const pathname = window.location.pathname === "/" ? "" : window.location.pathname;
  return window.origin + pathname;
};

export const fakeAwait = async (time = 500): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const fileSize = (size: number): string => {
  const pow = Math.pow(10, 2);
  return !!Math.round(size / 1000000)
    ? `${Math.abs(Math.round((size / 1000000) * pow) / pow)}MB`
    : `${Math.abs(Math.round((size / 1000) * pow) / pow)}KB`;
};

export const bytesToMegabytes = (bytes: number): string => {
  const megabytes = bytes / (1024 * 1024);
  return parseFloat(megabytes.toFixed(1)) % 1 === 0 ? megabytes.toFixed(0) : megabytes.toFixed(1);
};

export function isFile(value: any): value is File {
  return value instanceof File;
}

export function createFormData<T extends { files: File[] }>(data: T): FormData {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (key === "files" && Array.isArray(value) && value.every((v) => isFile(v))) {
        const fileList = value as File[];
        for (let i = 0; i < fileList.length; i++) {
          formData.append(`files[${i}]`, fileList[i], fileList[i].name);
        }
      } else {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
}

export function indexOfFirstTrue(arr: boolean[], index: number, direction: "before" | "after"): number {
  if (index >= 0 && index < arr.length) {
    const step = direction === "before" ? -1 : 1;
    for (let i = index + step; direction === "before" ? i >= 0 : i < arr.length; i += step) {
      if (arr[i]) {
        return i;
      }
    }
  }
  return -1;
}

export const isProduction = (): boolean => {
  return document.location.pathname.includes("/vollmacht");
};

export const path = (path: string): string => {
  return isProduction() ? "/vollmacht" + path : path;
};

export const blurOnClick = (e: MouseEvent<HTMLButtonElement>, cb: () => void): void => {
  e.currentTarget.blur();
  cb();
};

export const removeSlashAtEnd = (url: string | null): string | null => {
  if (typeof url !== "string") return url;
  return url.replace(/\/$/, "");
};

export const pushToDataLayer = (dataLayerObject: { event: string }) => {
  if (dataLayerObject) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dataLayerObject);
  }
};

export const sortSearchParams = (searchParams: URLSearchParams): URLSearchParams => {
  const paramsArray = Array.from(searchParams.entries());
  paramsArray.sort(([keyA], [keyB]) => {
    if (keyA === "secret") return -1;
    if (keyB === "secret") return 1;
    if (keyA === "page") return -1;
    if (keyB === "page") return 1;
    return 0;
  });
  return new URLSearchParams(paramsArray);
};

export const updatePageUrlParameter = (value: Screen): void => {
  const url = new URL(location.href);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set("page", value);
  window.history.replaceState(
    {},
    "",
    `${url.origin}${url.pathname}?${sortSearchParams(searchParams).toString()}${url.hash}`,
  );
};

export const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const isValidDate = (date: string): boolean => {
  const [day, month, year] = date.split("/");
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y) || date.length !== 10) return false;
  if (m > 12 || d > 31) {
    return false;
  } else if (m === 2 && d > 28) {
    if (d === 29) {
      if (!isLeapYear(y)) {
        return false;
      }
    } else {
      return false;
    }
  } else if (d > 30 && (m === 4 || m === 6 || m === 9 || m === 11)) {
    return false;
  }
  return true;
};

export const convertToDateNumber = (num: string): string => {
  if (parseInt(num).toString().length !== num.length) return "";
  return num.length === 1 ? `0${num}` : num;
};

export const isValidBirthDate = (date: string): boolean => {
  const regExp = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g;
  if (regExp.test(date) && isValidDate(date)) {
    const [day, month, year] = date.split("/");
    const today = new Date();
    const entryAgeYear = String(today.getFullYear() - 18);
    const entryAgeMonth = convertToDateNumber(String(today.getMonth() + 1));
    const entryAgeDay = convertToDateNumber(`${today.getDate()}`);
    const birth = new Date(`${year}-${month}-${day}T00:00:00`);
    const entry = new Date(`${entryAgeYear}-${entryAgeMonth}-${entryAgeDay}T00:00:00`);
    return birth <= entry;
  }
  return false;
};

export const download = async (fileName: string, baseUrl: string) => {
  fetch(getPath("files", baseUrl) + fileName)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
    });
};

export const getPath = (path: string, baseUrl: string): string => {
  return baseUrl === "/" ? baseUrl + path + "/" : baseUrl + "/" + path + "/";
};

export const searchParams = (): URLSearchParams => {
  const { search } = new URL(location.href);
  return new URLSearchParams(search);
};

export const getActualScreenFromUrl = (isAttachment: boolean, isRemuneration: boolean): Screen => {
  if (isAttachment) return "attachment";
  if (isRemuneration) return "remuneration";
  return "home";
};

export const getActualSecretFromUrl = (isAttachment: boolean, isRemuneration: boolean): string => {
  if (isAttachment) {
    const match = location.pathname.match(/\/attachment\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  }
  if (isRemuneration) {
    const match = location.pathname.match(/\/remuneration\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  }
  return searchParams().get("secret") || "";
};

export const formatPriceAddEuro = (num: number): string => (parseFloat(String(num)) + " €").replace(".", ",");

export const formatNumber = (num: number): string => parseFloat(String(num)).toFixed().replace(".", ",");

export const convertDateFormat = (dateString: string): string => {
  const parts = dateString.split("/");
  return parts[2] + "-" + parts[1] + "-" + parts[0];
};

export const blurAfterClick = (e: MouseEvent<HTMLButtonElement>, cb: () => void): void => {
  e.currentTarget.blur();
  cb();
};

export const onScreenInParamsMode = (current: Screen | null, previous: Screen | null): void => {
  const screen = searchParams().get("page");
  if (current !== previous && current !== screen && current) updatePageUrlParameter(current);
};

export const onScreenInPagesMode = (
  current: Screen | null,
  baseUrl: string,
  screen: string,
  secret: string,
  navigate: NavigateFunction,
): void => {
  const { hash } = new URL(location.href);
  const search = searchParams();
  if (screen && current !== screen && current === "home") {
    search.append("secret", secret);
    navigate(`${baseUrl}?${sortSearchParams(search).toString()}${hash}`);
  }
  if (screen && current !== screen && current === "attachment") {
    search.delete("secret");
    navigate(`${baseUrl}attachment/${secret}?${sortSearchParams(search).toString()}${hash}`);
  }
  if (screen && current !== screen && current === "remuneration") {
    search.delete("secret");
    navigate(`${baseUrl}remuneration/${secret}?${sortSearchParams(search).toString()}${hash}`);
  }
};

export const getFirstViewUrl = (): string => {
  return location.origin + (location.pathname === "/" ? "" : removeSlashAtEnd(location.pathname));
};
