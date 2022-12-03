"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const districtsController_1 = require("../controllers/districtsController");
const categoryValidation_1 = __importDefault(require("../middlewares/categoryValidation"));
const districtsRouter = (0, express_1.Router)();
districtsRouter.get("/districts", authentication_1.default, districtsController_1.getDistricts);
districtsRouter.post("/districts/add", categoryValidation_1.default, authentication_1.default, districtsController_1.addDistrict);
districtsRouter.patch("/districts/:id", categoryValidation_1.default, authentication_1.default, districtsController_1.editDistrict);
districtsRouter.delete("/districts/delete/:id", authentication_1.default, districtsController_1.removeDistrict);
exports.default = districtsRouter;
