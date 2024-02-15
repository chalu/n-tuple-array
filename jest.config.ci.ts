import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
  reporters: [
    "default",
    ["jest-tap-reporter", {
      "filePath": "__tests__/summary.tap"
    }]
  ]
}

export default jestConfig;