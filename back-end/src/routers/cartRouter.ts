import { Router } from "express";
import authentication from "../middlewares/authentication";
import { addToCart, 
    getMyOrders, 
    removeItemFromCart,
    cleanCart,
    cancelCart 
} from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/cart/add", authentication, addToCart);
cartRouter.get("/cart/list", authentication, getMyOrders);
cartRouter.delete("/cart/remove", authentication, removeItemFromCart);
cartRouter.delete("/cart/clean", authentication, cleanCart);
cartRouter.delete("/cart/cancel", authentication, cancelCart);

export default cartRouter;