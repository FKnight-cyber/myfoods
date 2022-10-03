import { Router } from "express";
import authentication from "../middlewares/authentication";
import { 
    getProducts, 
    addProduct, 
    getAllProducts,
    deleteProduct,
    editProduct 
} from "../controllers/productsController";
import productValidation from "../middlewares/productValidation";

const productsRouter = Router();

productsRouter.get("/products", authentication, getProducts);
productsRouter.get("/products/all", authentication, getAllProducts);
productsRouter.post("/products/create", productValidation("create"), authentication, addProduct);
productsRouter.delete("/products/delete/:id", authentication, deleteProduct);
productsRouter.patch("/products/edit/:id", productValidation("update"), authentication, editProduct);

export default productsRouter;