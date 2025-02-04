export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "testTimeout":10000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @/ to src/
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    'node_modules/(?!(nanoid)/)', // Allow transformation of nanoid
  ],
};