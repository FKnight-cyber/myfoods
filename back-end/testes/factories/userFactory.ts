import { faker } from '@faker-js/faker';

export default async function __userFactory(){
    return {
        name: faker.name.firstName(),
        password: faker.lorem.words(1),
        cep: "60720096",
        houseNumber: faker.lorem.words(1),
        email: faker.internet.email()
    }
}