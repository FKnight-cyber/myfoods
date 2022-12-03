"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchaseRepository_1 = __importDefault(require("../repositories/purchaseRepository"));
const errorHandler_1 = require("../middlewares/errorHandler");
async function purchase(userId, products) {
    for (const productId of products) {
        await purchaseRepository_1.default.insert(userId, productId);
    }
}
;
async function getUserInfo(userId) {
    return await purchaseRepository_1.default.getUserPurchases(userId);
}
;
async function getDailyInfo(user, dateInit, dateEnd) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    return await purchaseRepository_1.default.getPurchasesPerDay(dateInit, dateEnd);
}
const purchaseServices = {
    purchase,
    getUserInfo,
    getDailyInfo
};
exports.default = purchaseServices;
