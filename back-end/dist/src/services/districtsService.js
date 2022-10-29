"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../middlewares/errorHandler");
const districtRepository_1 = __importDefault(require("../repositories/districtRepository"));
async function getDistricts() {
    return districtRepository_1.default.getRegions();
}
;
async function updateDistrictById(id, name, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkDistrict = await districtRepository_1.default.findRegionById(id);
    if (!checkDistrict)
        throw (0, errorHandler_1.checkError)(404, "Bairro não está cadastrado!");
    await districtRepository_1.default.update(id, name);
    return {
        id,
        name
    };
}
;
async function removeDistrictById(id, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkDistrict = await districtRepository_1.default.findRegionById(id);
    if (!checkDistrict)
        throw (0, errorHandler_1.checkError)(404, "Bairro não está cadastrado!");
    await districtRepository_1.default.remove(id);
}
;
async function addDistrict(name, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkDistrict = await districtRepository_1.default.findRegionByName(name);
    if (checkDistrict)
        throw (0, errorHandler_1.checkError)(409, "Bairro já está cadastrado!");
    await districtRepository_1.default.insert(name);
}
const districtServices = {
    getDistricts,
    updateDistrictById,
    removeDistrictById,
    addDistrict
};
exports.default = districtServices;
