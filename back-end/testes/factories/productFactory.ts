import { faker } from '@faker-js/faker';

export default async function __productFactory(){
    return {
        name: faker.lorem.word(),
        image: faker.image.animals(),
        category: faker.lorem.word(),
        description: faker.lorem.words(),
        quantity: faker.datatype.number(),
        price: faker.datatype.number()
    }
}