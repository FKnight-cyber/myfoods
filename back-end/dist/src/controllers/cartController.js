"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelCart = exports.cleanCart = exports.removeItemFromCart = exports.getMyOrders = exports.addToCart = void 0;
const cartService_1 = __importDefault(require("../services/cartService"));
async function addToCart(req, res) {
    const { productId, quantity } = req.body;
    const { userInfo } = res.locals;
    const userId = userInfo.data.id;
    await cartService_1.default.addToCart({
        userId,
        productId,
        quantity
    });
    res.sendStatus(201);
}
exports.addToCart = addToCart;
;
async function getMyOrders(req, res) {
    const { userInfo } = res.locals;
    const userId = userInfo.data.id;
    const products = await cartService_1.default.listProducts(userId);
    res.status(200).send(products);
}
exports.getMyOrders = getMyOrders;
async function removeItemFromCart(req, res) {
    const productId = Number(req.query.product);
    const itemId = Number(req.query.item);
    const quantity = Number(req.query.quantity);
    await cartService_1.default.removeFromCart(productId, itemId, quantity);
    res.sendStatus(200);
}
exports.removeItemFromCart = removeItemFromCart;
;
async function cleanCart(req, res) {
    const { userInfo } = res.locals;
    const userId = userInfo.data.id;
    await cartService_1.default.cleanCart(userId);
    res.sendStatus(200);
}
exports.cleanCart = cleanCart;
;
async function cancelCart(req, res) {
    const { userInfo } = res.locals;
    const userId = userInfo.data.id;
    await cartService_1.default.cancelCart(userId);
    res.sendStatus(200);
}
exports.cancelCart = cancelCart;
