import type { ReactNode } from "react";

export type Page = "home" | "remuneration" | "attachment" | "error";

export type HomeStep = "personal" | "address" | "checkout" | "remuneration";

export type AttachmentStep = "insurance" | "files" | "survey";

export type WhereSecret = "query" | "path";

export type ApiStatus = "pending" | "fulfilled" | "rejected" | "idle";

export type FieldStatus = "success" | "error" | "neutral";

export type AllowedPath = "/" | "/attachment" | "/remuneration";

export type Section<S> = {
  title: string;
  section: S;
  element: null | ReactNode;
};

export interface Option<T extends string = string> {
  value: T;
  label: string;
}
