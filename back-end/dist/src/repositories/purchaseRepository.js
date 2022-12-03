"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function insert(userId, productId) {
    await database_1.default.purchase.create({ data: {
            userId,
            productId
        } });
}
;
async function getUserPurchases(userId) {
    return await database_1.default.purchase.findMany({ where: { userId } });
}
;
async function getPurchasesPerDay(dateInit, dateEnd) {
    return await database_1.default.purchase.findMany({
        where: {
            createdAt: {
                gte: new Date(`${dateInit}`),
                lt: new Date(`${dateEnd}`)
            }
        }
    });
}
const purchaseRepository = {
    insert,
    getUserPurchases,
    getPurchasesPerDay
};
exports.default = purchaseRepository;
