import { ICartData } from "../types/cartTypes";
import cartRepository from "../repositories/cartRepository";

async function addToCart(cart:ICartData){
    await cartRepository.insert(cart);
}

const cartServices = {
    addToCart
};

export default cartServices;