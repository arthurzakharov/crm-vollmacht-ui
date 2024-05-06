import { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const elementHandler = await page.$("#storybook-root");
    if (elementHandler) {
      const innerHTML = await elementHandler.innerHTML();
      // @ts-ignore
      expect(innerHTML).toMatchSnapshot();
    }
  },
};

export default config;
