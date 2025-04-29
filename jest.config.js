module.exports = {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": ["<rootDir>/src/setup-jest.ts"],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  "collectCoverage": true,
  "coverageDirectory": "<rootDir>/coverage",
  "coverageReporters": ["html", "text-summary", "lcov"],
  "moduleNameMapper": {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@environments/(.*)": "<rootDir>/src/environments/$1"
  },
  "testEnvironment": "jsdom"
}
