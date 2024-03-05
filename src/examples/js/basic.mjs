import tuplesFromArray from '../../../dist/esm/index.mjs';

// Some setup
const numbers = Array.from({length: 100}, (_, i) => i + 1);
const isEven = item => {
	if (
		!item
        || typeof item !== 'number'
        || item % 2 !== 0
	) {
		return false;
	}

	return true;
};

// Use the lib
const quintetIterator = tuplesFromArray({
	list: numbers, maxItems: 5, match: isEven,
});

for (const quintet of quintetIterator) {
	// Prints [ 2, 4, 6, 8, 10 ] ... [ 92, 94, 96, 98, 100 ]
	console.log(quintet);
}
