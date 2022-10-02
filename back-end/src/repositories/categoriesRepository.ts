import prisma from "../database";

async function findCategoryByName(name:string) {
    return await prisma.category.findFirst({where:{name}});
};

async function findCategoryById(id:number) {
    return await prisma.category.findUnique({where:{id}});
};

async function getCategories(){
    return await prisma.category.findMany({});
}

async function update(id:number,name:string){
    await prisma.category.update({
        where:{
            id
        },
        data:{
            name
        }
    })
};

const categoriesRepository = {
    findCategoryByName,
    findCategoryById,
    getCategories,
    update
};

export default categoriesRepository;