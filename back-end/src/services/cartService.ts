import { ICartData } from "../types/cartTypes";
import cartRepository from "../repositories/cartRepository";
import productRepository from "../repositories/productsRepository";
import { checkError } from "../middlewares/errorHandler";
import edgesRepository from "../repositories/edgeRepository";

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

    for(const product of products){
        if(product.edgeId > 0){
            const edge = await edgesRepository.findEdgeById(product.edgeId);
            product.products.price += edge.price;
            product.products.name += ` com borda de ${edge.name}`
        }
        sum += product.products.price * product.quantity;
    }

    return [products, sum];
};

async function removeFromCart(productId:number, itemId:number, quantity:number) {
    await cartRepository.remove(itemId);

    await productRepository.cancelOrder(productId, quantity);
};

async function cleanCart(userId:number) {
    await cartRepository.removeUserProducts(userId);
}

async function cancelCart(userId:number) {
    const products = await cartRepository.getProductsByUserId(userId);

    for (const product of products){
        await productRepository.cancelOrder(product.productId, product.quantity);
    }
    
    await cartRepository.removeUserProducts(userId);
}

const cartServices = {
    addToCart,
    listProducts,
    removeFromCart,
    cleanCart,
    cancelCart
};

export default cartServices;