"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const edgeValidation_1 = __importDefault(require("../middlewares/edgeValidation"));
const edgeController_1 = require("../controllers/edgeController");
const edgeRouter = (0, express_1.Router)();
edgeRouter.get("/edges", authentication_1.default, edgeController_1.getEdges);
edgeRouter.post("/edges/create", edgeValidation_1.default, authentication_1.default, edgeController_1.createEdge);
edgeRouter.patch("/edges/:id", edgeValidation_1.default, authentication_1.default, edgeController_1.editEdge);
edgeRouter.delete("/edges/delete/:id", authentication_1.default, edgeController_1.deleteEdge);
exports.default = edgeRouter;
