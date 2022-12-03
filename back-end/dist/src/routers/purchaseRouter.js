"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const purchaseController_1 = require("../controllers/purchaseController");
const purchaseRouter = (0, express_1.Router)();
purchaseRouter.post("/purchase", authentication_1.default, purchaseController_1.finishOrder);
purchaseRouter.get("/user/purchase/info", authentication_1.default, purchaseController_1.getUserPurchases);
purchaseRouter.post("/admin/purchase/info", authentication_1.default, purchaseController_1.getPurchaseInfo);
exports.default = purchaseRouter;
