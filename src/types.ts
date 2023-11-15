export type Page = "home" | "remuneration" | "attachment" | "error";

export type HomeStep = "personal" | "address" | "checkout" | "remuneration";

export type AttachmentStep = "insurance" | "files" | "survey";

export type WhereSecret = "query" | "path";

export type ApiStatus = "pending" | "fulfilled" | "rejected" | "idle";

export type FieldStatus = "success" | "error" | "neutral";

export type AllowedPath = "/" | "/attachment" | "/remuneration";

export type Option = {
  value: string;
  label: string;
};
