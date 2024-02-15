"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nTupleFromArray = exports.InvalidInvocationParameterError = void 0;
function isPositiveInteger(n) {
    if (typeof n === 'number' && n <= 0) {
        throw Error(`expected a positive integer (1 and above) but got ${n}`);
    }
}
class InvalidInvocationParameterError extends Error {
}
exports.InvalidInvocationParameterError = InvalidInvocationParameterError;
;
const nTupleFromArray = (config) => {
    const { list, maxItems = 2, match = (_) => true } = config;
    if (!list || !Array.isArray(list)) {
        throw new InvalidInvocationParameterError(`expected list to be an array but got ${typeof list}`);
    }
    isPositiveInteger(maxItems);
    let cursor = 0;
    const iterable = {
        [Symbol.iterator]() {
            function next() {
                if (cursor >= list.length)
                    return { done: true, value: [] };
                const items = [];
                const endIndex = cursor + maxItems;
                while (cursor < endIndex) {
                    const item = list[cursor];
                    cursor += 1;
                    if (!match(item))
                        continue;
                    items.push(item);
                }
                return { done: false, value: items };
            }
        }
    };
    return iterable;
};
exports.nTupleFromArray = nTupleFromArray;
