"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
async function authentication(req, res, next) {
    let token = req.headers['x-access-token'];
    if (token) {
        token = token.toString();
    }
    if (!token)
        throw (0, errorHandler_1.checkError)(401, "Você precisa enviar o token de autorização!");
    const secret = process.env.JWT_SECRET.toString();
    try {
        jsonwebtoken_1.default.verify(token, secret);
        const data = jsonwebtoken_1.default.decode(token, { complete: true });
        res.locals.userInfo = data?.payload;
        next();
    }
    catch (error) {
        throw (0, errorHandler_1.checkError)(401, "Token inválido ou expirou!");
    }
}
exports.default = authentication;
