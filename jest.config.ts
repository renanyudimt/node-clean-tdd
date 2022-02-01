export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  // the directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // test env that will be used for testing
  testEnvironment: 'node',
  // a map for regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
