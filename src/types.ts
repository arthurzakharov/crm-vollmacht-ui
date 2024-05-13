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

export interface Option<T extends string> {
  value: T;
  label: string;
}

export interface QuestionType<ALL_ID = string, ID = ALL_ID> {
  id: ID;
  type: "radio" | "input";
  label: string;
  placeholder?: string;
  inputLabel?: string;
  inputType?: HTMLInputTypeAttribute;
  options?: {
    label: string;
    value: string;
    order?: QuestionOrderType<ALL_ID>[];
  }[];
  order?: QuestionOrderType<ALL_ID>[];
  before?: string;
  after?: string;
  afterLabel?: string;
}

export interface QuestionOrderType<ALL_ID = string> {
  condition: string;
  newOrder: ALL_ID[];
}
