import { faker } from '@faker-js/faker';

export async function __userFactory(){
    return {
        name: faker.name.firstName(),
        password: faker.lorem.words(1),
        cep: "60720096",
        houseNumber: faker.lorem.words(1),
        email: faker.internet.email()
    }
}

export async function __adminFactory(){
    return {
        name: faker.name.firstName(),
        password: "12345678",
        cep: faker.lorem.word(8),
        houseNumber: faker.lorem.word(4),
        email: process.env.ADMIN_EMAIL
    }
}
