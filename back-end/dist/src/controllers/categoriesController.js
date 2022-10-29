"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.deleteCategory = exports.editCategory = exports.getCategories = void 0;
const categoriesService_1 = __importDefault(require("../services/categoriesService"));
async function getCategories(req, res) {
    const categories = await categoriesService_1.default.getCategories();
    res.status(200).send(categories);
}
exports.getCategories = getCategories;
;
async function editCategory(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    const name = req.body.name;
    const category = await categoriesService_1.default.updateCategoryById(id, name, userInfo.data);
    res.status(200).send(category);
}
exports.editCategory = editCategory;
;
async function deleteCategory(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    await categoriesService_1.default.deleleCategoryById(id, userInfo.data);
    res.sendStatus(200);
}
exports.deleteCategory = deleteCategory;
;
async function createCategory(req, res) {
    const { userInfo } = res.locals;
    const name = req.body.name;
    await categoriesService_1.default.addCategory(name, userInfo.data);
    res.sendStatus(201);
}
exports.createCategory = createCategory;
