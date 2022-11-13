import { jest } from "@jest/globals";
import categoryServices from "../../src/services/categoriesService";
import categoriesRepository from "../../src/repositories/categoriesRepository";
import productsRepository from "../../src/repositories/productsRepository";
import { __adminFactory, __userFactory } from "../factories/userFactory";

jest.mock("../../src/repositories/categoriesRepository.ts");

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe("Categories service suit test", () => {
    it("should return all registered categories", async () => {
        jest.spyOn(categoriesRepository, "getCategories").mockImplementationOnce(():any => {
            return [
                {
                    id:1,
                    name:"c1"
                },
                {
                    id:2,
                    name:"c2"
                }
            ]
        })
        const result = await categoryServices.getCategories();

        expect(categoriesRepository.getCategories).toBeCalled();
        expect(result).toEqual([
            {
                id:1,
                name:"c1"
            },
            {
                id:2,
                name:"c2"
            }
        ]);
    });

    it("should fail when unauthorized user tries to edit a category", async () => {
        const user = await __userFactory();

        const result = categoryServices.updateCategoryById(1, "Pizzas", user);

        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });

    it("should fail when tries to edit unregistered category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryById").mockImplementationOnce(():any => {
            return null
        });

        const result = categoryServices.updateCategoryById(1, "Pizzas", user);

        expect(result).rejects.toEqual({
            status: 404,
            message: "Categoria não está cadastrada!"
        });
    });

    it("should successfully edit a category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryById").mockImplementationOnce(():any => {
            return true
        });

        jest.spyOn(categoriesRepository, "update").mockImplementationOnce(():any => {
            return true
        })

        const result = await categoryServices.updateCategoryById(1, "Pizzas", user);

        expect(result).toEqual({
            id: 1,
            name: "Pizzas"
        });
    });

    it("should fail when unauthorized user tries to remove a category", async () => {
        const user = await __userFactory();

        const result = categoryServices.deleleCategoryById(1, user);

        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });

    it("should fail when tries to remove unregistered category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryById").mockImplementationOnce(():any => {
            return null
        });

        const result = categoryServices.deleleCategoryById(1, user);

        expect(result).rejects.toEqual({
            status: 404,
            message: "Categoria não está cadastrada!"
        });
    });

    it("should successfully remove a category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryById").mockImplementationOnce(():any => {
            return true
        });

        jest.spyOn(productsRepository, "deleteAllProductsByCategoryId").mockImplementationOnce(():any => {
            return true
        })

        await categoryServices.deleleCategoryById(1, user);

        expect(categoriesRepository.remove).toBeCalled();
    });

    it("should fail when unauthorized user tries to add a category", async () => {
        const user = await __userFactory();

        const result = categoryServices.addCategory("Pizzas", user);

        expect(result).rejects.toEqual({
            status: 401,
            message: "You shall not pass!!!"
        });
    });

    it("should fail when tries to add duplicated category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryByName").mockImplementationOnce(():any => {
            return true
        });

        const result = categoryServices.addCategory("Pizzas", user);

        expect(result).rejects.toEqual({
            status: 409,
            message: "Categoria já está cadastrada!"
        });
    });

    it("should successfully add a category", async () => {
        const user = await __adminFactory();

        jest.spyOn(categoriesRepository, "findCategoryByName").mockImplementationOnce(():any => {
            return false
        });

        await categoryServices.addCategory("Pizzas", user);

        expect(categoriesRepository.insert).toBeCalled();
    });
});

afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});