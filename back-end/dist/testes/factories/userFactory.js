"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__adminFactory = exports.__userFactory = void 0;
const faker_1 = require("@faker-js/faker");
async function __userFactory() {
    return {
        name: faker_1.faker.name.firstName(),
        password: faker_1.faker.lorem.words(1),
        cep: "60720096",
        houseNumber: faker_1.faker.lorem.words(1),
        email: faker_1.faker.internet.email()
    };
}
exports.__userFactory = __userFactory;
async function __adminFactory() {
    return {
        name: faker_1.faker.name.firstName(),
        password: "12345678",
        cep: faker_1.faker.lorem.word(8),
        houseNumber: faker_1.faker.lorem.word(4),
        email: process.env.ADMIN_EMAIL
    };
}
exports.__adminFactory = __adminFactory;
