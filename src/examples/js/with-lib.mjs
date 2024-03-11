import tuplesFromArray from '../../../dist/esm/index.mjs';

const indexToDate = (index = 0) => batchId => new Promise(resolve => {
	console.log(`[Batch ${batchId}] task ${index + 1} starting`);
	const delay = Math.random() * 3000;
	const dt = new Date(`2024-07-${(index + 1) % 30}`);
	setTimeout(() => {
		console.log(`[Batch ${batchId}] task ${index + 1} completed in ${delay.toFixed(2)} ms`);
		resolve(dt);
	}, delay);
});

const processTask = async (todo, batchId) => {
	const out = await todo(batchId);
	return out;
};

const executeWitLibrary = async (todos, maxBatchSize) => {
	console.log(`\ndo <= ${maxBatchSize} of ${todos.length} tasks, at any given time (with library)`);
	const done = [];

	let batchIndex = 1;
	const todosBatchIterable = tuplesFromArray({list: todos, maxItems: maxBatchSize});
	for (const batch of todosBatchIterable) {
		console.log(`\n----- starting batch [${batchIndex}], ${batch.length} todos`);
		const results = await Promise.allSettled(
			batch.map(todo => processTask(todo, batchIndex)),
		);
		done.push(...results);

		batchIndex += 1;
	}

	return done;
};

(async () => {
	const tasks = Array.from({length: 5}, (_, i) => indexToDate(i));
	const maxTasksPerTime = 2;

	const allDone = await executeWitLibrary(tasks, maxTasksPerTime);
	console.log('\n', allDone);
})();
