import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: false,
  },
});
