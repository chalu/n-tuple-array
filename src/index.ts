type PositiveInteger = number & { __brand: 'PositiveInteger' };

function isPositiveInteger(n: number): asserts n is PositiveInteger {
    if (typeof n === 'number' && n <= 0) {
        throw Error(`expected a positive integer (1 and above) but got ${n}`);
    }
}

interface IterationResult<T> {
    done: boolean;
    value: Array<T | undefined | null>;
}

export interface nTupleConfig<T> {
    list: T[];
    maxItems?: number;
    match?: (item: T | undefined) => boolean;
}

export const nTupleFromArray = <T>(config: nTupleConfig<T>) => {
    const { list, maxItems = 2, match = (_) => true } = config;
    isPositiveInteger(maxItems);

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
