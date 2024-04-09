module.exports = {
    testEnvironment: 'jsdom',
    transform: {},
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };
  