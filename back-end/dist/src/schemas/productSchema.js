"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateSchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    quantity: joi_1.default.number().min(1).required(),
    price: joi_1.default.number().min(1).required()
});
exports.productUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    quantity: joi_1.default.number().min(1).required(),
    price: joi_1.default.number().min(1).required()
});
