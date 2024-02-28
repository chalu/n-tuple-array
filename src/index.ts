type Result<T> = IteratorResult<Array<T | undefined>, Array<T | undefined>>;

export type Matcher<T> = (item: T | unknown) => boolean;
export type TupleConfig<T> = {
	list: T[];
	maxItems?: number;
	match?: Matcher<T>;
};

export class InvalidInvocationParameterError extends Error {}

const validateParametersOrThrow = <T>(list: T[], maxItems: number, match: Matcher<T> | undefined) => {
	if (!list || !Array.isArray(list)) {
		throw new InvalidInvocationParameterError('expected list to be an array');
	}

	if (
		typeof maxItems !== 'number'
        || (typeof maxItems === 'number' && maxItems <= 0)
	) {
		const message = 'expected maxItems (when provided) to be a positive integer (1 and above)';
		throw new InvalidInvocationParameterError(message);
	}

	if (match !== undefined && typeof match !== 'function') {
		const message = 'expected match (when provided) to be a function';
		throw new InvalidInvocationParameterError(message);
	}
};

export const tuplesFromArray = <T>(config: TupleConfig<T>) => {
	const {list, match, maxItems = 2} = config;
	validateParametersOrThrow(list, maxItems, match);

	let cursor = 0;
	const maxItemSize = Number.parseInt(`${maxItems}`, 10);

	const proceedNext = (): Result<T> => {
		const items: Array<T | undefined> = [];

		if (cursor >= list.length) {
			return {done: true, value: []};
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

		return {value: items, done: items.length === 0};
	};

	const iterable: IterableIterator<Array<T | undefined>> = {
		next: proceedNext,

		[Symbol.iterator](): IterableIterator<Array<T | undefined>> {
			return this;
		},
	};

	return iterable;
};

export default tuplesFromArray;
