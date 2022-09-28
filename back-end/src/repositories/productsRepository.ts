import prisma from "../database";

async function findProductsByCategoryId(id:number) {
    return await prisma.product.findMany({where:{
        categoryId:id,
        quantity:{
            gt:0
        }
    }});
};

const productsRepository = {
    findProductsByCategoryId
};

export default productsRepository;