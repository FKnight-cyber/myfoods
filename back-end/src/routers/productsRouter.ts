import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getProducts } from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/products", authentication, getProducts);

export default productsRouter;