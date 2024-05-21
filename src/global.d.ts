export {};

declare global {
  interface Window {
    dataLayer: {
      event: string;
    }[];
  }
}
