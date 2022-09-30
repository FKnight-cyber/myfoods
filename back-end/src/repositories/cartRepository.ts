import prisma from "../database";
import { ICartData } from "../types/cartTypes";

async function insert(cart:ICartData){
    await prisma.cart.create({data:cart})
}

const cartRepository = {
    insert
}

export default cartRepository;