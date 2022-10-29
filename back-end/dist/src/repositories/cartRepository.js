"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function insert(cart) {
    await database_1.default.cart.create({ data: cart });
}
async function getProductsByUserId(userId) {
    return await database_1.default.cart.findMany({
        where: {
            userId
        },
        include: {
            products: {
                select: {
                    name: true,
                    price: true,
                    description: true,
                    imageURL: true,
                    categoryId: true
                }
            }
        }
    });
}
;
async function remove(id) {
    await database_1.default.cart.delete({ where: { id } });
}
;
async function removeUserProducts(userId) {
    await database_1.default.cart.deleteMany({ where: { userId } });
}
const cartRepository = {
    insert,
    getProductsByUserId,
    remove,
    removeUserProducts
};
exports.default = cartRepository;
