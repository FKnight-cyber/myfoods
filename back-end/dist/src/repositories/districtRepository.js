"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function insert(name) {
    await database_1.default.regions.create({ data: { name } });
}
;
async function getRegions() {
    return await database_1.default.regions.findMany({});
}
;
async function findRegionById(id) {
    return await database_1.default.regions.findUnique({ where: { id } });
}
;
async function findRegionByName(name) {
    return await database_1.default.regions.findFirst({ where: { name } });
}
;
async function update(id, name) {
    await database_1.default.regions.update({
        where: {
            id
        },
        data: {
            name
        }
    });
}
;
async function remove(id) {
    await database_1.default.regions.delete({ where: { id } });
}
;
const districtsRepository = {
    insert,
    getRegions,
    findRegionById,
    findRegionByName,
    update,
    remove
};
exports.default = districtsRepository;
