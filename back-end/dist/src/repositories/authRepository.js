"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function insert(user) {
    await database_1.default.user.create({ data: user });
}
async function findUser(email) {
    return await database_1.default.user.findUnique({ where: { email } });
}
const authRepository = {
    insert,
    findUser
};
exports.default = authRepository;
