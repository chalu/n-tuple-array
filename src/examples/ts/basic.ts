import {tuplesFromArray} from '../../index';
import {
	hexadecimals, isDate, dates, uuids,
} from './utils';

console.log('----- Example 1 [10 Hex in twos. Used default param values] ------');
for (const hexPair of tuplesFromArray({list: hexadecimals(10)})) {
	console.log(hexPair);
}

console.log('\n----- Example 2 [30 Hex in fives. Specified maxItems] ------');
for (const hexQuintet of tuplesFromArray({list: hexadecimals(30), maxItems: 5})) {
	console.log(hexQuintet);
}

console.log('\n----- Example 3 [Dates in twos. Filtered in by a match function] ------');
// Create an array of 50 elements which include some dates
const data = [...hexadecimals(20), ...dates(10), ...uuids(20)] as Array<string | Date>;
// Use a basic/weak shuffle algo to shuffle the array items
data.sort(() => Math.random() - 0.5);

for (const dateTriplet of tuplesFromArray({list: data, match: isDate})) {
	console.log(dateTriplet);
}

console.log('\n----- Example 4 [Tuples can be "remainders", see the last array/tuple] ------');
for (const idTriplets of tuplesFromArray({list: uuids(8), maxItems: 3})) {
	console.log(idTriplets);
}

const dozenHexValues = hexadecimals(12);
const hexIterable = tuplesFromArray({list: dozenHexValues, maxItems: 2});
const hexPairs = Array.from(hexIterable);
console.log('Array.from( tuplesFromArray(...) ) is an Array:', Array.isArray(hexPairs));
// Use native Array methods
hexPairs
	.map(pair => pair.toString().toUpperCase().split(','))
	.forEach(pair => {
		console.log(pair);
	});
