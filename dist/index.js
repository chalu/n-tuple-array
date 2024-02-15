"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nTupleFromArray = exports.InvalidInvocationParameterError = void 0;
class InvalidInvocationParameterError extends Error {
}
exports.InvalidInvocationParameterError = InvalidInvocationParameterError;
;
const nTupleFromArray = (config) => {
    const { list, maxItems = 2, match = (_) => true } = config;
    if (!list || !Array.isArray(list)) {
        const msg = `expected list to be an array but got ${list}`;
        throw new InvalidInvocationParameterError(msg);
    }
    if (typeof maxItems !== 'number'
        || (typeof maxItems === 'number' && maxItems <= 0)) {
        const msg = `expected maxItems to be a positive integer (1 and above) but got ${maxItems}`;
        throw new InvalidInvocationParameterError(msg);
    }
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
