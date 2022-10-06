const { defineConfig } = require("cypress");

module.exports = defineConfig({
  failOnStatusCode: false,
  defaultCommandTimeout: 30000,
  e2e: {
    setupNodeEvents(on, config) {
      
    },
  },
});
