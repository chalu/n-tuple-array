"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const demo_utils_1 = require("./demo-utils");
const processItem = async (item) => {
    await (0, demo_utils_1.delay)(Math.random() * 500); // Simulate some async workload
    const processed = (item instanceof Date && (0, demo_utils_1.isDate)(item)) ? demo_utils_1.canadaDateFormat.format(item) : item;
    return processed;
};
const parallelPool = async (tasks, prarallelSize) => {
    const processed = [];
    const parallelSizeAwareIterable = (0, index_1.tuplesFromArray)({
        list: tasks,
        maxItems: prarallelSize,
    });
    let count = 1;
    for await (const cohort of parallelSizeAwareIterable) {
        const results = await Promise.allSettled(cohort.map(async (itm) => processItem(itm)));
        processed.push(...results);
        console.log(`processed ${(0, demo_utils_1.formatCount)(count)} batch of <= ${prarallelSize} items`);
        if ((count * prarallelSize) >= tasks.length) {
            console.log('DONE!');
        }
        count += 1;
    }
    return processed;
};
(async () => {
    const canadianDates = await parallelPool((0, demo_utils_1.dates)(12), 3);
    console.log('-------------------');
    console.log(canadianDates);
})();
