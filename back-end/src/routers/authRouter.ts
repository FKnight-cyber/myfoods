import { Router } from "express";
import authValidation from "../middlewares/authValidation";
import { signUp, signIn, getUserInfo } from "../controllers/authController";
import authentication from "../middlewares/authentication";

const authRouter = Router();

authRouter.post("/sign-up", authValidation("signup"), signUp);
authRouter.post("/sign-in", authValidation("signin"), signIn);
authRouter.get("/user/info", authentication, getUserInfo);

export default authRouter;