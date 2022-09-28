import prisma from "../database";

async function findCategoryByName(name:string) {
    return await prisma.category.findFirst({where:{name}});
};

const categoriesRepository = {
    findCategoryByName
};

export default categoriesRepository;