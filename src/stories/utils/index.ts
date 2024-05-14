import { userEvent, fireEvent } from "@storybook/test";
import { fakeAwait } from "../../utils";

export class Delayed {
  private static _delay = 100;
  static async keyboard(text: string): Promise<void> {
    await fakeAwait(this._delay / 2);
    await userEvent.keyboard(text);
    await fakeAwait(this._delay / 2);
  }
  static async type(element: Element, text: string): Promise<void> {
    await fakeAwait(this._delay / 2);
    await userEvent.type(element, text);
    await fakeAwait(this._delay / 2);
  }
  static async tab(): Promise<void> {
    await fakeAwait(this._delay / 2);
    await userEvent.tab();
    await fakeAwait(this._delay / 2);
  }
  static async click(element: Element, options?: {}): Promise<void> {
    await fakeAwait(this._delay / 2);
    options ? await fireEvent.click(element, options) : await userEvent.click(element);
    await fakeAwait(this._delay / 2);
  }
}
