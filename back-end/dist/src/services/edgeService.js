"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edgeRepository_1 = __importDefault(require("../repositories/edgeRepository"));
const errorHandler_1 = require("../middlewares/errorHandler");
async function findAllEdges() {
    return await edgeRepository_1.default.getEdges();
}
;
async function updateEdgeById(edge, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkEdge = await edgeRepository_1.default.findEdgeById(edge.id);
    if (!checkEdge)
        throw (0, errorHandler_1.checkError)(404, "Tipo de borda não está cadastrada!");
    await edgeRepository_1.default.update(edge);
    return {
        edge
    };
}
;
async function deleleEdgeById(id, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const checkEdge = await edgeRepository_1.default.findEdgeById(id);
    if (!checkEdge)
        throw (0, errorHandler_1.checkError)(404, "Tipo de borda não está cadastrada!");
    await edgeRepository_1.default.remove(id);
}
;
async function addEdge(edge, user) {
    if (user.email !== process.env.ADMIN_EMAIL)
        throw (0, errorHandler_1.checkError)(401, "You shall not pass!!!");
    const edgeCategory = await edgeRepository_1.default.findEdgeByName(edge.name);
    if (edgeCategory)
        throw (0, errorHandler_1.checkError)(409, "Borda já está cadastrada!");
    await edgeRepository_1.default.insert(edge);
}
const edgeServices = {
    findAllEdges,
    updateEdgeById,
    deleleEdgeById,
    addEdge
};
exports.default = edgeServices;
