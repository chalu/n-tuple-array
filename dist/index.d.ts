type Matcher<T> = (item: T | undefined) => boolean;
export interface nTupleConfig<T> {
    list: T[];
    maxItems?: number;
    match?: Matcher<T>;
}
export declare class InvalidInvocationParameterError extends Error {
}
export declare const nTupleFromArray: <T>(config: nTupleConfig<T>) => {
    [Symbol.iterator](): void;
};
export {};
