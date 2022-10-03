import prisma from "../database";
import { IProductData, IProductDataUpdate } from "../types/productTypes";

async function insert(product:IProductData) {
    await prisma.product.create({data:product});
}

async function getAllProducts() {
    return prisma.product.findMany({
        orderBy:{
            categoryId: 'asc'
        }
    })
}

async function findProductsByCategoryId(id:number) {
    return await prisma.product.findMany(
        {
            where:{
                categoryId:id,
                quantity:{
                    gt:0
                }
            }
        });
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

async function remove(id:number) {
    await prisma.product.delete({where:{id}});
};

async function update(id:number,product:IProductDataUpdate){
    await prisma.product.update({
        where:{
            id
        },
        data:product
    })
};

const productsRepository = {
    findProductsByCategoryId,
    findProductById,
    order,
    cancelOrder,
    insert,
    getAllProducts,
    remove,
    update
};

export default productsRepository;