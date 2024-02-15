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
});