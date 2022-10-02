import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getProducts, addProduct } from "../controllers/productsController";
import productValidation from "../middlewares/productSchema";

const productsRouter = Router();

productsRouter.get("/products", authentication, getProducts);
productsRouter.post("/products/create",productValidation, authentication, addProduct);

export default productsRouter;