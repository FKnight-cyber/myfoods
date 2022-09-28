import { Router } from "express";
import authValidation from "../middlewares/authValidation";
import { signUp,signIn } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", authValidation("signup"), signUp);
authRouter.post("/sign-in", authValidation("signin"), signIn);

export default authRouter;