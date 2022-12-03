"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const cartController_1 = require("../controllers/cartController");
const cartRouter = (0, express_1.Router)();
cartRouter.post("/cart/add", authentication_1.default, cartController_1.addToCart);
cartRouter.get("/cart/list", authentication_1.default, cartController_1.getMyOrders);
cartRouter.delete("/cart/remove", authentication_1.default, cartController_1.removeItemFromCart);
cartRouter.delete("/cart/clean", authentication_1.default, cartController_1.cleanCart);
cartRouter.delete("/cart/cancel", authentication_1.default, cartController_1.cancelCart);
exports.default = cartRouter;
