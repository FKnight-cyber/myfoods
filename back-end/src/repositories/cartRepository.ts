import prisma from "../database";
import { ICartData } from "../types/cartTypes";

async function insert(cart:ICartData){
    await prisma.cart.create({data:cart})
}

async function getProductsByUserId(userId:number){
    return await prisma.cart.findMany({
        where:{
            userId
        },
        include:{
            products:{
                select:{
                    name:true,
                    price:true,
                    description:true,
                    imageURL:true,
                    categoryId:true
                }
            }
        }    
    });
};

const cartRepository = {
    insert,
    getProductsByUserId
};

export default cartRepository;