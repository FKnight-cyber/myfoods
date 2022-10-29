"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const categoriesService_1 = __importDefault(require("../../src/services/categoriesService"));
const categoriesRepository_1 = __importDefault(require("../../src/repositories/categoriesRepository"));
const productsRepository_1 = __importDefault(require("../../src/repositories/productsRepository"));
const userFactory_1 = require("../factories/userFactory");
globals_1.jest.mock("../../src/repositories/categoriesRepository.ts");
beforeEach(() => {
    globals_1.jest.resetAllMocks();
    globals_1.jest.clearAllMocks();
});
describe("Categories service suit test", () => {
    it("should return all registered categories", async () => {
        globals_1.jest.spyOn(categoriesRepository_1.default, "getCategories").mockImplementationOnce(() => {
            return [
                {
                    id: 1,
                    name: "c1"
                },
                {
                    id: 2,
                    name: "c2"
                }
            ];
        });
        const result = await categoriesService_1.default.getCategories();
        expect(categoriesRepository_1.default.getCategories).toBeCalled();
        expect(result).toEqual([
            {
                id: 1,
                name: "c1"
            },
            {
                id: 2,
                name: "c2"
            }
        ]);
    });
    it("should fail when unauthorized user tries to edit a category", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const result = categoriesService_1.default.updateCategoryById(1, "Pizzas", user);
        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });
    it("should fail when tries to edit unregistered category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryById").mockImplementationOnce(() => {
            return null;
        });
        const result = categoriesService_1.default.updateCategoryById(1, "Pizzas", user);
        expect(result).rejects.toEqual({
            status: 404,
            message: "Categoria não está cadastrada!"
        });
    });
    it("should successfully edit a category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryById").mockImplementationOnce(() => {
            return true;
        });
        globals_1.jest.spyOn(categoriesRepository_1.default, "update").mockImplementationOnce(() => {
            return true;
        });
        const result = await categoriesService_1.default.updateCategoryById(1, "Pizzas", user);
        expect(result).toEqual({
            id: 1,
            name: "Pizzas"
        });
    });
    it("should fail when unauthorized user tries to remove a category", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const result = categoriesService_1.default.deleleCategoryById(1, user);
        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });
    it("should fail when tries to remove unregistered category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryById").mockImplementationOnce(() => {
            return null;
        });
        const result = categoriesService_1.default.deleleCategoryById(1, user);
        expect(result).rejects.toEqual({
            status: 404,
            message: "Categoria não está cadastrada!"
        });
    });
    it("should successfully remove a category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryById").mockImplementationOnce(() => {
            return true;
        });
        globals_1.jest.spyOn(productsRepository_1.default, "deleteAllProductsByCategoryId").mockImplementationOnce(() => {
            return true;
        });
        await categoriesService_1.default.deleleCategoryById(1, user);
        expect(categoriesRepository_1.default.remove).toBeCalled();
    });
    it("should fail when unauthorized user tries to add a category", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const result = categoriesService_1.default.addCategory("Pizzas", user);
        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });
    it("should fail when tries to add duplicated category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryByName").mockImplementationOnce(() => {
            return true;
        });
        const result = categoriesService_1.default.addCategory("Pizzas", user);
        expect(result).rejects.toEqual({
            status: 409,
            message: "Categoria já está cadastrada!"
        });
    });
    it("should successfully add a category", async () => {
        const user = await (0, userFactory_1.__adminFactory)();
        globals_1.jest.spyOn(categoriesRepository_1.default, "findCategoryByName").mockImplementationOnce(() => {
            return false;
        });
        await categoriesService_1.default.addCategory("Pizzas", user);
        expect(categoriesRepository_1.default.insert).toBeCalled();
    });
});
