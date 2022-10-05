import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database";
import __productFactory from "../factories/productFactory";
import { __adminFactory, __userFactory } from "../factories/userFactory";

beforeEach( async () => {
    await prisma.$executeRaw`TRUNCATE TABLE products RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
});

describe("POST /products/create", () => {
    it("should return status 201 when successfully create a new product", async () => {
        const product = await __productFactory();
        const admin = await __adminFactory();

        await supertest(app).post("/sign-up").send(admin);
        
        const { text:info } = await supertest(app).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });

        const token = JSON.parse(info).token;

        await supertest(app).post("/categories/create").send({name:product.category}).set('x-access-token',token);

        const result = await supertest(app).post("/products/create").send(product).set('x-access-token',token);

        expect(result.status).toBe(201);
    });

    it("should return status 404 when product's category isn't registered", async () => {
        const admin = await __adminFactory();
        const product = await __productFactory();

        await supertest(app).post("/sign-up").send(admin);
        
        const { text:info } = await supertest(app).post("/sign-in").send({
            email: admin.email,
            password: admin.password
        });

        const token = JSON.parse(info).token;

        const result = await supertest(app).post("/products/create").send(product).set('x-access-token', token);

        expect(result.status).toBe(404);
    });
});

afterAll( async () => {
    prisma.$disconnect();
});

