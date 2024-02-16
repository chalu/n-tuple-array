type IterationResult<T> = {
    done: boolean;
    value: Array<T | undefined>;
};
type Matcher<T> = (item: T | undefined) => boolean;
export type TupleConfig<T> = {
    list: T[];
    maxItems?: number;
    match?: Matcher<T>;
};
export declare class InvalidInvocationParameterError extends Error {
}
export declare const tuplesFromArray: <T>(config: TupleConfig<T>) => {
    [Symbol.iterator](): any;
    next(): IterationResult<T>;
};
export {};
