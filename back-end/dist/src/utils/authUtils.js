"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateUserToken(data) {
    const secret = process.env.JWT_SECRET || "";
    return (jsonwebtoken_1.default.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
        data
    }, secret));
}
exports.generateUserToken = generateUserToken;
;
function encrypt(password) {
    return bcrypt_1.default.hashSync(password, 10);
}
exports.encrypt = encrypt;
;
function decrypt(password, hashPassword) {
    return bcrypt_1.default.compareSync(password, hashPassword);
}
exports.decrypt = decrypt;
;
