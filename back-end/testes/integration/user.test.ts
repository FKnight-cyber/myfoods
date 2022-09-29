import app from "../../src/app";
import prisma from "../../src/database";
import supertest from "supertest";
import __userFactory from "../factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
})

describe("POST /sign-up", () => {
    it("should sucessfully register an user with valid CEP", async () => {
        const user = await __userFactory();

        const result = await supertest(app).post("/sign-up").send(user);

        const checkUser = await prisma.user.findUnique({where:{email:user.email}});

        expect(result.status).toBe(201);
        expect(checkUser.email).toEqual(user.email);
    });

    it("should return error 409 when trying to register duplicate email", async () => {
        const user = await __userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(409);
    });
});

describe("POST /sign-in", () => {
    it("should sucessfully login a registered user", async () => {
        const user = await __userFactory();

        const myUser = {
            email: user.email,
            password: user.password
        };

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send(myUser);

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });

    it("should return error 404 when trying to sign-in unregistered email", async () => {
        const user = await __userFactory();

        const result = await supertest(app).post("/sign-in").send({
            email:user.email,
            password:user.password
        });

        expect(result.status).toBe(404);
    });

    it("should return error 401 when password is incorrect", async () => {
        const user = await __userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({
            email:user.email,
            password:"12873981739218739218237018237"
        });

        expect(result.status).toBe(401);
    });
})
