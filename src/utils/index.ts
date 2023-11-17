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
