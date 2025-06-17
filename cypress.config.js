const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pbrochu94.github.io/cypress-todo-app/",
    experimentalStudio: true,
  },
});
