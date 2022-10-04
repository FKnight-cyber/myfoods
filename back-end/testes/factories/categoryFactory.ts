import { faker } from '@faker-js/faker';

export default async function __categoryFactory(){
    return {
        name: faker.lorem.word()
    }
}