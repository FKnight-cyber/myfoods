import { Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import categoryRouter from "./categoriesRouter";
import cartRouter from "./cartRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(productsRouter);
mainRouter.use(categoryRouter);
mainRouter.use(cartRouter);

export default mainRouter;