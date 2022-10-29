"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../middlewares/errorHandler");
const categoriesRepository_1 = __importDefault(require("../repositories/categoriesRepository"));
const productsRepository_1 = __importDefault(require("../repositories/productsRepository"));
async function getCategories() {
    return categoriesRepository_1.default.getCategories();
}
;
async function updateCategoryById(id, name, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkCategory = await categoriesRepository_1.default.findCategoryById(id);
    if (!checkCategory)
        throw (0, errorHandler_1.checkError)(404, "Categoria não está cadastrada!");
    await categoriesRepository_1.default.update(id, name);
    return {
        id,
        name
    };
}
;
async function deleleCategoryById(id, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkCategory = await categoriesRepository_1.default.findCategoryById(id);
    if (!checkCategory)
        throw (0, errorHandler_1.checkError)(404, "Categoria não está cadastrada!");
    await productsRepository_1.default.deleteAllProductsByCategoryId(id);
    await categoriesRepository_1.default.remove(id);
}
;
async function addCategory(name, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkCategory = await categoriesRepository_1.default.findCategoryByName(name);
    if (checkCategory)
        throw (0, errorHandler_1.checkError)(409, "Categoria já está cadastrada!");
    await categoriesRepository_1.default.insert(name);
}
const categoryServices = {
    getCategories,
    updateCategoryById,
    deleleCategoryById,
    addCategory
};
exports.default = categoryServices;
