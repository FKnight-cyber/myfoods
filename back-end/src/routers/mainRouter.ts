import { Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import categoryRouter from "./categoriesRouter";
import cartRouter from "./cartRouter";
import testRouter from "./testRouter";
import purchaseRouter from "./purchaseRouter";
import districtsRouter from "./districtsRouter";
import edgeRouter from "./edgeRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(productsRouter);
mainRouter.use(categoryRouter);
mainRouter.use(cartRouter);
mainRouter.use(purchaseRouter);
mainRouter.use(districtsRouter);
mainRouter.use(edgeRouter);
if(process.env.NODE_ENV === "test"){
    mainRouter.use(testRouter);
};

export default mainRouter;