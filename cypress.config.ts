import { defineConfig } from 'cypress';
require('dotenv').config();

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env
      };
      return config;
    },
    baseUrl: 'http://localhost:4000'
  }
});
