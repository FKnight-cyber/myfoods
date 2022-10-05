import { jest } from "@jest/globals";
import authRepository from "../../src/repositories/authRepository";
import authServices from "../../src/services/authService";
import { User } from "@prisma/client";
import { __userFactory } from "../factories/userFactory";
import * as utils from "../../src/utils/authUtils";

jest.mock("../../src/repositories/authRepository.ts");

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe("Authenticaton service suit test", () => {
    it("should successfully register an user",async () => {
        const user = await __userFactory();

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return false
        });

        await authServices.signUp(user);

        expect(authRepository.insert).toBeCalled();
    });

    it("should fail to register duplicate user", async () => {
        const user = await __userFactory();

        const registeredUser:User = {
            id:1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(async ():Promise<User> => {
            return registeredUser;
        });

        const result = authServices.signUp(user);

        expect(result).rejects.toEqual({
            status:409,
            message: "Este email já foi registrado!"
        });
    });

    it("should return status 404 when user cep information isn't found", async () => {
        const user = await __userFactory();

        user.cep = "00000000";

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return false;
        });

        const result = authServices.signUp(user);

        expect(result).rejects.toEqual({
            status:404,
            message: "Não encontramos informação do seu CEP, verifique novamente!"
        });
    });

    it("should return status 403 when user cep is out of delivery range", async () => {
        const user = await __userFactory();

        user.cep = "60540096";

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return false;
        });

        const result = authServices.signUp(user);

        expect(result).rejects.toEqual({
            status:403,
            message: "Infelizmente não cobrimos o seu bairro ;("
        });
    });

    it("should successfully sign-in a registered user", async () => {
        const registeredUser:User = {
            id:1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(async ():Promise<User> => {
            return registeredUser;
        });

        jest.spyOn(utils, "decrypt").mockImplementationOnce(():any => {
            return true;
        });

        jest.spyOn(utils, "generateUserToken").mockImplementationOnce(():any => {
            return "minhatoken";
        });

        const result = await authServices.signIn({
            email:registeredUser.email, 
            password:registeredUser.password
        });

        expect(result).toBe("minhatoken");
    });

    it("should fail to sign-in unregistered user", () => {
        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return null;
        });

        const result = authServices.signIn({
            email:"goldroger@pirates.rei", 
            password:"onepiece"
        });

        expect(result).rejects.toEqual({
            status:404,
            message: "Este email não está registrado!"
        });
    });

    it("should fail to sign-in registered user with invalid password", () => {
        const registeredUser:User = {
            id:1,
            email: "fulano@gmail.com",
            name: "Fulano de Tal",
            cep: "60720096",
            houseNumber: "1234",
            password: "1234",
            createdAt: new Date(Date.now())
        };

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return registeredUser;
        });

        jest.spyOn(utils, "decrypt").mockImplementationOnce(():any => {
            return false;
        });

        const result = authServices.signIn({
            email:registeredUser.email, 
            password:registeredUser.password
        });

        expect(result).rejects.toEqual({
            status:401,
            message: "Senha incorreta!"
        });
    });

    it("should return user address info", async () => {
        const userInfo =  {
            data:{
                id: 1,
                name: "Fulano de Tal",
                email: "fulano@gmail.com",
                cep: "60720096",
                houseNumber: "1234" 
            }  
        };

        const result = await authServices.getUserInfo(userInfo);

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

    it("should return admin credentials when the admin tries to sign-in",async () => {
        const user = {
            email: process.env.ADMIN_EMAIL,
            password: "1234"
        };

        jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
            return {
                id:1,
                email:process.env.ADMIN_EMAIL,
                name:"Anonymous",
                cep:"00000000",
                houseNumber:"1234"
            };
        });

        jest.spyOn(utils, "decrypt").mockImplementationOnce(():any => {
            return true;
        });

        jest.spyOn(utils, "generateUserToken").mockImplementationOnce(():any => {
            return "admintoken";
        });

        const result = await authServices.signIn(user)

        expect(result).toStrictEqual(["admintoken","admin"]);
    });
});