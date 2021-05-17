const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    globals: {
      'ts-jest': {
        compiler: 'ttypescript',
      },
    },
    setupFiles: ['jest-ts-auto-mock'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.spec.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper,
  };
