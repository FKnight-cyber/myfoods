"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
async function __categoryFactory() {
    return {
        name: faker_1.faker.lorem.word()
    };
}
exports.default = __categoryFactory;
