export type Matcher<T> = (item: T | unknown) => boolean;
export type TupleConfig<T> = {
    /**
     * The input array to use
     */
    list: T[];
    /**
     * The max number of items to return from the input array, per iteration
     * @defaultValue 2
     */
    maxItems?: number;
    /**
     * When provided, a function used to determine which items in the input array
     * are eligible to be included, per iteration
     */
    match?: Matcher<T>;
};
/**
 * An exception than can be thrown if there is no input array, `maxItems` is <= 0 or is not
 * a number, or `match` is not a function
 */
export declare class InvalidInvocationParameterError extends Error {
}
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
export declare const tuplesFromArray: <T>(config: TupleConfig<T>) => IterableIterator<(T | undefined)[]>;
export default tuplesFromArray;
//# sourceMappingURL=index.d.ts.map