import {tuplesFromArray} from '../../index';
import {
	isDate, dates, canadaDateFormat, delay, formatCount,
} from './utils';

const processItem = async <T>(item: T | undefined) => {
	await delay(Math.random() * 500); // Simulate some async workload

	const processed = (item instanceof Date && isDate(item)) ? canadaDateFormat.format(item) : item;
	return processed;
};

const parallelPool = async <T>(tasks: Array<T | undefined>, prarallelSize: number) => {
	const processed: Array<PromiseSettledResult<string | Awaited<T> | undefined>> = [];
	const parallelSizeAwareIterable = tuplesFromArray({
		list: tasks,
		maxItems: prarallelSize,
	});

	let count = 1;
	for await (const cohort of parallelSizeAwareIterable) {
		const results = await Promise.allSettled(cohort.map(async itm => processItem(itm)));
		processed.push(...results);

		console.log(`processed ${formatCount(count)} batch of <= ${prarallelSize} items`);
		if ((count * prarallelSize) >= tasks.length) {
			console.log('DONE!');
		}

		count += 1;
	}

	return processed;
};

(async () => {
	const canadianDates = await parallelPool(dates(12), 3);
	console.log('-------------------');
	console.log(canadianDates);
})();

