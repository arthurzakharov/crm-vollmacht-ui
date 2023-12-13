import type { AllowedPath } from "../types";

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
  return isValidUrl(url) ? new URL(url).pathname : "";
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
