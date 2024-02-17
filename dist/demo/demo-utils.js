"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.formatCount = exports.canadaDateFormat = exports.isDate = exports.hexadecimals = exports.dates = exports.uuids = void 0;
const faker_1 = require("@faker-js/faker");
/**
 * Some Helper Functions
 */
const factory = (generator, howMany = 20) => faker_1.simpleFaker.helpers.multiple(generator, { count: howMany });
const uuids = (howMany) => factory(faker_1.simpleFaker.string.uuid, howMany);
exports.uuids = uuids;
const dates = (howMany) => factory(faker_1.simpleFaker.date.birthdate, howMany);
exports.dates = dates;
const hexadecimals = (howMany) => factory(faker_1.simpleFaker.string.hexadecimal, howMany);
exports.hexadecimals = hexadecimals;
const isDate = (date) => (date instanceof Date) && !Number.isNaN(date.getTime());
exports.isDate = isDate;
exports.canadaDateFormat = new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
});
const plural = new Intl.PluralRules('en-US', { type: 'ordinal' });
const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th'],
]);
const formatCount = (n) => {
    const rule = plural.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};
exports.formatCount = formatCount;
const delay = async (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});
exports.delay = delay;
