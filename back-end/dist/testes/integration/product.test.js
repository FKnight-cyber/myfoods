"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../src/database"));
const productFactory_1 = __importDefault(require("../factories/productFactory"));
const userFactory_1 = require("../factories/userFactory");
beforeEach(async () => {
    await database_1.default.$executeRaw `TRUNCATE TABLE products RESTART IDENTITY CASCADE;`;
    await database_1.default.$executeRaw `TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
});
describe("POST /products/create", () => {
    it("should return status 201 when successfully create a new product", async () => {
        const product = await (0, productFactory_1.default)();
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send({ name: product.category }).set('x-access-token', token);
        const result = await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        expect(result.status).toBe(201);
    });
    it("should return status 404 when product's category isn't registered", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const product = await (0, productFactory_1.default)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        expect(result.status).toBe(404);
    });
    it("should return status 401 when unauthorized user tries to create a product", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const product = await (0, productFactory_1.default)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
});
describe("GET /products", () => {
    it("should return status 200 and a list of products by given category", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const product = await (0, productFactory_1.default)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send({ name: product.category }).set('x-access-token', token);
        await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        const result = await (0, supertest_1.default)(app_1.default).get(`/products?category=${product.category}`).set('x-access-token', token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body.length).toBe(1);
        expect(result.body[0].name).toEqual(product.name);
        expect(result.body[0].imageURL).toEqual(product.image);
        expect(result.body[0].description).toEqual(product.description);
    });
    it("should return status 404 when given category isn't registered", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).get("/products?category=awdhaudhiuahdwiuahwdii").send().set('x-access-token', token);
        expect(result.status).toBe(404);
    });
});
describe("GET /products/all", () => {
    it("should return status 200 and all registered products", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const product1 = await (0, productFactory_1.default)();
        const product2 = await (0, productFactory_1.default)();
        const product3 = await (0, productFactory_1.default)();
        const arrOfProducts = [product1, product2, product3];
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        for (const product of arrOfProducts) {
            await (0, supertest_1.default)(app_1.default).post("/categories/create").send({ name: product.category }).set('x-access-token', token);
            await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        }
        ;
        const result = await (0, supertest_1.default)(app_1.default).get("/products/all").send().set('x-access-token', token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body.length).toEqual(arrOfProducts.length);
    });
});
describe("DELETE /products/delete/:id", () => {
    it("should return status 401 when unauthorized user tries to remove a product", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).delete("/products/delete/1").send().set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
    it("should return status 404 when given product id isn't registered", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).delete("/products/delete/99999").send().set('x-access-token', token);
        expect(result.status).toBe(404);
    });
    it("should return status 202 when successfully remove a product", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const product = await (0, productFactory_1.default)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send({ name: product.category }).set('x-access-token', token);
        await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        const checkProduct = await database_1.default.product.findFirst({ where: { name: product.name } });
        const result = await (0, supertest_1.default)(app_1.default).delete(`/products/delete/${checkProduct.id}`).send().set('x-access-token', token);
        expect(result.status).toBe(202);
    });
});
describe("PATCH /products/edit/:id", () => {
    it("should return status 401 when unauthorized user tries to edit a product", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const editedProduct = {
            name: 'adawd',
            image: "awdaw.jpeg",
            description: "awdawdaw",
            quantity: 5,
            price: 5
        };
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).patch("/products/edit/1").send(editedProduct).set('x-access-token', token);
        expect(result.status).toBe(401);
        expect(result.text).toBe('You shall not pass!!!');
    });
    it("should return status 404 when given product id isn't registered", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const editedProduct = {
            name: 'adawd',
            image: "awdaw.jpeg",
            description: "awdawdaw",
            quantity: 5,
            price: 5
        };
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        const result = await (0, supertest_1.default)(app_1.default).patch("/products/edit/99999").send(editedProduct).set('x-access-token', token);
        expect(result.status).toBe(404);
    });
    it("should return status 202 when successfully edit a product", async () => {
        const admin = await (0, userFactory_1.__adminFactory)();
        const product = await (0, productFactory_1.default)();
        const editedProduct = {
            name: 'adawd',
            image: "awdaw.jpeg",
            description: "awdawdaw",
            quantity: 5,
            price: 5
        };
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(admin);
        const { text: info } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });
        const token = JSON.parse(info).token;
        await (0, supertest_1.default)(app_1.default).post("/categories/create").send({ name: product.category }).set('x-access-token', token);
        await (0, supertest_1.default)(app_1.default).post("/products/create").send(product).set('x-access-token', token);
        const checkProduct = await database_1.default.product.findFirst({ where: { name: product.name } });
        const result = await (0, supertest_1.default)(app_1.default).patch(`/products/edit/${checkProduct.id}`).send(editedProduct).set('x-access-token', token);
        const checkEditedProduct = await database_1.default.product.findUnique({ where: { id: checkProduct.id } });
        expect(result.status).toBe(202);
        expect(checkEditedProduct.name).toEqual(editedProduct.name);
        expect(checkEditedProduct.description).toEqual(editedProduct.description);
        expect(checkEditedProduct.imageURL).toEqual(editedProduct.image);
    });
});
afterAll(async () => {
    database_1.default.$disconnect();
});
