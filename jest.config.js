module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],  // Explicit file patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude specific directories
};
