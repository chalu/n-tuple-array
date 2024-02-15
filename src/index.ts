interface IterationResult<T> {
    done: boolean;
    value: Array<T | undefined | null>;
}

type Matcher<T> = (item: T | undefined) => boolean;
export interface nTupleConfig<T> {
    list: T[];
    maxItems?: number;
    match?: Matcher<T>;
}

export class InvalidInvocationParameterError extends Error {};

const validateParamsOrThrow = <T>(list: T[], maxItems: number, match: Matcher<T>) => {
    if (!list || !Array.isArray(list)) {
        const msg = `expected list to be an array but got ${list}`;
        throw new InvalidInvocationParameterError(msg);
    }

    if (
        typeof maxItems !== 'number'
        || (typeof maxItems === 'number' && maxItems <= 0)
    ) {
        const msg = `expected maxItems to be a positive integer (1 and above) but got ${maxItems}`;
        throw new InvalidInvocationParameterError(msg);
    }

    if (typeof match !== 'function') {
        const msg = `expected match to be a function but got ${match}`;
        throw new InvalidInvocationParameterError(msg);
    }
}

export const nTupleFromArray = <T>(config: nTupleConfig<T>) => {
    const { list, maxItems = 2, match = (_) => true } = config;
    validateParamsOrThrow(list, maxItems, match);

    let cursor = 0;
    const iterable = {
        [Symbol.iterator]() {
            function next(): IterationResult<T> {
                if (cursor >= list.length) return { done: true, value: [] };

                const items: Array<T | undefined | null> = [];
                const endIndex = cursor + maxItems;
                while (cursor < endIndex) {
                    const item = list[cursor];
                    cursor += 1;

                    if (!match(item)) continue;

                    items.push(item);
                }

                return { done: false, value: items };
            }
        }
    };

    return iterable;
};
