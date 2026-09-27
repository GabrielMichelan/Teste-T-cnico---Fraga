const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    specPattern: ['api/**/*.cy.ts', 'e2e/**/*.cy.ts'],
    supportFile: 'support/e2e.ts',
  },
})