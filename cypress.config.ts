import { defineConfig } from "cypress";
import { loadEnvConfig } from '@next/env';

const { combinedEnv } = loadEnvConfig(process.cwd());

export default defineConfig({
  env: combinedEnv,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
