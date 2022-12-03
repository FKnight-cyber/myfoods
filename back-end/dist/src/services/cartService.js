"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartRepository_1 = __importDefault(require("../repositories/cartRepository"));
const productsRepository_1 = __importDefault(require("../repositories/productsRepository"));
const errorHandler_1 = require("../middlewares/errorHandler");
const edgeRepository_1 = __importDefault(require("../repositories/edgeRepository"));
async function addToCart(cart) {
    const product = await productsRepository_1.default.findProductById(cart.productId);
    if (!product)
        throw (0, errorHandler_1.checkError)(404, "Produto não registrado!");
    if (cart.quantity > product.quantity)
        throw (0, errorHandler_1.checkError)(409, "Estoque insuficiente!");
    await cartRepository_1.default.insert(cart);
    await productsRepository_1.default.order(cart.productId, cart.quantity);
}
;
async function listProducts(userId) {
    const products = await cartRepository_1.default.getProductsByUserId(userId);
    let sum = 0;
    for (const product of products) {
        if (product.edgeId > 0) {
            const edge = await edgeRepository_1.default.findEdgeById(product.edgeId);
            product.products.price += edge.price;
            product.products.name += ` com borda de ${edge.name}`;
        }
        sum += product.products.price * product.quantity;
    }
    return [products, sum];
}
;
async function removeFromCart(productId, itemId, quantity) {
    await cartRepository_1.default.remove(itemId);
    await productsRepository_1.default.cancelOrder(productId, quantity);
}
;
async function cleanCart(userId) {
    await cartRepository_1.default.removeUserProducts(userId);
}
async function cancelCart(userId) {
    const products = await cartRepository_1.default.getProductsByUserId(userId);
    for (const product of products) {
        await productsRepository_1.default.cancelOrder(product.productId, product.quantity);
    }
    await cartRepository_1.default.removeUserProducts(userId);
}
const cartServices = {
    addToCart,
    listProducts,
    removeFromCart,
    cleanCart,
    cancelCart
};
exports.default = cartServices;
