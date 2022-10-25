import { Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import categoryRouter from "./categoriesRouter";
import cartRouter from "./cartRouter";
import testRouter from "./testRouter";
import purchaseRouter from "./purchaseRouter";
import districtsRouter from "./districtsRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(productsRouter);
mainRouter.use(categoryRouter);
mainRouter.use(cartRouter);
mainRouter.use(purchaseRouter);
mainRouter.use(districtsRouter);
if(process.env.NODE_ENV === "test"){
    mainRouter.use(testRouter);
};

export default mainRouter;