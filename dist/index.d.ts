type Item<T> = T | undefined;
type Value<T> = Array<Item<T>>;
export type Matcher<T> = (item: T | unknown) => boolean;
export type TupleConfig<T> = {
    list: T[];
    maxItems?: number;
    match?: Matcher<T>;
};
export declare class InvalidInvocationParameterError extends Error {
}
export declare const tuplesFromArray: <T>(config: TupleConfig<T>) => Iterable<Value<T>>;
export default tuplesFromArray;
