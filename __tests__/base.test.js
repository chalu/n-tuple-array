const { nTupleFromArray, InvalidInvocationParameterError } = require('../dist/index');


describe('Smoke Tests', () => {
    it('should throw if input array is not specified', () => {
        function functionInClientCode() {
            nTupleFromArray({});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if input array is undefined', () => {
        function functionInClientCode() {
            nTupleFromArray({list: undefined});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if input array is not an array', () => {
        function functionInClientCode() {
            nTupleFromArray({list: 'some iterable object'});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if maxItems param not a number', () => {
        function functionInClientCode() {
            nTupleFromArray({list: [], maxItems: {}});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if maxItems param is 0', () => {
        function functionInClientCode() {
            nTupleFromArray({list: [], maxItems: 0});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if maxItems param is < 0', () => {
        function functionInClientCode() {
            nTupleFromArray({list: [], maxItems: -2});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });

    it('should throw if the match param not a function', () => {
        function functionInClientCode() {
            nTupleFromArray({list: [], match: {}});
        }
        expect(functionInClientCode).toThrow(InvalidInvocationParameterError);
    });
});