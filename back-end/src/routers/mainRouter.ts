import { Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";
import categoryRouter from "./categoriesRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(productsRouter);
mainRouter.use(categoryRouter);

export default mainRouter;