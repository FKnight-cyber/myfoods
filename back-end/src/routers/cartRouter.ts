import { Router } from "express";
import authentication from "../middlewares/authentication";
import { addToCart,getMyOrders } from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/cart/add", authentication, addToCart);
cartRouter.get("/cart/list", authentication, getMyOrders);

export default cartRouter;