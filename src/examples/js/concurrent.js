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

const executeConcurrent = async (todos, maxBatchSize) => {
	console.log(`\ndo <= ${maxBatchSize} of ${todos.length} tasks (concurrently), at any given time\n`);
	const done = [];
	const todosCopy = todos.slice();
	const worker = async (_, batchIndex) => {
		let todo = todosCopy.shift();
		while (todo) {
			const [result] = await Promise.allSettled([processTask(todo, batchIndex + 1)]);
			done.push(result);
			todo = todosCopy.shift();
		}
	};

	const batchStarters = Array.from({length: maxBatchSize}, worker);
	await Promise.all(batchStarters);
	return done;
};

(async () => {
	const tasks = Array.from({length: 5}, (_, i) => indexToDate(i));
	const maxTasksPerTime = 2;

	const allDone = await executeConcurrent(tasks, maxTasksPerTime);
	console.log('\n', allDone);
})();
