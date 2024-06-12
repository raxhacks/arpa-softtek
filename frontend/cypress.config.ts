import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
