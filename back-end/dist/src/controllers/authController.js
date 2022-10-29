"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.signIn = exports.signUp = void 0;
const authService_1 = __importDefault(require("../services/authService"));
async function signUp(req, res) {
    const user = {
        name: req.body.name,
        cep: req.body.cep,
        houseNumber: req.body.houseNumber,
        email: req.body.email,
        password: req.body.password
    };
    await authService_1.default.signUp(user);
    res.sendStatus(201);
}
exports.signUp = signUp;
;
async function signIn(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const token = await authService_1.default.signIn(user);
    if (token[1] === "admin") {
        return res.status(200).send({ token: token[0], redirectTo: "/admin/control" });
    }
    res.status(200).send(token);
}
exports.signIn = signIn;
;
async function getUserInfo(req, res) {
    const { userInfo } = res.locals;
    const allInfo = await authService_1.default.getUserInfo(userInfo);
    res.status(200).send(allInfo);
}
exports.getUserInfo = getUserInfo;
;
