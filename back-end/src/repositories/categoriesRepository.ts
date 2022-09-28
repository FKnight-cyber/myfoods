import prisma from "../database";

async function findCategoryByName(name:string) {
    return await prisma.category.findFirst({where:{name}});
};

async function getCategories(){
    return await prisma.category.findMany({});
}

const categoriesRepository = {
    findCategoryByName,
    getCategories
};

export default categoriesRepository;