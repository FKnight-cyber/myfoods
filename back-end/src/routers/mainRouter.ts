import { Router } from "express";
import authRouter from "./authRouter";
import productsRouter from "./productsRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(productsRouter);

export default mainRouter;