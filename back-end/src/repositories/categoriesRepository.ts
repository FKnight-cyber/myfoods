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

async function remove(id:number) {
    await prisma.category.delete({where:{id}});
}

const categoriesRepository = {
    findCategoryByName,
    findCategoryById,
    getCategories,
    update,
    remove
};

export default categoriesRepository;