"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const database_1 = __importDefault(require("../../src/database"));
const supertest_1 = __importDefault(require("supertest"));
const userFactory_1 = require("../factories/userFactory");
beforeEach(async () => {
    await database_1.default.$executeRaw `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
});
describe("POST /sign-up", () => {
    it("should sucessfully register an user with valid CEP", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const checkUser = await database_1.default.user.findUnique({ where: { email: user.email } });
        expect(result.status).toBe(201);
        expect(checkUser.email).toEqual(user.email);
    });
    it("should return error 409 when trying to register duplicate email", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        expect(result.status).toBe(409);
    });
    it("should return error 404 when info about CEP wasn't found", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        user.cep = "00000000";
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        expect(result.status).toBe(404);
    });
    it("should return error 403 when District is out of range", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        user.cep = "60540096";
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        expect(result.status).toBe(403);
    });
});
describe("POST /sign-in", () => {
    it("should sucessfully login a registered user", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const myUser = {
            email: user.email,
            password: user.password
        };
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-in").send(myUser);
        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });
    it("should return error 404 when trying to sign-in unregistered email", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        expect(result.status).toBe(404);
    });
    it("should return error 401 when password is incorrect", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const result = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: "12873981739218739218237018237"
        });
        expect(result.status).toBe(401);
    });
});
describe("GET /user/info", () => {
    it("should return status 401 when not sending authorization token", async () => {
        const result = await (0, supertest_1.default)(app_1.default).get("/user/info").send();
        expect(result.status).toBe(401);
    });
    it("should return status 200 and registered user address data", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        await (0, supertest_1.default)(app_1.default).post("/sign-up").send(user);
        const { text: token } = await (0, supertest_1.default)(app_1.default).post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        const result = await (0, supertest_1.default)(app_1.default).get("/user/info").send().set('x-access-token', token);
        expect(result.status).toBe(200);
        expect(result.body.name).toEqual(user.name);
        expect(result.body.email).toEqual(user.email);
        expect(result.body).toHaveProperty('id');
        expect(result.body).toHaveProperty('name');
        expect(result.body).toHaveProperty('email');
        expect(result.body).toHaveProperty('houseNumber');
        expect(result.body).toHaveProperty('cep');
        expect(result.body).toHaveProperty('district');
        expect(result.body).toHaveProperty('road');
        expect(result.body).toHaveProperty('city');
    });
});
afterAll(async () => {
    database_1.default.$disconnect();
});
