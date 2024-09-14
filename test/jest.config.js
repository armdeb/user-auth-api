// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'test',
    testRegex: '.*\.spec\.ts$',
    coverageDirectory: '../coverage',
    collectCoverageFrom: [
      '**/*.{js,ts}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/test/**',
    ],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
      },
    },
  };
  