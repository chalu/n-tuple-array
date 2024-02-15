export interface nTupleConfig<T> {
    list: T[];
    maxItems?: number;
    match?: (item: T | undefined) => boolean;
}
export declare class InvalidInvocationParameterError extends Error {
}
export declare const nTupleFromArray: <T>(config: nTupleConfig<T>) => {
    [Symbol.iterator](): void;
};
