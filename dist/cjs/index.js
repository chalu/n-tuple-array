"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuplesFromArray = exports.InvalidInvocationParameterError = void 0;
/**
 * An exception than can be thrown if there is no input array, `maxItems` is <= 0 or is not
 * a number, or `match` is not a function
 */
class InvalidInvocationParameterError extends Error {
}
exports.InvalidInvocationParameterError = InvalidInvocationParameterError;
const validateParametersOrThrow = (list, maxItems, match) => {
    if (!list || !Array.isArray(list)) {
        throw new InvalidInvocationParameterError('expected list to be an array');
    }
    if (typeof maxItems !== 'number'
        || (typeof maxItems === 'number' && maxItems <= 0)) {
        const message = 'expected maxItems (when provided) to be a positive integer (1 and above)';
        throw new InvalidInvocationParameterError(message);
    }
    if (match !== undefined && typeof match !== 'function') {
        const message = 'expected match (when provided) to be a function';
        throw new InvalidInvocationParameterError(message);
    }
};
/**
 * Returns an iterable iterator that ouputs a configured
 * list of items when iterating over a given array
 *
 * @typeParam T - Type of items the input list contains
 *
 * @param config - An object to indicate the input array `config.list`, and set the
 * max size of items per interation `config.maxItems`. You can also optionally specify `config.match`
 * as a function that should return true to filter in items from the input array
 * (or false to filter them out) when deciding what items is to be included per iteration
 *
 * @function
 * @throws InvalidInvocationParameterError
 * This exception is thrown if there is no input array, `maxItems` is <= 0 or is not
 * a number, or `match` is not a function
 *
 * @returns an IterableIterator
 *
 * @example
 * Here is an example that will get max of 3 items from
 * each iteration on the returned iterable
 * ```javascript
 * 	const iterable = tuplesFromArray({
 * 	  list:[], maxSize: 3, match: (itm) => !!itm
 * 	});
 * ```
 */
const tuplesFromArray = (config) => {
    const { list, match, maxItems = 2 } = config;
    validateParametersOrThrow(list, maxItems, match);
    let cursor = 0;
    const maxItemSize = Number.parseInt(`${maxItems}`, 10);
    const proceedNext = () => {
        const items = [];
        if (cursor >= list.length) {
            return { done: true, value: [] };
        }
        const endIndex = match === undefined
            // A match funtion was provided. Okay to run to array end
            // or until we've matched maxItemSize elements
            ? Math.min(cursor + maxItemSize, list.length)
            // No match function was provided. We should run till we are
            // out of items (list.length) or till we gotten the next set
            // of maxItemSize items
            : list.length;
        while (cursor < endIndex) {
            const item = list[cursor];
            cursor += 1;
            if (match && !match(item)) {
                continue;
            }
            items.push(item);
            if (match && items.length === maxItemSize) {
                break;
            }
        }
        return { value: items, done: items.length === 0 };
    };
    const iterable = {
        next: proceedNext,
        [Symbol.iterator]() {
            return this;
        },
    };
    return iterable;
};
exports.tuplesFromArray = tuplesFromArray;
exports.default = exports.tuplesFromArray;
//# sourceMappingURL=index.js.map