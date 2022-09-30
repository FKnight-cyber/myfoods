import { Router } from "express";
import authentication from "../middlewares/authentication";
import { addToCart } from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/cart/add", authentication, addToCart);

export default cartRouter;