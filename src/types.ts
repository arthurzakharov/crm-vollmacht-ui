export type Page = "home" | "remuneration" | "attachment" | "error";

export type WhereSecret = "query" | "path";

export type ApiStatus = "pending" | "fulfilled" | "rejected" | "idle";

export type FieldStatus = "success" | "error" | "neutral";

export type Option = {
  value: string;
  label: string;
};
