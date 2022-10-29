"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
async function __productFactory() {
    return {
        name: faker_1.faker.lorem.word(),
        image: faker_1.faker.image.animals(),
        category: faker_1.faker.lorem.word(),
        description: faker_1.faker.lorem.words(),
        quantity: faker_1.faker.datatype.number(),
        price: faker_1.faker.datatype.number()
    };
}
exports.default = __productFactory;
