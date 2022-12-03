"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const database_1 = __importDefault(require("../../src/database"));
const supertest_1 = __importDefault(require("supertest"));
const categoryFactory_1 = __importDefault(require("../factories/categoryFactory"));
const userFactory_1 = require("../factories/userFactory");
beforeEach(async () => {
    await database_1.default.$executeRaw `TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
    await database_1.default.$executeRaw `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
});
describe("POST /categories/create", () => {
    it("should return status 201 when successfully create a new category", async () => {
        const category = await (0, categoryFactory_1.default)();
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        expect(result.status).toBe(201);
    });
    it("should return status 401 when unauthorized user tries to create a new category", async () => {
        const category = await (0, categoryFactory_1.default)();
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
    it("should return status 409 when tries to create duplicated category", async () => {
        const category = await (0, categoryFactory_1.default)();
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        const result = await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        expect(result.status).toBe(409);
    });
});
describe("GET /categories", () => {
    it("should return status 200 and all registered categories", async () => {
        const category1 = await (0, categoryFactory_1.default)();
        const category2 = await (0, categoryFactory_1.default)();
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category1).set('x-access-token', token);
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category2).set('x-access-token', token);
        const result = await (0, supertest_1.default)(app_1.default).get("/categories").send().set('x-access-token', token);
        const categories = JSON.parse(result.text);
        expect(result.status).toBe(200);
        expect(categories.length).toBe(2);
        expect(categories[0].name).toEqual(category1.name);
        expect(categories[1].name).toEqual(category2.name);
    });
});
describe("PATCH /categories/:id", () => {
    it("should return status 401 when unauthorized user tries to edit a category", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).patch("/categories/1").send({ name: "edit" }).set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
    it("should return status 404 when tries to edit unregistered category", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).patch("/categories/99999").send({ name: "edit" }).set('x-access-token', token);
        expect(result.status).toBe(404);
        expect(result.text).toBe('Categoria não está cadastrada!');
    });
    it("should return status 200 when successfully edit a category", async () => {
        const category = await (0, categoryFactory_1.default)();
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        const checkCategory = await database_1.default.category.findUnique({ where: { name: category.name } });
        const result = await (0, supertest_1.default)(app_1.default).patch(`/categories/${checkCategory.id}`).send({ name: "edit" }).set('x-access-token', token);
        expect(result.status).toBe(200);
        expect(result.body).toEqual({
            id: checkCategory.id,
            name: 'edit'
        });
    });
});
describe("DELETE /categories/delete/:id", () => {
    it("should return status 401 when unauthorized user tries to delete a category", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).delete("/categories/delete/1").send().set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
    it("should return status 404 when tries to delete unregistered category", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).delete("/categories/delete/99999").send().set('x-access-token', token);
        expect(result.status).toBe(404);
        expect(result.text).toBe('Categoria não está cadastrada!');
    });
    it("should return status 200 when successfully remove a category", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const category = await (0, categoryFactory_1.default)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send(category).set('x-access-token', token);
        const checkCategory = await database_1.default.category.findUnique({ where: { name: category.name } });
        const result = await (0, supertest_1.default)(app_1.default).delete(`/categories/delete/${checkCategory.id}`).set('x-access-token', token);
        const shouldBeEmpty = await database_1.default.category.findUnique({ where: { name: category.name } });
        expect(result.status).toBe(200);
        expect(shouldBeEmpty).toBe(null);
    });
});
afterAll(async () => {
    database_1.default.$disconnect();
});
