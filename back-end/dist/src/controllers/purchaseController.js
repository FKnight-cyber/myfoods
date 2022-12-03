"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchaseInfo = exports.getUserPurchases = exports.finishOrder = void 0;
const purchaseService_1 = __importDefault(require("../services/purchaseService"));
async function finishOrder(req, res) {
    const { userInfo } = res.locals;
    const userId = userInfo.data.id;
    const { products } = req.body;
    await purchaseService_1.default.purchase(userId, products);
    res.sendStatus(201);
}
exports.finishOrder = finishOrder;
;
async function getUserPurchases(req, res) {
    const { userInfo } = res.locals;
    const user = userInfo.data;
    const purchases = await purchaseService_1.default.getUserInfo(user.id);
    res.status(200).send(purchases);
}
exports.getUserPurchases = getUserPurchases;
async function getPurchaseInfo(req, res) {
    const { userInfo } = res.locals;
    const { dateInit, dateEnd } = req.body;
    const user = userInfo.data;
    const purchases = await purchaseService_1.default.getDailyInfo(user, dateInit, dateEnd);
    res.status(200).send(purchases);
}
exports.getPurchaseInfo = getPurchaseInfo;
