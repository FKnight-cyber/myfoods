"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const categoriesController_1 = require("../controllers/categoriesController");
const categoryValidation_1 = __importDefault(require("../middlewares/categoryValidation"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/categories", authentication_1.default, categoriesController_1.getCategories);
categoryRouter.post("/categories/create", categoryValidation_1.default, authentication_1.default, categoriesController_1.createCategory);
categoryRouter.patch("/categories/:id", categoryValidation_1.default, authentication_1.default, categoriesController_1.editCategory);
categoryRouter.delete("/categories/delete/:id", authentication_1.default, categoriesController_1.deleteCategory);
exports.default = categoryRouter;
