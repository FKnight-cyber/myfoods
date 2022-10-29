"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidation_1 = __importDefault(require("../middlewares/authValidation"));
const authController_1 = require("../controllers/authController");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authRouter = (0, express_1.Router)();
authRouter.post("/sign-up", (0, authValidation_1.default)("signup"), authController_1.signUp);
authRouter.post("/sign-in", (0, authValidation_1.default)("signin"), authController_1.signIn);
authRouter.get("/user/info", authentication_1.default, authController_1.getUserInfo);
exports.default = authRouter;
