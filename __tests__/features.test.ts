import * as _ from 'jest-extended';
import {tuplesFromArray} from '../src/index';
import {
	uuids, dates, hexadecimals, numbers, isEven, isDate,
} from './data';

type ParameterDataset<D> = {data: D[]; size: number; type?: string};

describe('nTuple Array', () => {
	it('should use default maxItems value', () => {
		const tuples = tuplesFromArray({list: numbers()});
		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(2);
		}
	});

	it('should use provided maxItems value', () => {
		const tuples = tuplesFromArray({list: numbers(), maxItems: 5});
		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(5);
		}
	});

	it('should work without a match function', () => {
		const tuples = tuplesFromArray({list: uuids(), maxItems: 10});
		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(10);
		}
	});

	it('should use match function when provided', () => {
		const nums = Array.from({length: 100}, (_, i: number) => i + 1);
		const tuples = tuplesFromArray({list: nums, maxItems: 5, match: isEven});
		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(5);
			expect(tuple).toSatisfyAll(isEven);
		}
	});

	it.each<ParameterDataset<string>>([
		{data: uuids({howMany: 50}), size: 2},
		{data: uuids({howMany: 55}), size: 5},
		{data: uuids({howMany: 200}), size: 10},
	])('should produce correct quantities when sub-arrays have $size items', ({data, size}) => {
		const tuples = tuplesFromArray({list: data, maxItems: size});
		const allItemsFlattened: Array<string | undefined > = [];
		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(size);
			allItemsFlattened.push(...tuple);
		}

		expect(allItemsFlattened).toBeArrayOfSize(data.length);
	});

	it.each<ParameterDataset<string>>([
		{data: hexadecimals({howMany: 5}), size: 3},
		{data: hexadecimals({howMany: 59}), size: 5},
		{data: hexadecimals({howMany: 108}), size: 10},
	])('should produce correct remainder quantities when sub-arrays are not all maxItems size', ({data, size}) => {
		const tuples = tuplesFromArray({list: data, maxItems: size});
		const allItemsFlattened: Array<string | undefined > = [];
		const localTuples: Array<Array<string | undefined >> = [];
		for (const tuple of tuples) {
			allItemsFlattened.push(...tuple);
			localTuples.push(tuple);
		}

		expect(allItemsFlattened).toBeArrayOfSize(data.length);

		for (const tuple of localTuples) {
			expect(tuple).toBeArray();
			expect(tuple.length).toBeLessThanOrEqual(size);
			expect(tuple.length).toBeGreaterThanOrEqual(data.length % size);
		}

		const hasRemainder = localTuples.pop();
		expect(hasRemainder).toBeArrayOfSize(data.length % size);
	});

	it.each<ParameterDataset<number | Date>>([
		{data: dates({howMany: 50}), size: 10, type: 'date'},
		{data: Array.from({length: 50}, (_, i: number) => i + 1), size: 5, type: 'number'},
	])('should produce sub-arrays with the correct data types', ({data, size, type}) => {
		const matcher = type === 'number' ? isEven : undefined;
		const tuples = tuplesFromArray({list: data, maxItems: size, match: matcher});

		for (const tuple of tuples) {
			expect(tuple).toBeArrayOfSize(size);

			const predicate = type === 'number'
				? isEven
				: (type === 'date' ? isDate : () => false);

			expect(tuple).toSatisfyAll(predicate);
		}
	});
});
