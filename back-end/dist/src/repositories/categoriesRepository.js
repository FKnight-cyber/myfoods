"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function findCategoryByName(name) {
    return await database_1.default.category.findFirst({ where: { name } });
}
;
async function findCategoryById(id) {
    return await database_1.default.category.findUnique({ where: { id } });
}
;
async function getCategories() {
    return await database_1.default.category.findMany();
}
;
async function insert(name) {
    await database_1.default.category.create({ data: { name } });
}
async function update(id, name) {
    await database_1.default.category.update({
        where: {
            id
        },
        data: {
            name
        }
    });
}
;
async function remove(id) {
    await database_1.default.category.delete({ where: { id } });
}
;
const categoriesRepository = {
    findCategoryByName,
    findCategoryById,
    getCategories,
    update,
    remove,
    insert
};
exports.default = categoriesRepository;
