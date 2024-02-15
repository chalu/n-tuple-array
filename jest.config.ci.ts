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
    ["jest-junit", {
      "outputFile": "__tests__/summary.xml"
    }]
  ]
}

export default jestConfig;