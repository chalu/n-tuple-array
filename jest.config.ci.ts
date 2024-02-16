import type {JestConfigWithTsJest} from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: [
		'/**/*.test.*',
	],
	transformIgnorePatterns: [
		'/node_modules/',
		'\\.pnp\\.[^\\/]+$',
	],
	reporters: [
		'default',
		['jest-junit', {
			outputFile: '__tests__/summary.xml',
		}],
	],
	setupFilesAfterEnv: ['./__tests__/setup.ts'],
};

export default jestConfig;
