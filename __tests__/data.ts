import { simpleFaker as Faker } from '@faker-js/faker';

interface Config {
    howMany?: number;
}

type MaybeNumber = number | undefined | unknown;

const DEFAULT_DATA_SIZE = 100;

const factory = <T>(howMany: number, generator: () => T) => {
    return Faker.helpers.multiple<T>(generator, { count: howMany });
}

export const uuids = (args: Config = {}) => {
    const {howMany = DEFAULT_DATA_SIZE} = args;
    return factory(howMany, Faker.string.uuid);
}

export const dates = (args: Config = {}) => {
    const {howMany = DEFAULT_DATA_SIZE} = args;
    return factory(howMany, Faker.date.recent);
}

export const numbers = (args: Config = {}) => {
    const {howMany = DEFAULT_DATA_SIZE} = args;
    return factory(howMany, Faker.string.numeric).map((n) => parseInt(n));
}

export const hexadecimals = (args: Config = {}) => {
    const {howMany = DEFAULT_DATA_SIZE} = args;
    return factory(howMany, Faker.string.hexadecimal);
}

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

export const isEven = (num: MaybeNumber) => mulpleOf(2, num);
export const isMultipleOfFive = (num: MaybeNumber) => mulpleOf(5, num);
export const isDate = (date: unknown) => date instanceof Date && !isNaN(date.getTime());