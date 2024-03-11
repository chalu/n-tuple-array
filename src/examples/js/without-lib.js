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

// Everywhere start/end is used is repititive and error prone
const executeWithoutLibrary = async (todos, maxBatchSize) => {
	console.log(`\ndo <= ${maxBatchSize} of ${todos.length} tasks, at any given time (no library)`);
	const done = [];

	let start = 0;
	let end = start + maxBatchSize;
	let batchIndex = 1;
	let batch = todos.slice(start, end);
	while (batch.length > 0) {
		console.log(`\n----- starting batch [${batchIndex}], ${batch.length} todos`);
		const results = await Promise.allSettled(
			batch.map(todo => processTask(todo, batchIndex)),
		);
		done.push(...results);

		start = end;
		if (start >= todos.length) {
			break;
		}

		end = Math.min(start + maxBatchSize, todos.length);
		batch = todos.slice(start, end);

		batchIndex += 1;
	}

	return done;
};

(async () => {
	const tasks = Array.from({length: 5}, (_, i) => indexToDate(i));
	const maxTasksPerTime = 2;

	const allDone = await executeWithoutLibrary(tasks, maxTasksPerTime);
	console.log('\n', allDone);
})();
