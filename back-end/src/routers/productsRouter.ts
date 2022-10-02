import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getProducts, addProduct, getAllProducts } from "../controllers/productsController";
import productValidation from "../middlewares/productValidation";

const productsRouter = Router();

productsRouter.get("/products", authentication, getProducts);
productsRouter.get("/products/all", authentication, getAllProducts);
productsRouter.post("/products/create",productValidation, authentication, addProduct);

export default productsRouter;