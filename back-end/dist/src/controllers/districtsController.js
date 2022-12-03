"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDistrict = exports.removeDistrict = exports.editDistrict = exports.getDistricts = void 0;
const districtsService_1 = __importDefault(require("../services/districtsService"));
async function getDistricts(req, res) {
    const districts = await districtsService_1.default.getDistricts();
    res.status(200).send(districts);
}
exports.getDistricts = getDistricts;
;
async function editDistrict(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    const name = req.body.name;
    const district = await districtsService_1.default.updateDistrictById(id, name, userInfo.data);
    res.status(200).send(district);
}
exports.editDistrict = editDistrict;
;
async function removeDistrict(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    await districtsService_1.default.removeDistrictById(id, userInfo.data);
    res.sendStatus(200);
}
exports.removeDistrict = removeDistrict;
;
async function addDistrict(req, res) {
    const { userInfo } = res.locals;
    const name = req.body.name;
    await districtsService_1.default.addDistrict(name, userInfo.data);
    res.sendStatus(201);
}
exports.addDistrict = addDistrict;
