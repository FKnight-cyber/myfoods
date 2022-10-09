import { Router } from "express";
import authentication from "../middlewares/authentication";
import { finishOrder, getUserPurchases, getPurchaseInfo } from "../controllers/purchaseController";

const purchaseRouter = Router();

purchaseRouter.post("/purchase", authentication, finishOrder);
purchaseRouter.get("/user/purchase/info", authentication, getUserPurchases);
purchaseRouter.post("/admin/purchase/info", authentication, getPurchaseInfo);

export default purchaseRouter;