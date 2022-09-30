import { ICartData } from "../types/cartTypes";
import cartRepository from "../repositories/cartRepository";
import productRepository from "../repositories/productsRepository";
import { checkError } from "../middlewares/errorHandler";

async function addToCart(cart:ICartData){

    const product = await productRepository.findProductById(cart.productId);

    if(!product) throw checkError(404, "Produto não registrado!");
    if(cart.quantity > product.quantity) throw checkError(409, "Estoque insuficiente!");

    await cartRepository.insert(cart);

    await productRepository.order(cart.productId,cart.quantity);
};

async function listProducts(userId:number){
    const products = await cartRepository.getProductsByUserId(userId);

    return products;
}

const cartServices = {
    addToCart,
    listProducts
};

export default cartServices;