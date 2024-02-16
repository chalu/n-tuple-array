import {simpleFaker as Faker} from '@faker-js/faker';

type Config = {
	howMany?: number;
};

type MaybeNumber = number | undefined | unknown;

const defaultDataSize = 100;

const factory = <T>(howMany: number, generator: () => T) => Faker.helpers.multiple<T>(generator, {count: howMany});

export const uuids = (arguments_: Config = {}) => {
	const {howMany = defaultDataSize} = arguments_;
	return factory(howMany, Faker.string.uuid);
};

export const dates = (arguments_: Config = {}) => {
	const {howMany = defaultDataSize} = arguments_;
	return factory(howMany, Faker.date.recent);
};

export const numbers = (arguments_: Config = {}) => {
	const {howMany = defaultDataSize} = arguments_;
	return factory(howMany, Faker.string.numeric).map(n => Number.parseInt(n, 10));
};

export const hexadecimals = (arguments_: Config = {}) => {
	const {howMany = defaultDataSize} = arguments_;
	return factory(howMany, Faker.string.hexadecimal);
};

const mulpleOf = (multiple: number, item: MaybeNumber) => {
	if (
		!item
        || typeof item !== 'number'
        || item % multiple !== 0
	) {
		return false;
	}

	return true;
};

export const isEven = (number_: MaybeNumber) => mulpleOf(2, number_);
export const isMultipleOfFive = (number_: MaybeNumber) => mulpleOf(5, number_);
export const isDate = (date: unknown) => date instanceof Date && !Number.isNaN(date.getTime());
