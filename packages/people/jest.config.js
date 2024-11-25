const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios|@rimac/shared)/)'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^@rimac/shared(.*)$': '<rootDir>/../shared/src/$1', // Sobrescribe si es necesario
  },
};
