import { faker } from '@faker-js/faker';

export default function __userFactory(){
    return {
        name: faker.name.firstName(),
        password: faker.lorem.words(1),
        cep: "60720096",
        houseNumber: faker.datatype.number({min:1000, max:5000}),
        email: faker.internet.email()
    }
}