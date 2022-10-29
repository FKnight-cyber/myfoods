"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function insert(product) {
    await database_1.default.product.create({ data: product });
}
async function getAllProducts() {
    return database_1.default.product.findMany({
        orderBy: {
            categoryId: 'desc'
        }
    });
}
async function findProductsByCategoryId(id) {
    return await database_1.default.product.findMany({
        where: {
            categoryId: id,
            quantity: {
                gt: 0
            }
        }
    });
}
;
async function findProductById(id) {
    return await database_1.default.product.findUnique({ where: { id } });
}
;
async function order(id, amount) {
    await database_1.default.product.update({
        where: {
            id
        },
        data: {
            quantity: {
                decrement: amount
            }
        }
    });
}
;
async function cancelOrder(id, amount) {
    await database_1.default.product.update({
        where: {
            id
        },
        data: {
            quantity: {
                increment: amount
            }
        }
    });
}
;
async function remove(id) {
    await database_1.default.product.delete({ where: { id } });
}
;
async function deleteAllProductsByCategoryId(categoryId) {
    await database_1.default.product.deleteMany({ where: { categoryId } });
}
;
async function update(id, product) {
    await database_1.default.product.update({
        where: {
            id
        },
        data: product
    });
}
;
const productsRepository = {
    findProductsByCategoryId,
    findProductById,
    order,
    cancelOrder,
    insert,
    getAllProducts,
    remove,
    update,
    deleteAllProductsByCategoryId
};
exports.default = productsRepository;
