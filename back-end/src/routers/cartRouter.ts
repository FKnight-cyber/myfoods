import { Router } from "express";
import authentication from "../middlewares/authentication";

const cartRouter = Router();

cartRouter.post("/cart/add", authentication);

export default cartRouter;