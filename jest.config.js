/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['game.js'],
  coverageReporters: ['text', 'lcov'],
  testTimeout: 10000,
  forceExit: true,
};
