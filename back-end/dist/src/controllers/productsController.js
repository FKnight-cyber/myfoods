"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProduct = exports.deleteProduct = exports.getAllProducts = exports.addProduct = exports.getProducts = void 0;
const productService_1 = __importDefault(require("../services/productService"));
async function getProducts(req, res) {
    const category = req.query.category.toString();
    const products = await productService_1.default.getProductsByCategoryName(category);
    res.status(200).send(products);
}
exports.getProducts = getProducts;
;
async function addProduct(req, res) {
    const { userInfo } = res.locals;
    const { name, image, category, description, quantity, price } = req.body;
    await productService_1.default.addProduct(name, image, category, description, quantity, price, userInfo.data);
    res.sendStatus(201);
}
exports.addProduct = addProduct;
;
async function getAllProducts(req, res) {
    const products = await productService_1.default.getAll();
    res.status(200).send(products);
}
exports.getAllProducts = getAllProducts;
;
async function deleteProduct(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    await productService_1.default.removeProduct(id, userInfo.data);
    res.sendStatus(202);
}
exports.deleteProduct = deleteProduct;
;
async function editProduct(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    const { name, image, description, quantity, price } = req.body;
    await productService_1.default.editProduct(name, image, description, quantity, price, id, userInfo.data);
    res.sendStatus(202);
}
exports.editProduct = editProduct;
;
