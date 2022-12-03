"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categorySchema_1 = __importDefault(require("../schemas/categorySchema"));
function categoryValidation(req, res, next) {
    const { error } = categorySchema_1.default.validate(req.body);
    if (error)
        return res.status(422).send(error.details.map(detail => detail.message));
    next();
}
exports.default = categoryValidation;
;
