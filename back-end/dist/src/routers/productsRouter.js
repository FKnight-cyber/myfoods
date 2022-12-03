"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const productsController_1 = require("../controllers/productsController");
const productValidation_1 = __importDefault(require("../middlewares/productValidation"));
const productsRouter = (0, express_1.Router)();
productsRouter.get("/products", authentication_1.default, productsController_1.getProducts);
productsRouter.get("/products/all", authentication_1.default, productsController_1.getAllProducts);
productsRouter.post("/products/create", (0, productValidation_1.default)("create"), authentication_1.default, productsController_1.addProduct);
productsRouter.delete("/products/delete/:id", authentication_1.default, productsController_1.deleteProduct);
productsRouter.patch("/products/edit/:id", (0, productValidation_1.default)("update"), authentication_1.default, productsController_1.editProduct);
exports.default = productsRouter;
