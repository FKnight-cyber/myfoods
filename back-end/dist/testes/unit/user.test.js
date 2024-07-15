"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const authRepository_1 = __importDefault(require("../../src/repositories/authRepository"));
const authService_1 = __importDefault(require("../../src/services/authService"));
const userFactory_1 = require("../factories/userFactory");
const utils = __importStar(require("../../src/utils/authUtils"));
globals_1.jest.mock("../../src/repositories/authRepository.ts");
beforeEach(() => {
    globals_1.jest.resetAllMocks();
    globals_1.jest.clearAllMocks();
});
describe("Authenticaton service suit test", () => {
    it("should successfully register an user", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
            return false;
        });
        await authService_1.default.signUp(user);
        expect(authRepository_1.default.insert).toBeCalled();
    });
    it("should fail to register duplicate user", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        const registeredUser = {
            id: 1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(async () => {
            return registeredUser;
        });
        const result = authService_1.default.signUp(user);
        expect(result).rejects.toEqual({
            status: 409,
            message: "Este email já foi registrado!"
        });
    });
    it("should return status 404 when user cep information isn't found", async () => {
        const user = await (0, userFactory_1.__userFactory)();
        user.cep = "00000000";
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
            return false;
        });
        const result = authService_1.default.signUp(user);
        expect(result).rejects.toEqual({
            status: 404,
            message: "Não encontramos informação do seu CEP, verifique novamente!"
        });
    });
    // it("should return status 403 when user cep is out of delivery range", async () => {
    //     const user = await (0, userFactory_1.__userFactory)();
    //     user.cep = "60540096";
    //     globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
    //         return false;
    //     });
    //     const result = authService_1.default.signUp(user);
    //     expect(result).rejects.toEqual({
    //         status: 403,
    //         message: "Infelizmente não cobrimos a sua região ;("
    //     });
    // });
    it("should successfully sign-in a registered user", async () => {
        const registeredUser = {
            id: 1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(async () => {
            return registeredUser;
        });
        globals_1.jest.spyOn(utils, "decrypt").mockImplementationOnce(() => {
            return true;
        });
        globals_1.jest.spyOn(utils, "generateUserToken").mockImplementationOnce(() => {
            return "minhatoken";
        });
        const result = await authService_1.default.signIn({
            email: registeredUser.email,
            password: registeredUser.password
        });
        expect(result).toBe("minhatoken");
    });
    it("should fail to sign-in unregistered user", () => {
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
            return null;
        });
        const result = authService_1.default.signIn({
            email: "goldroger@pirates.rei",
            password: "onepiece"
        });
        expect(result).rejects.toEqual({
            status: 404,
            message: "Este email não está registrado!"
        });
    });
    it("should fail to sign-in registered user with invalid password", () => {
        const registeredUser = {
            id: 1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
            return registeredUser;
        });
        globals_1.jest.spyOn(utils, "decrypt").mockImplementationOnce(() => {
            return false;
        });
        const result = authService_1.default.signIn({
            email: registeredUser.email,
            password: registeredUser.password
        });
        expect(result).rejects.toEqual({
            status: 401,
            message: "Senha incorreta!"
        });
    });
    it("should return user address info", async () => {
        const userInfo = {
            data: {
                id: 1,
                name: "Fulano de Tal",
                email: "fulano@gmail.com",
                cep: "60720096",
                houseNumber: "1234"
            }
        };
        const result = await authService_1.default.getUserInfo(userInfo);
        expect(result).toEqual({
            id: 1,
            name: "Fulano de Tal",
            email: "fulano@gmail.com",
            cep: "60720096",
            houseNumber: "1234",
            district: "Parangaba",
            road: "Rua Cônego de Castro",
            city: "Fortaleza"
        });
    });
    it("should return admin credentials when the admin tries to sign-in", async () => {
        const user = {
            email: process.env.ADMIN_EMAIL,
            password: "1234"
        };
        globals_1.jest.spyOn(authRepository_1.default, "findUser").mockImplementationOnce(() => {
            return {
                id: 1,
                email: process.env.ADMIN_EMAIL,
                name: "Anonymous",
                cep: "00000000",
                houseNumber: "1234"
            };
        });
        globals_1.jest.spyOn(utils, "decrypt").mockImplementationOnce(() => {
            return true;
        });
        globals_1.jest.spyOn(utils, "generateUserToken").mockImplementationOnce(() => {
            return "admintoken";
        });
        const result = await authService_1.default.signIn(user);
        expect(result).toStrictEqual(["admintoken", "admin"]);
    });
});
afterAll(() => {
    globals_1.jest.resetAllMocks();
    globals_1.jest.clearAllMocks();
});
