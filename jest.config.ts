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
	setupFilesAfterEnv: ['./__tests__/setup.ts'],
};

export default jestConfig;
