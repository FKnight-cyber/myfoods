"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEdge = exports.deleteEdge = exports.editEdge = exports.getEdges = void 0;
const edgeService_1 = __importDefault(require("../services/edgeService"));
async function getEdges(req, res) {
    const edges = await edgeService_1.default.findAllEdges();
    res.status(200).send(edges);
}
exports.getEdges = getEdges;
;
async function editEdge(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    const name = req.body.name;
    const price = Number(req.body.price);
    const edgeUpdated = {
        id,
        name,
        price
    };
    const edge = await edgeService_1.default.updateEdgeById(edgeUpdated, userInfo.data);
    res.status(200).send(edge);
}
exports.editEdge = editEdge;
;
async function deleteEdge(req, res) {
    const { userInfo } = res.locals;
    const id = Number(req.params.id);
    await edgeService_1.default.deleleEdgeById(id, userInfo.data);
    res.sendStatus(200);
}
exports.deleteEdge = deleteEdge;
;
async function createEdge(req, res) {
    const { userInfo } = res.locals;
    const name = req.body.name;
    const price = Number(req.body.price);
    const edge = {
        name,
        price
    };
    await edgeService_1.default.addEdge(edge, userInfo.data);
    res.sendStatus(201);
}
exports.createEdge = createEdge;
