"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
async function getEdges() {
    return await database_1.default.pizzaEdges.findMany({ orderBy: { id: 'asc' } });
}
;
async function insert(edge) {
    await database_1.default.pizzaEdges.create({ data: edge });
}
async function update(edge) {
    await database_1.default.pizzaEdges.update({
        where: {
            id: edge.id
        },
        data: {
            name: edge.name,
            price: edge.price
        }
    });
}
;
async function remove(id) {
    await database_1.default.pizzaEdges.delete({ where: { id } });
}
;
async function findEdgeById(id) {
    return await database_1.default.pizzaEdges.findUnique({ where: { id } });
}
;
async function findEdgeByName(name) {
    return await database_1.default.pizzaEdges.findFirst({ where: { name } });
}
;
const edgesRepository = {
    getEdges,
    insert,
    update,
    remove,
    findEdgeById,
    findEdgeByName
};
exports.default = edgesRepository;
