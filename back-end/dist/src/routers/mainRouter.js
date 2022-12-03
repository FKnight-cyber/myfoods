"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./authRouter"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const categoriesRouter_1 = __importDefault(require("./categoriesRouter"));
const cartRouter_1 = __importDefault(require("./cartRouter"));
const testRouter_1 = __importDefault(require("./testRouter"));
const purchaseRouter_1 = __importDefault(require("./purchaseRouter"));
const districtsRouter_1 = __importDefault(require("./districtsRouter"));
const edgeRouter_1 = __importDefault(require("./edgeRouter"));
const mainRouter = (0, express_1.Router)();
mainRouter.use(authRouter_1.default);
mainRouter.use(productsRouter_1.default);
mainRouter.use(categoriesRouter_1.default);
mainRouter.use(cartRouter_1.default);
mainRouter.use(purchaseRouter_1.default);
mainRouter.use(districtsRouter_1.default);
mainRouter.use(edgeRouter_1.default);
if (process.env.NODE_ENV === "test") {
    mainRouter.use(testRouter_1.default);
}
;
exports.default = mainRouter;
