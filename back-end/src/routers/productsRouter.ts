import { Router } from "express";
import authentication from "../middlewares/authentication";

const productsRouter = Router();

productsRouter.get("/products", authentication)

export default productsRouter;