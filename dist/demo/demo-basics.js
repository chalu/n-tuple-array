"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const demo_utils_1 = require("./demo-utils");
console.log('----- Example 1 [10 Hex in twos. Used default param values] ------');
for (const hexPair of (0, index_1.tuplesFromArray)({ list: (0, demo_utils_1.hexadecimals)(10) })) {
    console.log(hexPair);
}
console.log('\n----- Example 2 [30 Hex in fives. Specified maxItems] ------');
for (const hexQuintet of (0, index_1.tuplesFromArray)({ list: (0, demo_utils_1.hexadecimals)(30), maxItems: 5 })) {
    console.log(hexQuintet);
}
console.log('\n----- Example 3 [Dates in twos. Filtered in by a match function] ------');
// Create an array of 50 elements which include some dates
const data = [...(0, demo_utils_1.hexadecimals)(20), ...(0, demo_utils_1.dates)(10), ...(0, demo_utils_1.uuids)(20)];
// Use a basic/weak shuffle algo to shuffle the array items
data.sort(() => Math.random() - 0.5);
for (const dateTriplet of (0, index_1.tuplesFromArray)({ list: data, match: demo_utils_1.isDate })) {
    console.log(dateTriplet);
}
console.log('\n----- Example 4 [Tuples can be "remainders", see the last array/tuple] ------');
for (const idTriplets of (0, index_1.tuplesFromArray)({ list: (0, demo_utils_1.uuids)(8), maxItems: 3 })) {
    console.log(idTriplets);
}
const dozenHexValues = (0, demo_utils_1.hexadecimals)(12);
const hexIterable = (0, index_1.tuplesFromArray)({ list: dozenHexValues, maxItems: 2 });
const hexPairs = Array.from(hexIterable);
console.log('Array.from( tuplesFromArray(...) ) is an Array:', Array.isArray(hexPairs));
// Use native Array methods
hexPairs
    .map(pair => pair.toString().toUpperCase().split(','))
    .forEach(pair => {
    console.log(pair);
});
