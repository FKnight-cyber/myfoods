import prisma from "../database";

async function findProductsByCategoryId(id:number) {
    return await prisma.product.findMany({where:{
        categoryId:id,
        quantity:{
            gt:0
        }
    }});
};

async function findProductById(id:number) {
    return await prisma.product.findUnique({where:{id}});
};

async function order(id:number,amount:number) {
    await prisma.product.update({
        where:{
            id
        },
        data:{
            quantity:{
                decrement: amount
            }
        }
    });
};

async function cancelOrder(id:number,amount:number) {
    await prisma.product.update({
        where:{
            id
        },
        data:{
            quantity:{
                increment: amount
            }
        }
    });
};

const productsRepository = {
    findProductsByCategoryId,
    findProductById,
    order,
    cancelOrder
};

export default productsRepository;