import { Router } from "express";
import authRouter from "./authRouter";

const mainRouter = Router();

mainRouter.use(authRouter);

export default mainRouter;