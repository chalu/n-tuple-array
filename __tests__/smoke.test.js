const {tuplesFromArray, InvalidInvocationParameterError} = require('../dist/index.js');

describe('Smoke Tests', () => {
	it('should throw if input array is not specified', () => {
		function functionInClientCode() {
			tuplesFromArray({});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if input array is undefined', () => {
		function functionInClientCode() {
			tuplesFromArray({list: undefined});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if input array is not an array', () => {
		function functionInClientCode() {
			tuplesFromArray({list: 'some iterable object'});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if maxItems param not a number', () => {
		function functionInClientCode() {
			tuplesFromArray({list: [], maxItems: {}});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if maxItems param is 0', () => {
		function functionInClientCode() {
			tuplesFromArray({list: [], maxItems: 0});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if maxItems param is < 0', () => {
		function functionInClientCode() {
			tuplesFromArray({list: [], maxItems: -2});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});

	it('should throw if the match param not a function', () => {
		function functionInClientCode() {
			tuplesFromArray({list: [], match: {}});
		}

		expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
	});
});

