import {simpleFaker as Faker} from '@faker-js/faker';

/**
 * Some Helper Functions
 */

const factory = <T>(generator: () => T, howMany = 20) => Faker.helpers.multiple(generator, {count: howMany});

export const uuids = (howMany?: number) => factory<string>(Faker.string.uuid, howMany);
export const dates = (howMany?: number) => factory<Date>(Faker.date.birthdate, howMany);
export const hexadecimals = (howMany?: number) => factory<string>(Faker.string.hexadecimal, howMany);

export const isDate = (date: unknown) => (date instanceof Date) && !Number.isNaN(date.getTime());

export const canadaDateFormat = new Intl.DateTimeFormat('en-CA', {
	dateStyle: 'medium',
});

const plural = new Intl.PluralRules('en-US', {type: 'ordinal'});
const suffixes = new Map([
	['one', 'st'],
	['two', 'nd'],
	['few', 'rd'],
	['other', 'th'],
]);

export const formatCount = (n: number) => {
	const rule = plural.select(n);
	const suffix = suffixes.get(rule);
	return `${n}${suffix}`;
};

export const delay = async (ms: number) => new Promise(resolve => {
	setTimeout(resolve, ms);
});
