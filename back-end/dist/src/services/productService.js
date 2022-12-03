"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesRepository_1 = __importDefault(require("../repositories/categoriesRepository"));
const productsRepository_1 = __importDefault(require("../repositories/productsRepository"));
const errorHandler_1 = require("../middlewares/errorHandler");
async function getProductsByCategoryName(category) {
    const checkCategory = await categoriesRepository_1.default.findCategoryByName(category);
    if (!checkCategory)
        throw (0, errorHandler_1.checkError)(404, "Categoria não cadastrada!");
    const products = await productsRepository_1.default.findProductsByCategoryId(checkCategory.id);
    return products;
}
;
async function getAll() {
    return await productsRepository_1.default.getAllProducts();
}
;
async function addProduct(name, image, category, description, quantity, price, hasEdge, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkCategory = await categoriesRepository_1.default.findCategoryByName(category);
    if (!checkCategory)
        throw (0, errorHandler_1.checkError)(404, "Categoria não registrada!");
    const product = {
        name,
        imageURL: image,
        description,
        quantity,
        price,
        categoryId: checkCategory.id
    };
    await productsRepository_1.default.insert(product);
}
;
async function removeProduct(id, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkProduct = await productsRepository_1.default.findProductById(id);
    if (!checkProduct)
        throw (0, errorHandler_1.checkError)(404, "Produto não registrado!");
    await productsRepository_1.default.remove(id);
}
;
async function editProduct(name, image, description, quantity, price, id, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkProduct = await productsRepository_1.default.findProductById(id);
    if (!checkProduct)
        throw (0, errorHandler_1.checkError)(404, "Produto não registrado!");
    const product = {
        imageURL: image,
        description,
        quantity,
        price,
        name
    };
    return await productsRepository_1.default.update(id, product);
}
;
const productServices = {
    getProductsByCategoryName,
    addProduct,
    getAll,
    removeProduct,
    editProduct
};
exports.default = productServices;
