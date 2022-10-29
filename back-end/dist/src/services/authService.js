"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const districtRepository_1 = __importDefault(require("../repositories/districtRepository"));
const authUtils_1 = require("../utils/authUtils");
const errorHandler_1 = require("../middlewares/errorHandler");
const axios_1 = __importDefault(require("axios"));
async function signUp(user) {
    const checkUser = await authRepository_1.default.findUser(user.email);
    if (checkUser)
        throw (0, errorHandler_1.checkError)(409, "Este email já foi registrado!");
    if (user.email === process.env.ADMIN_EMAIL) {
        await authRepository_1.default.insert({
            email: user.email,
            password: (0, authUtils_1.encrypt)(user.password),
            cep: "00000000",
            houseNumber: "0000",
            name: `Admin ${user.name}`
        });
        return;
    }
    else {
        const { data: info } = await axios_1.default.get(`http://viacep.com.br/ws/${user.cep}/json/`).catch(() => {
            throw (0, errorHandler_1.checkError)(500, "Erro na busca pelo seu CEP!");
        });
        const regions = await districtRepository_1.default.getRegions();
        const validAddressDelivery = regions.map(region => region.name);
        if (info.erro)
            throw (0, errorHandler_1.checkError)(404, "Não encontramos informação do seu CEP, verifique novamente!");
        if (validAddressDelivery.includes(info.bairro) !== true)
            throw (0, errorHandler_1.checkError)(403, "Infelizmente não cobrimos a sua região ;(");
        user.password = (0, authUtils_1.encrypt)(user.password);
        await authRepository_1.default.insert(user);
    }
}
;
async function signIn(user) {
    const checkUser = await authRepository_1.default.findUser(user.email);
    if (!checkUser)
        throw (0, errorHandler_1.checkError)(404, "Este email não está registrado!");
    if (!(0, authUtils_1.decrypt)(user.password, checkUser.password))
        throw (0, errorHandler_1.checkError)(401, "Senha incorreta!");
    if (checkUser.email === process.env.ADMIN_EMAIL) {
        const adminInfo = {
            id: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
            cep: checkUser.cep,
            houseNumber: checkUser.houseNumber
        };
        const token = (0, authUtils_1.generateUserToken)(adminInfo);
        return [token, "admin"];
    }
    const userInfo = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.name,
        cep: checkUser.cep,
        houseNumber: checkUser.houseNumber
    };
    const token = (0, authUtils_1.generateUserToken)(userInfo);
    return token;
}
async function getUserInfo(userInfo) {
    const { id, name, email, cep, houseNumber } = userInfo.data;
    const { data: info } = await axios_1.default.get(`http://viacep.com.br/ws/${cep}/json/`).catch(() => {
        throw (0, errorHandler_1.checkError)(500, "Erro na busca pelo seu CEP!");
    });
    return {
        id,
        name,
        email,
        houseNumber,
        cep,
        district: info.bairro,
        road: info.logradouro,
        city: info.localidade
    };
}
const authServices = {
    signUp,
    signIn,
    getUserInfo
};
exports.default = authServices;
