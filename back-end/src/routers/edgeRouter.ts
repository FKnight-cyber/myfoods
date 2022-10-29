import { Router } from "express";
import authentication from "../middlewares/authentication";
import edgeValidation from "../middlewares/edgeValidation";
import { getEdges, editEdge, deleteEdge, createEdge } from "../controllers/edgeController";

const edgeRouter = Router();

edgeRouter.get("/edges", authentication, getEdges);
edgeRouter.post("/edges/create", edgeValidation, authentication, createEdge);
edgeRouter.patch("/edges/:id", edgeValidation, authentication, editEdge);
edgeRouter.delete("/edges/delete/:id", authentication, deleteEdge);

export default edgeRouter;