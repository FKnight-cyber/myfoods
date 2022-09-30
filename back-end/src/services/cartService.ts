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

    let sum = 0;

    products.forEach(product => {
        sum += product.products.price;
    });

    return [products,sum];
}

async function removeFromCart(productId:number, itemId:number, quantity:number) {
    await cartRepository.remove(itemId);

    await productRepository.cancelOrder(productId, quantity);
}

const cartServices = {
    addToCart,
    listProducts,
    removeFromCart
};

export default cartServices;