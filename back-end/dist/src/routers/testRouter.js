"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = __importDefault(require("../controllers/testController"));
const testRouter = (0, express_1.Router)();
testRouter.delete("/test/users/clear", testController_1.default);
exports.default = testRouter;
