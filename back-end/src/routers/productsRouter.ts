import { Router } from "express";
import authentication from "../middlewares/authentication";
import { 
    getProducts, 
    addProduct, 
    getAllProducts,
    deleteProduct 
} from "../controllers/productsController";
import productValidation from "../middlewares/productValidation";

const productsRouter = Router();

productsRouter.get("/products", authentication, getProducts);
productsRouter.get("/products/all", authentication, getAllProducts);
productsRouter.post("/products/create",productValidation, authentication, addProduct);
productsRouter.delete("/products/delete/:id", authentication, deleteProduct);

export default productsRouter;