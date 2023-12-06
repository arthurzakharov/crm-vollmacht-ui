import type { ReactNode, HTMLInputTypeAttribute } from "react";

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

export interface QuestionType {
  id: string;
  type: "radio" | "input";
  label: string;
  placeholder?: string;
  inputLabel?: string;
  inputType?: HTMLInputTypeAttribute;
  options?: {
    label: string;
    value: string;
    flow?: string[];
  }[];
  before?: string;
  after?: string;
  afterLabel?: string;
}
